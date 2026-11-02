export type BlogPost = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly content: string;
};

export type BlogPostSource = {
  readonly path: string;
  readonly markdown: string;
};
