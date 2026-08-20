import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/api/data', (req, res) => {
  const data = {
    message: 'This is some data from the backend API',
    timestamp: new Date().toISOString()
  };
  res.json(data);
})

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' }, 
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  res.json(users);
});

export default app;