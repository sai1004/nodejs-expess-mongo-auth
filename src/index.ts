const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
// const itemsRoutes = require("./routes/items");

// const monk = require("monk");

const connectdb = async () => {
    const mongoConnection = await mongoose.connect("mongodb://localhost:27017/nodejs-auth", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("Database ready!");
};
// https://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/

connectdb();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", userRoutes);

app.get("/", (req: any, res: any) => {
    res.json({
        message: "hello world",
    });
});

app.listen(3000, async (err: any) => {
    if (err) {
        throw err;
    }
    console.log("server is listening on port ", 3000);
});

// module.exports = app;
// https://github.com/santiq/nodejs-auth
