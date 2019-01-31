const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
    {
        name: "Clouds rest", 
        image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description: "Cool place to be"
    },
    {
        name: "Washington", 
        image: "https://www.nps.gov/colm/planyourvisit/images/campground.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "lol"
    },
    {
        name: "Something else", 
        image: "https://www.fondulacpark.com/wp-content/uploads/2015/01/campground-pic-1.jpg",
        description: "Gross"
    }

];

// Remove all campgrounds
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
         Comment.remove({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed comments!");
              //add a few campgrounds
             data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a campground");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     }); 
     //add a few comments
 }
module.exports = seedDB;



