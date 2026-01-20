import { MongoClient } from "mongodb";
  
const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "mydb";

export const connectDB = async () => {
  await client.connect();                
  console.log("MongoDB Connected...");
  return client.db(dbName);             
};

import { connectDB } from "./db.js";

export const addUser = async () => {
  const db = await connectDB();
  const result = await db.collection("users").insertOne({
    name: "John",
    age: 25,
    email: "john@gmail.com"
  });

  console.log("User Inserted:", result.insertedId);
};

// Function to get all users from the "users" collection
export const getUsers = async () => {
  const db = await connectDB();
  const users = await db.collection("users").find().toArray();
  console.log("Users:", users);
};
