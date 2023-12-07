import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";

import Models "models";
import Image "../../libs/Image";

module {
    public type UserProfile = {
        username : Text;
        picture : Image.Image;
        bio : Text;
        birthday : BirthDay;
        createdAt : Int;
    };

    public type BirthDay = {
        month : Nat8;
        day : Nat8;
        year : Nat8;
    };

    public type CreateUserData = {
        username : Text;
        picture : Image.Image;
        bio : Text;
        birthday : BirthDay;
    };

    public type GetPostsFilters = {
        page : Nat;
        pageSize : Nat;
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
