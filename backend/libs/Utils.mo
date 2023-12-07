import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Random "mo:base/Random";
import Principal "mo:base/Principal";

module {
    public func generatePrincipal() : async Principal {
        let randomBlob = await Random.blob();
        let blobArray = Blob.toArray(randomBlob);
        let subArray = Array.subArray<Nat8>(blobArray, 0, 28);
        Principal.fromBlob(Blob.fromArray(subArray));
    };
};
