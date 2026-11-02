const BasePathSegmentPattern = /^[A-Za-z0-9._~-]+$/;

export const normalizeBasePath = (value: string): string => {
  const configuredPath = value.trim();

  if (configuredPath === '' || configuredPath === '/') {
    return '/';
  }

  const segments = configuredPath.split('/').filter(Boolean);
  const isProtocolRelative = configuredPath.startsWith('//');
  const hasTraversalSegments = segments.some((segment) => segment === '.' || segment === '..');
  const hasInvalidSegments = segments.some((segment) => !BasePathSegmentPattern.test(segment));
  const isSafeBasePath = !isProtocolRelative && !hasTraversalSegments && !hasInvalidSegments;

  if (!isSafeBasePath) {
    throw new Error(
      'VITE_BASE_PATH must be a root-relative URL path without traversal or special characters',
    );
  }

  return `/${segments.join('/')}/`;
};
