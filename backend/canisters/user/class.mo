import Principal "mo:base/Principal";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Iter "mo:base/Iter";

import Utils "utils";
import Types "types";
import Models "models";

shared ({ caller }) actor class User(id : Principal, data : Types.CreateUserData) {
    stable let _admin = caller;
    stable let _id = id;
    stable var _data : Types.UserProfile = {
        username = data.username;
        picture = data.picture;
        bio = data.bio;
        // birthday = data.birthday;
        createdAt = Time.now();
    };

    let posts = HashMap.HashMap<Text, Models.Post>(0, Text.equal, Text.hash);

    public query func getProfile() : async Types.UserProfile {
        return _data;
    };

    public shared func createPost(data : Types.CreatePostData) : async Types.CreatePostResult {
        let postId = Utils.generatePostId(id);
        let post : Models.Post = {
            id = postId;
            description = data.description;
            images = data.images;
            likes = [];
            comments = [];
            createdAt = Time.now();
            updatedAt = Time.now();
        };

        posts.put(postId, post);

        let result = {
            id = postId;
        };
    };

    public query func getPosts(filters : Types.GetPostsFilters) : async Types.GetPostsResult {
        // TODO: implement filters
        let postsIter : Iter.Iter<(Text, Models.Post)> = posts.entries();
        let postsArray : [(Text, Models.Post)] = Iter.toArray(postsIter);

        let result : Types.GetPostsResult = {
            data = postsArray;
        };

        return result;
    };
};
