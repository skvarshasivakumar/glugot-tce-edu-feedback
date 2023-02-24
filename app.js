//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var _=require("lodash");
const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
const homeStartingContent ="Make sure your Feedback is on Glugot Event and valid"
const line2="Glugot's Feedback Overflow accepts both postive and negative feedback.";
const line3 = "We will consider your valid feedbacks and make refinements in our further upcoming events";
const line4= "How to write a feedback? write your name - followed by your register no";
const line5="Click the Post your feedback button below Write in your feedback and then click Post";
const aboutContent = "About GLUGOT and GLUG Madurai" ;
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-varsha:varsha123@cluster0.oyyo7nr.mongodb.net/answer");
const schemanew=new mongoose.Schema({
  name:String,
  post:String
})
const posts=new mongoose.model("posts",schemanew);

app.get("/",function(req,res){
  posts.find({},function(err,posts){
    if(err){
      console.log(err);
    }
    else{
        res.render('home',{homeContent:homeStartingContent,one:line2,two:line3,three:line3,four:line4,five:line5,postsnew:posts});
    }
  });
});
// app.get("/posts/:topic",function(req,res){
//   var reqtitle = _.lowerCase(req.params.topic);
//   posts.forEach(function(postnew){
//     var newpara=postnew.post;
//     var newtitle = postnew.name;
//     if(newtitle===reqtitle)
//     {
//       res.render('post',{posttitle:newtitle,postpara:newpara});
//     }
//   });
// });

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  posts.findOne({_id: requestedPostId}, function(err, postnew){
    res.render("post", {posttitle: postnew.name,postpara: postnew.post});
  });

});
app.get("/about",function(req,res){
  res.render('about',{aboutcon:aboutContent});
});
app.get("/contact",function(req,res){
  res.render('contact',{contactcon:contactContent});
});
app.get("/compose",function(req,res){
  res.render('compose');
});
app.post("/compose",function(req,res){
      const  postnew= new posts({
        name: req.body.composetitle,
        post: req.body.composetext
      });
  postnew.save()
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
