console.log("Hello, World!");

const express =require("express");
const parser = require("body-parser");

const app = express();

app.use(parser.json()); // every req we receive will first pass through this function and convert the body into json

const cows = require("./cows");
const dogRoutes = require("./routes/dogRoutes");

app.use((req, res, next) => {
    console.log(req.method, req.url, new Date())
    return next(); // next -> app.post(...)
});

app.get("/", (request, response) => {
    response.send(cows.speak("Mooooooo"));
});

app.use("/dog", dogRoutes);


app.use("*", (req, res, next) => {
    return next({status: 404, message: "Invalid URL"});
});

app.use((err, req, res, next) => {
     res.status(err.status).send(err.message);
})

const server = app.listen(4494, () => {
     console.log("Server successfully started on port", server.address().port);
});