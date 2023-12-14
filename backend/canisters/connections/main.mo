import List "mo:base/List";
import Principal "mo:base/Principal";

actor {
    type User = {
        userId : Principal;
        status : Text;
    };
    type Connection = {
        people : [User];
        createdAt : Text;
    };

    type ConnectionList<Principal> = ?(Principal, ConnectionList<Principal>);
    stable var connections : ConnectionList<Principal> = List.nil();

    public query func getAll(userId : Principal) : async ConnectionList<Principal> {
        return connections;
    };

    public query func getPennding(userId : Principal) : async ConnectionList<Principal> {
        return connections;
    };

    public shared func requestConnection(from : Principal, to : Principal) {

    };

    public shared func acceptConnection() {

    };

    public shared func rejectConnection() {

    };

    public shared func removeConnection(from : Principal, to : Principal) {
        // friends := List.filter(friends, func(item : Principal) : Bool { item != id });
    };
};
