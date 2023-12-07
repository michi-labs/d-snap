import Text "mo:base/Text";
import Models "models";

module {
    public type UserProfile = {
        username : Text;
        createdAt : Int;
    };

    public type CreateUserData = {
        username : Text;
    };

    public type GetPostsResult = [(Text, Models.Post)];

    public type CreatePostData = {
        description : Text;
        images : [Text];
    };

    public type CreatePostResult = {
        id : Text;
    };
};
