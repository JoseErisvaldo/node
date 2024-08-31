import express from "express";

const app = express();
const port = 9000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});