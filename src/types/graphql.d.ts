/* tslint:disable:no-namespace */
/* tslint:disable:no-trailing-whitespace */
/* tslint:disable:semicolon */

export interface Query {
  posts: Array<Post> | null;
  post: Post | null;
  authors: Array<Author> | null;
  votes: Array<Post> | null;
}

export interface PostQueryArgs {
  postId: number | null;
}

export interface Post {
  id: number;
  title: string | null;
  author: Author | null;
  votes: number | null;
}

export interface Author {
  id: number;
  firstName: string | null;
  lastName: string | null;
  posts: Array<Post> | null;
}

export interface Mutation {
  upvotePost: Post | null;
}

export interface UpvotePostMutationArgs {
  postId: number;
}

export interface Subscription {
  postUpvoted: Post | null;
}

export namespace AllPostsQuery {
  export type Variables = {
  }

  export type Result = {
    posts: Array<Posts>;
  } 

  export type Posts = {
    id: number;
    title: string;
    votes: number;
    author: Author;
  } 

  export type Author = {
    id: number;
    firstName: string;
    lastName: string;
  } 
}

export namespace GetPostQuery {
  export type Variables = {
      postId: number;
  }

  export type Result = {
    post: Post;
  } 

  export type Post = {
    id: number;
    title: string;
    votes: number;
    author: Author;
  } 

  export type Author = {
    id: number;
    firstName: string;
    lastName: string;
  } 
}

export namespace UpvotePostMutation {
  export type Variables = {
      postId: number;
  }

  export type Result = {
    upvotePost: UpvotePost;
  } 

  export type UpvotePost = {
    id: number;
    votes: number;
  } 
}
