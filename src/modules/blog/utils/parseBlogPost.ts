import { parse } from 'yaml';

import type { BlogPost, BlogPostSource } from '../types/blogPost.ts';

const FrontMatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
const IsoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const SlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FrontMatterParseOptions = {
  maxAliasCount: 0,
  merge: false,
  strict: true,
  uniqueKeys: true,
} as const;

const parseMetadata = (source: string, path: string): unknown => {
  try {
    return parse(source, FrontMatterParseOptions);
  } catch (cause) {
    throw new Error(`${path}: invalid YAML front matter`, { cause });
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  const isObject = typeof value === 'object' && value !== null;
  return isObject && !Array.isArray(value);
};

const readRequiredString = (
  metadata: Record<string, unknown>,
  field: 'date' | 'slug' | 'title',
  path: string,
): string => {
  const value = metadata[field];
  const isString = typeof value === 'string';
  const hasContent = isString && value.trim().length > 0;

  if (!hasContent) {
    throw new Error(`${path}: front matter field '${field}' must be a non-empty string`);
  }

  return value.trim();
};

const validateDate = (date: string, path: string): void => {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  const hasValidTimestamp = !Number.isNaN(parsedDate.valueOf());
  const isCalendarDate = hasValidTimestamp && parsedDate.toISOString().slice(0, 10) === date;
  const isValidDate = IsoDatePattern.test(date) && isCalendarDate;

  if (!isValidDate) {
    throw new Error(`${path}: front matter field 'date' must use YYYY-MM-DD`);
  }
};

const validateSlug = (slug: string, path: string): void => {
  if (!SlugPattern.test(slug)) {
    throw new Error(
      `${path}: front matter field 'slug' must use letters, numbers, and single hyphens`,
    );
  }
};

export const parseBlogPost = ({ path, markdown }: BlogPostSource): BlogPost => {
  const frontMatter = FrontMatterPattern.exec(markdown);

  if (!frontMatter) {
    throw new Error(`${path}: expected YAML front matter at the start of the file`);
  }

  const metadata = parseMetadata(frontMatter[1], path);

  if (!isRecord(metadata)) {
    throw new Error(`${path}: front matter must be a YAML object`);
  }

  const date = readRequiredString(metadata, 'date', path);
  const slug = readRequiredString(metadata, 'slug', path).toLowerCase();
  const title = readRequiredString(metadata, 'title', path);
  validateDate(date, path);
  validateSlug(slug, path);

  return {
    slug,
    title,
    date,
    content: markdown.slice(frontMatter[0].length),
  };
};
