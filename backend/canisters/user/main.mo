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

    type CreateUserError = { #userAlreadyExists; #userNotAuthenticated };

    public shared ({ caller }) func create(data : Types.CreateUserData) : async Result.Result<(), CreateUserError> {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

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

    type GetProfileError = { #userNotFound; #userNotAuthenticated };

    public composite query ({ caller }) func getProfile() : async Result.Result<Types.UserProfile, GetProfileError> {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let profile : Types.UserProfile = await usr.canister.getProfile();
                #ok(profile);
            };
            case null #err(#userNotFound);
        };
    };

    type GetPostsError = { #userNotFound; #userNotAuthenticated };

    public composite query ({ caller }) func getPosts(filters : Types.GetPostsFilters) : async Result.Result<Types.GetPostsResult, GetPostsError> {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let posts : Types.GetPostsResult = await usr.canister.getPosts(filters);
                #ok(posts);
            };
            case null #err(#userNotFound);
        };
    };

    type CreatePostError = { #userNotFound; #userNotAuthenticated };

    public shared ({ caller }) func createPost(data : Types.CreatePostData) : async Result.Result<(), CreatePostError> {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

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
