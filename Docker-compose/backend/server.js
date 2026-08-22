import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];
  res.status(200).json(users);
});

app.get('*name', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
