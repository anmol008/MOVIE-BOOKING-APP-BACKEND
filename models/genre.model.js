module.exports = (mongoose) => {
    const Genre = mongoose.model(
        "genre",
        mongoose.Schema(
          {
            
            genreid: Number,
            genre: String,
          },
          { timestamps: true }
        )
    );
    
    return Genre;
  };