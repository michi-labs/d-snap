import Text "mo:base/Text";

import Models "models";
import Image "../../libs/Image";

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
        images : [Image.Image];
    };

    public type CreatePostResult = {
        id : Text;
    };
};
