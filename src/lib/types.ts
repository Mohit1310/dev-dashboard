export type RedditPost = {
  id: string;
  title: string;
  permalink: string;
  ups: number;
  num_comments: number;
};

export type MediumPost = {
  guid: string;
  link: string;
  title: string;
  pubDate: string;
};

export type DevToPost = {
  id: number;
  title: string;
  url: string;
  user: {
    username: string;
  };
  comments_count: number;
};
