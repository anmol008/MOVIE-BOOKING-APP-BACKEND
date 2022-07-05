module.exports = (mongoose) => {
    const Movie = mongoose.model(
        "movie",
        mongoose.Schema(
          {
            movieid: Number,
            title: String,
            published: Boolean,
            released: Boolean,
            poster_url: String,
            release_date: String,
            publish_date: String,
            artists: [
              {

                

                
                artistid: Number,
                first_name: String,
                last_name: String,
                wiki_url: String,
                profile_url: String,
                movies: [
                  {
                    type: String,
                  },
                ],
              },
            ],
            genres: [
              {
                type: String,
              },
            ],
            duration: Number,
            critic_rating: { type: Number, min: 0, max: 5 },
            trailer_url: String,
            wiki_url: String,
            story_line: String,
            shows: [
              {
                id: Number,
                theatre: { name: String, city: String },
                language: String,
                show_timing: String,
                available_seats: String,
                unit_price: Number,
              },
            ],
          },
          { timestamps: true }
        )
      );
      return Movie;
    };