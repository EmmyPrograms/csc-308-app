import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};


const generateId = () =>{
  return ((Math.floor(Math.random()*100))).toString();
}

const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserByJob = (usersFiltered, job) => {
  return usersFiltered.filter((usersFiltered) => usersFiltered.job === job);
};


const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name) {
    
    let result = findUserByName(name);
    if(job){
      result = findUserByJob(result, job);
    }
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Error: Resource Not Found");
  }
});

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userToDelete = findUserById(id);
  if (userToDelete) {
    users.users_list = users.users_list.filter((user) => user.id !== id);
    res.send();
  } else {
    res.status(404).send("Error: Resource Not Found");
  }
});

app.listen(port, () => {
  console.log(`Example app is running at http://localhost:${port}`);
});


