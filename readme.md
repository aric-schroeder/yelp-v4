* Add Description to our campground model
* Show db.collection.drop()
* Add a show route/template


RESTFUL ROUTES

name     url           method   desc.
==============================================================
INDEX    /dogs         GET      Display list of all dogs
NEW      /dogs/new     GET      Displays form to make new dog
CREATE   /dogs         POST     Add new dog to DB, return /dogs
SHOW     /dogs/:id     GET      Shows info about one dog   

<!-- COMMENTS -->
INDEX    /campgrounds         GET      
NEW      /campgrounds/new     GET      
CREATE   /campgrounds         POST     
SHOW     /campgrounds/:id     GET      

NEW      /campgrounds/:id/comments/new   GET
CREATE   /campgrounds/:id/comments   POST