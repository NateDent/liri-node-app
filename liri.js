require('dotenv').config();
var request = require('request');
var colors = require('colors');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var type = process.argv[2];
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
if (type == "my-tweets") {
    var params = { screen_name: 'coachdent_dev' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        if (process.argv[3] == undefined) {
          for (i = 0; i < 20; i++) {
            console.log("\n@coachdent_dev said: ".red + "\n" + tweets[i].text + "\n" + "On: " + tweets[i].created_at.green.underline + "." + "\n")
          }
        } else {
          for (i = 0; i < process.argv[3]; i++) {
            console.log("\n@coachdent_dev said: ".red + "\n" + tweets[i].text + "\n" + "On: " + tweets[i].created_at.green.underline + "." + "\n")
          };
        };
      };
    });
  };
 
  var spotify = new Spotify({
    id:  process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   
  if (type == "spotify-this-song") {
    var songTitle = process.argv[3]
    if (songTitle === undefined) {
      songTitle = "Push it";
    }
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      var items = data.tracks.items;
      for (i = 0; i < items.length; ++i) {
        console.log("\n" + "Song information for query".bold + ": " + '"' + songTitle + '"' + ".");
        console.log("Song Name: ".bold.green + items[i].name);
        for (k = 0; k < items[i].artists.length; ++k) {
          console.log("Artist: ".bold.green + items[i].artists[k].name.red);
        }
        console.log("Album Name: ".bold.green + items[i].album.name.red);
  
        console.log("Spotify Link: ".bold.green + items[i].preview_url);
      }
      console.log("\n");
  
    });
  };
  if (type == "movie-this") {
    var movie = process.argv[3];
    if (movie == undefined) {
      movie = "Mr. Nobody"
    }
    request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r==json&apikey=trilogy', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);
        console.log("\nTitle".bold.underline + ": " + json.Title.underline + ".");
        console.log("Year".bold.underline + ": " + json.Year.green + ".");
        console.log("IMDB Rating".bold.underline + ": " + json.imdbRating.green + ".");
        console.log("Country".bold.underline + ": " + json.Country.green + ".");
        console.log("Language".bold.underline + ": " + json.Language.green + ".");
        console.log("Plot".bold.underline + ": " + json.Plot.green);
        console.log("Actors".bold.underline + ": " + json.Actors.green + ".");
        console.log("Rotten Tomatoes rating".bold.underline + ": " + json.tomatoRating.green + ".");
        console.log("Rotten Tomatoes URL".bold.underline + ": " + json.tomatoURL.green + "." + "\n");
      };
    });
  };