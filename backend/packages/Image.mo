module {
    public type ImageMimeTypes = { #jpeg; #jpg };

    // TODO: Check which fields are required
    public type Image = {
        // name : Text; // file.jpeg
        // encoding : Text; // '7bit'
        // mimetype : ImageMimeTypes; // image/jpeg
        // blob : Blob;
        // size : Nat; // Bytes
        url : Text;
    };
};
