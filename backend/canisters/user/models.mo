import Blob "mo:base/Blob";
import Principal "mo:base/Principal";

import Image "../../libs/Image";

module {
    public type PostCommentLike = {
        userId : Principal;
        createdAt : Int;
    };
    public type PostComment = {
        id : Principal;
        userId : Principal;
        comment : Text;
        linkedComment : ?Principal;
        likes : [PostCommentLike];
        createdAt : Int;
    };

    public type PostLike = {
        userId : Principal;
        createdAt : Int;
    };

    public type Post = {
        id : Text;
        description : Text;
        images : [Image.Image];
        likes : [Principal];
        comments : [PostComment];
        createdAt : Int;
        updatedAt : Int;
    };
};
