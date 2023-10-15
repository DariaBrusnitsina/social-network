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

export interface IAuth {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface IUsers {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  birthDate: string;
}
