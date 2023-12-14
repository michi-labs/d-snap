export const idlFactory = ({ IDL }) => {
  const ImageMimeTypes = IDL.Variant({ 'jpg' : IDL.Null, 'jpeg' : IDL.Null });
  const Image = IDL.Record({
    'url' : IDL.Text,
    'encoding' : IDL.Text,
    'blob' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'size' : IDL.Nat,
    'mimetype' : ImageMimeTypes,
  });
  const BirthDay = IDL.Record({
    'day' : IDL.Nat8,
    'month' : IDL.Nat8,
    'year' : IDL.Nat8,
  });
  const CreateUserData = IDL.Record({
    'bio' : IDL.Text,
    'username' : IDL.Text,
    'picture' : Image,
    'birthday' : BirthDay,
  });
  const CreateUserError = IDL.Variant({
    'userNotAuthenticated' : IDL.Null,
    'userAlreadyExists' : IDL.Null,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Null, 'err' : CreateUserError });
  const CreatePostData = IDL.Record({
    'description' : IDL.Text,
    'images' : IDL.Vec(Image),
  });
  const CreatePostError = IDL.Variant({
    'userNotFound' : IDL.Null,
    'userNotAuthenticated' : IDL.Null,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : CreatePostError });
  const GetPostsFilters = IDL.Record({ 'to' : IDL.Int, 'from' : IDL.Int });
  const PostCommentLike = IDL.Record({
    'userId' : IDL.Principal,
    'createdAt' : IDL.Int,
  });
  const PostComment = IDL.Record({
    'id' : IDL.Principal,
    'linkedComment' : IDL.Opt(IDL.Principal),
    'userId' : IDL.Principal,
    'createdAt' : IDL.Int,
    'likes' : IDL.Vec(PostCommentLike),
    'comment' : IDL.Text,
  });
  const Post = IDL.Record({
    'id' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'likes' : IDL.Vec(IDL.Principal),
    'updatedAt' : IDL.Int,
    'comments' : IDL.Vec(PostComment),
    'images' : IDL.Vec(Image),
  });
  const GetPostsResult = IDL.Record({
    'data' : IDL.Vec(IDL.Tuple(IDL.Text, Post)),
  });
  const GetPostsError = IDL.Variant({
    'userNotFound' : IDL.Null,
    'userNotAuthenticated' : IDL.Null,
  });
  const Result_1 = IDL.Variant({
    'ok' : GetPostsResult,
    'err' : GetPostsError,
  });
  const UserProfile = IDL.Record({
    'bio' : IDL.Text,
    'username' : IDL.Text,
    'createdAt' : IDL.Int,
    'picture' : Image,
    'birthday' : BirthDay,
  });
  const GetProfileError = IDL.Variant({
    'userNotFound' : IDL.Null,
    'userNotAuthenticated' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : UserProfile, 'err' : GetProfileError });
  return IDL.Service({
    'create' : IDL.Func([CreateUserData], [Result_3], []),
    'createPost' : IDL.Func([CreatePostData], [Result_2], []),
    'getPosts' : IDL.Func([GetPostsFilters], [Result_1], ['composite_query']),
    'getProfile' : IDL.Func([], [Result], ['composite_query']),
  });
};
export const init = ({ IDL }) => { return []; };
