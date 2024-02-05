const express = require("express");
const noteRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
noteRoutes.route("/note").get(function (req, res) {
 let db_connect = dbo.getDb("notebook");
 db_connect
   .collection("notes")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
noteRoutes.route("/note/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("notes")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
noteRoutes.route("/note/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   note: req.body.note,
   starred: false,
   pinned: false,
 };
 db_connect.collection("notes").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
noteRoutes.route("/updateStar/:id").put(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     starred: req.body.starred,
   },
 };
 db_connect
   .collection("notes")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

noteRoutes.route("/updatePin/:id").put(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        pinned: req.body.pinned,
      },
    };
    db_connect
      .collection("notes")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
   });
 
noteRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("notes").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = noteRoutes;