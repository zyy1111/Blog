var bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());  //must after the bodyParser
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test",
//     image: "data:image/jpeg;base64,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",
//     body: "Nice to meet you!"
// })

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log(err);
        } else{
            res.render("index", {blogs : blogs});
        }
    })
})

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
})

//CREATE ROUTE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitizer(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
})

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog : foundBlog});
        }
    })
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitizer(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started!!");
})
