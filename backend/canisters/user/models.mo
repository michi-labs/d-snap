import Blob "mo:base/Blob";
import Image "../../libs/Image";

module {
    public type Post = {
        id : Text;
        description : Text;
        images : [Image.Image];
        likes : Nat8;
        createdAt : Int;
    };
};
