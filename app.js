const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      seedDB = require("./seeds")

mongoose.connect('mongodb://localhost:27017/yelpCamp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

// INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err); 
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = 
    {
        name: name, 
        image: image, 
        description: description,
    };
    // create new campground, save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


// NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});


// SHOW - SHOW MORE INFO ON INFIVIDUAL CAMPGROUND
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// ==============
// COMMENTS ROUTES
// ==============
app.get("/campgrounds/:id/comments/new", (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
}); 

app.post("/campgrounds/:id/comments", (req, res) => {
    // lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`);
                    console.log(req.body.comment);
                }
            });
        }
    });
    // create new comment
    // connect campground show page
    // redirect to campground show page
});


app.listen(3000, "localhost", () => {
    console.log("The Server has started...");
});

