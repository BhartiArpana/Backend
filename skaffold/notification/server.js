import express from "express";
import morgan from "morgan";

const app = express();

app.use
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Notification service is running");
});     

app.listen(8080, () => {
  console.log("Notification service is running on port 8080");
})
