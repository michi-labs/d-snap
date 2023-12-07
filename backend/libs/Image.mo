module {
    public type ImageMimeTypes = { #jpeg; #jpg };
    public type Image = {
        name : Text; // file.jpeg
        // encoding : Text; // '7bit'
        // mimetype : ImageMimeTypes; // image/jpeg
        // blob : Blob;
        // size : Nat; // Bytes
        url : Text;
    };
};
