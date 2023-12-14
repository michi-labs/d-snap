import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BirthDay { 'day' : number, 'month' : number, 'year' : number }
export interface CreatePostData {
  'description' : string,
  'images' : Array<Image>,
}
export type CreatePostError = { 'userNotFound' : null } |
  { 'userNotAuthenticated' : null };
export interface CreateUserData {
  'bio' : string,
  'username' : string,
  'picture' : Image,
  'birthday' : BirthDay,
}
export type CreateUserError = { 'userNotAuthenticated' : null } |
  { 'userAlreadyExists' : null };
export type GetPostsError = { 'userNotFound' : null } |
  { 'userNotAuthenticated' : null };
export interface GetPostsFilters { 'to' : bigint, 'from' : bigint }
export interface GetPostsResult { 'data' : Array<[string, Post]> }
export type GetProfileError = { 'userNotFound' : null } |
  { 'userNotAuthenticated' : null };
export interface Image {
  'url' : string,
  'encoding' : string,
  'blob' : Uint8Array | number[],
  'name' : string,
  'size' : bigint,
  'mimetype' : ImageMimeTypes,
}
export type ImageMimeTypes = { 'jpg' : null } |
  { 'jpeg' : null };
export interface Post {
  'id' : string,
  'createdAt' : bigint,
  'description' : string,
  'likes' : Array<Principal>,
  'updatedAt' : bigint,
  'comments' : Array<PostComment>,
  'images' : Array<Image>,
}
export interface PostComment {
  'id' : Principal,
  'linkedComment' : [] | [Principal],
  'userId' : Principal,
  'createdAt' : bigint,
  'likes' : Array<PostCommentLike>,
  'comment' : string,
}
export interface PostCommentLike { 'userId' : Principal, 'createdAt' : bigint }
export type Result = { 'ok' : UserProfile } |
  { 'err' : GetProfileError };
export type Result_1 = { 'ok' : GetPostsResult } |
  { 'err' : GetPostsError };
export type Result_2 = { 'ok' : null } |
  { 'err' : CreatePostError };
export type Result_3 = { 'ok' : null } |
  { 'err' : CreateUserError };
export interface UserProfile {
  'bio' : string,
  'username' : string,
  'createdAt' : bigint,
  'picture' : Image,
  'birthday' : BirthDay,
}
export interface _SERVICE {
  'create' : ActorMethod<[CreateUserData], Result_3>,
  'createPost' : ActorMethod<[CreatePostData], Result_2>,
  'getPosts' : ActorMethod<[GetPostsFilters], Result_1>,
  'getProfile' : ActorMethod<[], Result>,
}
