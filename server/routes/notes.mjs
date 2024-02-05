import express from "express";
import { getDb } from "../db/conn.mjs";
import pkg from 'mongodb';
const { ObjectId } = pkg;

const noteRoutes = express.Router();

noteRoutes.route("/note").get(async (req, res) => {
  const dbConnect = getDb("notebook");
  const result = await dbConnect.collection("notes").find({}).toArray();
  res.json(result);
});

noteRoutes.route("/note/:id").get(async (req, res) => {
  const dbConnect = getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const result = await dbConnect.collection("notes").findOne(myquery);
  res.json(result);
});

noteRoutes.route("/note/add").post(async (req, response) => {
  const dbConnect = getDb();
  const myobj = {
    note: req.body.note,
    starred: false,
    pinned: false,
  };
  const res = await dbConnect.collection("notes").insertOne(myobj);
  response.json(res);
});

noteRoutes.route("/updateStar/:id").put(async (req, response) => {
  const dbConnect = getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      starred: req.body.starred,
    },
  };
  const res = await dbConnect.collection("notes").updateOne(myquery, newvalues);
  console.log("1 document updated");
  response.json(res);
});

noteRoutes.route("/updatePin/:id").put(async (req, response) => {
  const dbConnect = getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      pinned: req.body.pinned,
    },
  };
  const res = await dbConnect.collection("notes").updateOne(myquery, newvalues);
  console.log("1 document updated");
  response.json(res);
});

noteRoutes.route("/:id").delete(async (req, response) => {
  const dbConnect = getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const res = await dbConnect.collection("notes").deleteOne(myquery);
  console.log("1 document deleted");
  response.json(res);
});

export default noteRoutes;