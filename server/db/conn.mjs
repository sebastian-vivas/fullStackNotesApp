import pkg from 'mongodb';
const { MongoClient } = pkg;

const Db = "mongodb+srv://user:ABC123@database.rtodijr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

export const connectToServer = (callback) => {
  client.connect((err, db) => {
    if (db) {
      _db = db.db("notebook");
      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
};

export const getDb = () => {
  return _db;
};