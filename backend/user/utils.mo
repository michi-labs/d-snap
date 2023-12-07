import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";

module Utils {
    public func generatePostId(user : Principal) : Text {
        let now = Time.now();
        let id = Principal.toText(user) # "@" # Int.toText(now);
        return id;
    };
};
