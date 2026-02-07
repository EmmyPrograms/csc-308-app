import express from "express";
import cors from "cors";
import User from "./user-services.js";

import connectDB from "./db.js";
//import User from "./user.js";

const app = express();
const port = 8000;

await connectDB().catch((error) => console.log(error));


const generateId = () => {
  return Math.floor(Math.random() * 100).toString();
};


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  connectDB().catch((error) => console.log(error));
  const name = req.query.name;
  const job = req.query.job;
  if (name) {
    User.getUsers(name)
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send("Error: Resource Not Found");
        }
      })
      .catch((error) => console.log(error));
    if (job) {
      User.getUsers(result, job)
        .then((result) => {
          if (result) {
            res.send(result);
          } else {
            res.status(404).send("Error: Resource Not Found");
          }
        })
        .catch((error) => console.log(error));
    }
  } else {
    User.getUsers().then((result) => {
      if(result){
      res.json( {users_list: result}).status(200);
    }else{
      res.status(404).send("Error: Resource Not Found");
    }}).catch((error) => console.log(error));;
  }
});

app.get("/users/:id", (req, res) => {
  connectDB().catch((error) => console.log(error));
  const id = req.params.id;
  User.findUserById(id).then((result) => {
      if(result){
      res.send(result);
    }else{
      res.status(404).send("Error: Resource Not Found");
    }}).catch((error) => console.log(error));
 
});


app.post("/users", (req, res) => {
  connectDB().catch((error) => console.log(error));
  const userToAdd = req.body;
  userToAdd.id = generateId();
  User.addUser(userToAdd).then((addedUser)=>{
    res.status(201).send(addedUser);
  }).catch((error) => console.log(error));
});
//idk how to do this yet :(

app.delete("/users/:id", (req, res) => {
  connectDB().catch((error) => console.log(error));
  const id = req.params.id;
  User.deleteUserById(id).then((userToDelete) => {
    if(userToDelete){
      res.status(204).send();
    }else{
      res.status(404).send("Error: Resource Not Found");
    }
  }).catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`Example app is running at http://localhost:${port}`);
});
