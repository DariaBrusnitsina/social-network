export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  user: { id: number; username: string };
}

export interface IUser {
  firstName: string;
  lastName: string;
}
