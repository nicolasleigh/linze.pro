export type Post = {
  content: string;
  title: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  user: {
    username: string;
    email: string;
  };
};
