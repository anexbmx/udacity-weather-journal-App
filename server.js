const express = require("express");
const app = express();
const PORT = 3000;

const projectData = {};

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("website"));

// POST route
app.get("/all", (req, res) => {
    res.send(projectData);
})
// GET route
app.post("/add", (req, res) => {
    const body = req.body;
    projectData["temperature"] = body.temperature;
    projectData["date"] = body.date;
    projectData["userResponse"] = body.userResponse;
    res.send(projectData);
})

app.listen(PORT, () => {
    console.log("server is runing on port "+ PORT);
})