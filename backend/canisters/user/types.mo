import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";

import Models "models";
import Image "../../packages/Image";

module {
    public type UserProfile = {
        username : Text;
        picture : Image.Image;
        bio : Text;
        createdAt : Int;
    };

    public type CreateUserData = {
        username : Text;
        picture : Image.Image;
        bio : Text;
    };

    // TODO: improve these fields
    public type GetPostsFilters = {
        from : Int;
        to : Int;
    };

    public type GetPostsResult = {
        data : [(Text, Models.Post)];
    };

    public type CreatePostData = {
        description : Text;
        images : [Image.Image];
    };

    public type CreatePostResult = {
        id : Text;
    };
};
