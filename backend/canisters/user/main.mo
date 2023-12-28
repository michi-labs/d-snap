import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

import Models "models";
import Types "types";
import UserClass "class";

actor User {
    type User = {
        id : Principal;
        canister : UserClass.User;
    };

    // TODO: Not persistent
    let users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

    type CreateUserError = {
        #userAlreadyExists;
        #userNotAuthenticated;
        #userCouldNotBeCreated;
    };

    public composite query func getProfileByPrincipal(principal : Principal) : async Result.Result<Types.UserProfile, GetProfileError> {        
        let user : ?User = users.get(principal);

        switch user {
            case (?usr) {
                let profile : Types.UserProfile = await usr.canister.getProfile();
                #ok(profile);
            };
            case null #err(#userNotFound);
        };
    };

    public composite query func getPostsByUserId(principal : Principal) : async Result.Result<Types.GetPostsResult, GetPostsError> {
        let user : ?User = users.get(principal);

        switch user {
            case (?usr) {
                let posts : Types.GetPostsResult = await usr.canister.getPosts();
                #ok(posts);
            };
            case null #err(#userNotFound);
        };
    };

    public query func getUsers() : async [User] {
        Iter.toArray(users.vals());
    };

    public shared ({ caller }) func create(data : Types.CreateUserData) : async Result.Result<(), CreateUserError> {
        // if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);
        // TODO: Verifify crossdevice principals

        let user : ?User = users.get(caller);

        switch user {
            case (?usr) return #err(#userAlreadyExists);
            case null {
                Debug.print("User does not exists");
                try {
                    // TODO: add cyles correctly
                    Cycles.add(113_846_199_230);
                    let canister = await UserClass.User(caller, data);
                    let newUser : User = {
                        id = caller;
                        canister = canister;
                    };
                    users.put(caller, newUser);
                    return #ok();
                } catch (error) {
                    return #err(#userCouldNotBeCreated);
                };
            };
        };
    };

    type GetProfileError = { #userNotFound; #userNotAuthenticated };

    public composite query ({ caller }) func getProfile() : async Result.Result<Types.UserProfile, GetProfileError> {
        // if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

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

    public composite query ({ caller }) func getPosts() : async Result.Result<Types.GetPostsResult, GetPostsError> {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let user : ?User = users.get(caller);

        switch user {
            case (?usr) {
                let posts : Types.GetPostsResult = await usr.canister.getPosts();
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
