import express from "express";

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

const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name) {
    //question: history/context behind "let" and when to use it vs const in javascript
    let result = findUserByName(name);
    res.send(result);
  } else {
    res.send(users);
  }
});

app.listen(port, () => {
  console.log(`Example app is running at http://localhost:${port}`);
});

//also question, how can I get npx nodemon to run on the root? Little different than npm
