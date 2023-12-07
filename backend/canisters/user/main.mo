import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

import Models "models";
import Types "types";
import UserClass "class";

actor User {
    type User = {
        id : Principal;
        canister : UserClass.User;

    };

    let users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

    type CreateUser = {
        username : Text;
    };

    type CreateUserError = { #userAlreadyExists };

    public shared ({ caller }) func create(data : CreateUser) : async Result.Result<(), CreateUserError> {
        // TODO: prevent create if user is anonymous
        let user : ?User = users.get(caller);

        switch user {
            case (?usr) #err(#userAlreadyExists);
            case null {
                // TODO: add cyles correctly
                Cycles.add(113_846_199_230);
                let canister = await UserClass.User(caller, data);
                let newUser : User = {
                    id = caller;
                    canister = canister;
                };
                users.put(caller, newUser);
                #ok();
            };
        };
    };

    type GetProfileError = { #userNotFound };

    public composite query ({ caller }) func getProfile() : async Result.Result<Types.UserProfile, GetProfileError> {
        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let profile : Types.UserProfile = await usr.canister.getProfile();
                #ok(profile);
            };
            case null #err(#userNotFound);
        };
    };

    type GetPostsError = { #userNotFound };

    public composite query ({ caller }) func getPosts() : async Result.Result<Types.GetPostsResult, GetPostsError> {
        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let posts : [(Text, Models.Post)] = await usr.canister.getPosts();
                #ok(posts);
            };
            case null #err(#userNotFound);
        };
    };

    type CreatePostError = { #userNotFound };

    public shared ({ caller }) func createPost(data : Types.CreatePostData) : async Result.Result<(), CreatePostError> {
        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let result = usr.canister.createPost(data);
                #ok();
            };
            case null #err(#userNotFound);
        };
    };
};
