# Security and reconnaissance review

Reviewed on 2026-11-12 against `main` at `3dc522105a7646c20947b91cff57fba9ae967ecb` and the public site at <https://master-bogdan.github.io/>. Findings describe this snapshot; no application changes or repository-setting changes were made.

## Remediation on `fix/security-hardening`

The findings below preserve the original review snapshot. The follow-up branch applies these changes:

- **B1:** Vite is pinned to patched `8.3.7`. npm returned 404 for the advisory's `8.2.5` release, so the available patched minor release is used.
- **A1:** Vitest, its UI, and V8 coverage use `4.1.12`; Zod resolves to `4.6.7`; a scoped minimatch 10 override selects patched `11.0.1`. CI now rejects moderate or higher npm advisories through `npm run security:audit`.
- **A2:** the prerender server sets `ws: false`.
- **A3, partial:** generated pages receive a CSP with hashes derived from the built inline boot script and an explicit referrer policy. The policy allows inline Emotion styles, local scripts, and HTTPS images, while blocking objects, child frames, and form submissions. Response-only headers and embedding restrictions remain hosting-layer work.
- **A4:** command dispatch and permalink lookup require an own registry property, with regression coverage for `constructor` and `__proto__`.
- **A5:** the saved three-second static-output fallback is restored, together with browser coverage. The saved explicit `index.html` routing/canonical fix and its tests are also restored.
- **A6:** repository governance settings remain unchanged; these cannot be represented as application code changes in this PR.

The original stash is retained as a backup after applying its changes to this branch. Follow-up validation results are recorded in the pull request.

## Findings

### Blocking

#### B1. Vite is pinned to a version affected by a critical development-server advisory

- **Location:** `package.json:71`, corresponding Vite entry in `package-lock.json`.
- **Rule:** dependencies crossing an execution boundary must receive applicable security fixes.
- **Evidence:** Vite is `8.2.4`. The maintainer's [GHSA-p4f5-76q4-ffq7](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7), published November 10, lists `8.2.0` through `8.2.4` as affected and `8.2.5` as patched. The advisory describes remote code execution when the development HTTP server is explicitly exposed to the network.
- **Exposure:** the checked-in `dev` script does not pass `--host`, and the Vite config does not expose its HTTP server. GitHub Pages serves static files and does not run Vite. No exposed development HTTP server was identified. This is a conditional developer-machine risk, not evidence of a production compromise. The separate build WebSocket behavior is covered in A2.
- **Fix:** pin Vite to `8.2.5` or another verified patched release, regenerate the lockfile, and run `npm run validate`. Keep development servers on loopback. Apply this before exposing a development server to a network.
- **Detection gap:** this advisory was absent from the live npm audit response. A clean or lower-severity npm audit result alone would have missed it.

### Advisory

#### A1. Development dependencies have four additional advisory roots, and CI does not gate dependency advisories

- **Location:** `package.json:61`, `package.json:62`, `package.json:72`, `package-lock.json`, `.github/workflows/pages.yml:41`.
- **Evidence:** `npm audit --json` reports **15 affected package entries: one high and 14 moderate**. These counts include parent packages affected through the same dependency; they are not 15 independent vulnerabilities. `npm audit --omit=dev --json` reports **zero** findings. The four underlying advisories are:

| Locked package          | Advisory                                                                 | Database severity | Relevant conditions and remediation                                                                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zod@4.4.3`             | [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) | High              | Resource exhaustion during validation of large collections. Here it is a development dependency through `eslint-plugin-react-hooks`, with no public validation endpoint identified. Refresh the dependency to patched `4.6.6` or later through a compatible resolution.                                                 |
| `minimatch@10.2.6`      | [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) | Moderate          | Glob-pattern amplification under the advisory's optimization conditions. Used by ESLint and TypeScript ESLint; visitor input does not reach it. The advisory lists `11.0.1` as patched. Upgrade compatible parent packages or assess a tested override; this crosses a major version.                                   |
| `@vitest/mocker@4.1.11` | [GHSA-qxg6-89mg-rqv8](https://github.com/advisories/GHSA-qxg6-89mg-rqv8) | Moderate          | Unauthenticated mock registration can inject browser code when the affected mocker server plugin is configured and reachable. No direct use of that plugin was found; normal Node test runs do not register the affected handlers. Upgrade the Vitest family together to `4.1.12` or later patched compatible versions. |
| `@vitest/mocker@4.1.11` | [GHSA-xp26-3454-mjgp](https://github.com/advisories/GHSA-xp26-3454-mjgp) | Moderate          | Windows-specific path traversal in the redirect handler. The reviewed development environment and CI are Linux. Upgrade the Vitest family together as above.                                                                                                                                                            |

- **Suggestion:** resolve these package updates in a dedicated change, preserve exact direct pins, and avoid an unreviewed `npm audit fix --force`. Add an explicit dependency-advisory policy/check to CI, with narrowly documented exceptions where exposure is absent. Existing CodeQL scans and Dependabot notifications do not make `validate` fail for dependency advisories.
- **GitHub corroboration:** Dependabot security updates are enabled; two open alerts, numbers 24 and 35, cover the two mocker advisories. This snapshot's Vite, minimatch, and Zod findings were not represented in that open-alert list.

#### A2. Static prerendering starts an unnecessary WebSocket listener on all interfaces

- **Location:** `scripts/prerender.mjs:57`.
- **Evidence:** `createServer` uses middleware mode without disabling WebSockets. The restricted validation run recorded a bind attempt to `0.0.0.0:24678`. Middleware mode therefore does not make this build step socket-free. The listener closes in the existing `finally` block.
- **Impact:** unnecessary development-server network surface while a static build runs. No unauthenticated exploit of this listener was attempted or demonstrated; it is not proof that B1's development HTTP-server prerequisite is met.
- **Suggestion:** configure `server.ws: false` for prerendering. In the installed Vite version, `hmr: false` alone still attempted to bind the WebSocket port. A separate read-only rendering check with `ws: false` generated all eight page descriptions/HTML results without a listener or permission error.

#### A3. Successful public pages lack an explicit browser security policy

- **Location:** `index.html:3`; live HTTP response headers.
- **Evidence:** the final successful homepage response has HSTS but no `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. The HTML has no CSP or referrer-policy meta element. GitHub's generic 404 response does have a CSP; that policy does not protect the successful portfolio pages.
- **Impact:** less defense in depth against future injection and unwanted framing. No current injection exploit, authenticated state, payment flow, or sensitive browser storage was found, so missing headers are not treated as a demonstrated high-impact vulnerability.
- **Suggestion:** define and test an application-compatible CSP and an explicit referrer policy. Account for the inline boot script and Emotion styles; avoid adding a policy that silently disables rendering. A meta CSP can restrict supported resource directives when response-header control is unavailable. Framing protection requires a response header: [`frame-ancestors` is unsupported in meta policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors). Use a hosting/header layer that supports it if framing restrictions are required. [Referrer policy can also be set in HTML](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy).

#### A4. Command lookup accepts inherited object properties and throws

- **Location:** `src/modules/terminal/commands/commandRegistry.tsx:125`.
- **Evidence:** both `constructor` and `__proto__` resolve to inherited properties of the registry object. `commandOutput` then calls their nonexistent `execute` function. Direct module checks produced `command.execute is not a function`; Chromium reproduced both errors through the normal command input. A subsequent command still worked.
- **Impact:** local command failure and uncaught browser errors. This is not prototype pollution, shell execution, or a demonstrated cross-user denial of service.
- **Suggestion:** require an own property before dispatch, use a null-prototype registry, or use a `Map`. Unknown names should follow the existing unknown-command path. Cover these two inputs with a behavioral regression test when fixing it.

#### A5. A failed JavaScript download leaves prerendered content hidden

- **Location:** `src/modules/terminal/components/TypewriterOutput/styles.ts:3`, `index.html:6`.
- **Evidence:** a targeted Chromium check aborted JavaScript asset requests and opened `/blog/welcome/`. After 3.5 seconds the prerendered element contained 3,274 text characters but retained `visibility: hidden`, because the inline script had already set the `js` class. There is no failure fallback in the reviewed main revision. Disabling JavaScript entirely follows a different path and passes existing tests.
- **Impact:** readable static content becomes unavailable during script delivery or initialization failures. This is an availability defect, not an injection finding.
- **Suggestion:** bound the pending hidden state and reveal the static content if hydration does not complete. Test a failed asset request as well as the existing JavaScript-disabled case.

#### A6. Repository review controls allow administrator bypass and bot approvals

- **Location:** live [main ruleset](https://github.com/master-bogdan/master-bogdan.github.io/rules/26400972) and repository Actions settings.
- **Evidence:** the active ruleset requires a PR and the `Validate and build` check, blocks deletion and non-fast-forward updates, and requires zero approving reviews. Repository administrators have an `always` bypass. Actions defaults to read access and enforces SHA pinning, but `can_approve_pull_request_reviews` is enabled and all action providers are allowed.
- **Impact:** optional governance hardening for a personal repository. The current workflow does not grant PR write permission, and no bypass abuse was observed. These settings are not presented as missing branch protection: the legacy protection endpoint returns 404 because protection is implemented through an active ruleset.
- **Suggestion:** disable Actions PR approvals if unused. Consider an action-provider allowlist and narrower administrator bypass. Add an independent reviewer requirement only if it fits the ownership model.

## Reconnaissance results

| Surface                  | Observed result                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hosting                  | Public GitHub Pages user site; workflow deployment; no custom domain configured.                                                                                                                                                                                                                                                                                                                             |
| DNS                      | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; shared GitHub Pages infrastructure.                                                                                                                                                                                                                                                                                              |
| HTTPS                    | HTTP redirects to HTTPS; Pages enforces HTTPS; verified TLS 1.3 connection; certificate valid September 30 through December 29, 2026; HSTS `max-age=31556952`.                                                                                                                                                                                                                                               |
| Published routes         | All eight sitemap URLs return 200: homepage, blog list, two posts, resume, project list, and two project pages. The public PDF also returns 200.                                                                                                                                                                                                                                                             |
| Accidental file exposure | `/.git/config`, `/.env`, `/src/main.tsx`, and `/package.json` returned 404. Initial transient 503s for `/package.json` and `/robots.txt` were rechecked; both returned 404.                                                                                                                                                                                                                                  |
| Public metadata          | Name, professional role, email, profile links, project repositories, technologies, certification images, and the downloadable CV are intentionally public. Hidden commands and their source are discoverable in the browser bundle; they are cosmetic features, not access controls.                                                                                                                         |
| CV and images            | PDF metadata inspection reports no JavaScript, forms, or metadata stream. Text extraction found one email and no international-format phone-like strings. This does not establish the absence of every kind of personal data. Six SVGs had no matched script, event-handler, foreign-object, or external-URL attribute patterns. The project screenshot was visually inspected and did not show credentials. |
| Browser network          | Representative local resume/project journeys requested no external resources. Command input resembling an HTML image produced no injected image. Markdown URL checks rejected `javascript:`, `vbscript:`, and HTML `data:` URLs. HTTPS Markdown destinations remain allowed by design.                                                                                                                       |
| Build artifact           | 31 files, eight HTML pages, no source maps, and no `.git`, environment files, credential directories, source tree, content directory, or dependencies accidentally included as files. Bundled public content and JavaScript are expected.                                                                                                                                                                    |
| Discovery files          | Sitemap present and current; `robots.txt` and `/.well-known/security.txt` return 404. Their absence is not an access-control vulnerability.                                                                                                                                                                                                                                                                  |

The first public checks ran while the already-triggered main deployment was in progress and saw the previous site, including 404s for the new routes. The deployment subsequently completed successfully, and the final checks above verified the updated site. No deployment was triggered by this review.

## Controls verified

- Markdown uses `skipHtml`, excludes active elements, and applies `react-markdown`'s URL sanitizer before local URL rewriting. No application `eval`, dynamic function constructor, HTML insertion sink, server endpoint, or shell-command execution path was identified.
- Front matter validates required strings, calendar dates, unique normalized slugs, and rejects YAML aliases. The build checks each discovered Markdown entry with `lstat` and rejects non-regular files. These are build-time authored-content controls, not a public upload service; filesystem race resistance was not established.
- Prerendered metadata escapes HTML attributes and text; structured JSON escapes `<` before insertion into a script element. The existing script-termination regression test passes.
- Internal navigation checks origin and recognized routes before interception. External new-tab links in the reviewed command/project components use `noopener noreferrer`.
- Direct dependencies have exact pins. All 443 lockfile package records with resolved archives use the npm registry and have integrity values. All 417 installed package records found on this platform match their locked versions; the remaining records were not installed. A fresh `npm ci` was not performed.
- GitHub Actions are pinned to full commit SHAs, checkout credentials are not persisted, builds use a read-only contents token, pull requests cannot deploy, and Pages/OIDC write permissions are isolated to the deployment job. These controls follow [GitHub's secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use). The Pages environment permits deployment from `main` only.
- GitHub secret scanning, push protection, Dependabot alerts, and automatic security updates are enabled. CodeQL analysis exists for this main revision. Open secret-scanning and code-scanning alert lists were empty at review time; this is not proof of vulnerability absence.
- A local credential-pattern scan examined 310 distinct Git blobs, totaling 4,291,704 bytes, reachable from locally available branches, tags, remote-tracking refs, and the saved stash. It found no matches for the checked private-key, provider-token, credential-URL, or JWT patterns. Secret values were not emitted.

## Verification and scope

`npm run validate` **passed** with Node `24.19.0` and npm `11.17.0`: formatting, zero-warning ESLint, TypeScript, 69 unit tests in 14 files, coverage thresholds, production build/prerender, and 14 Chromium end-to-end tests. Coverage was 98.73% statements, 94.91% branches, 99.21% functions, and 98.68% lines. The initial restricted run could not bind local ports; rerunning with local-server/browser permissions completed successfully.

Additional checks included both live npm audits, maintainer advisory verification, GitHub repository-control/alert/analysis inspection, public DNS/TLS/HTTP checks, generated-artifact inspection, and targeted local Chromium/module checks. All application findings remain unmodified for review. The report is not a penetration-test certification: no exploit was sent to the public site, no shared-host port scan or adjacent-domain investigation was performed, and account MFA, collaborator devices, deleted/unreachable history, remote-only refs, and every possible secret format were outside the evidence collected.

Before switching branches, eight tracked uncommitted changes on `feat/shareable-terminal-portfolio` were preserved in the named stash `pre-security-review-2026-11-12-feat-shareable-terminal-portfolio` (`d083526747649da509a5eb29dd3d99b6d4358055`). The stash was not applied to main or deleted.
