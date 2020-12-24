const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const helmet = require("helmet");
const cors = require("cors");
// const itemsRoutes = require("./routes/items");

const port = 3000;

const connectdb = async () => {
    const mongoConnection = await mongoose.connect("mongodb://localhost:27017/nodejs-auth", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    if (mongoConnection) {
        console.log("Connect To Database Is Success!");
    }
};
// https://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/

connectdb();

app.use(cors());

var whitelist = ["http://127.0.0.1:4200"];

var corsOptionsDelegate = function (req: any, callback: any) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.0.0" }));
// Implement X-XSS-Protection
app.use(helmet.xssFilter());
app.use(helmet.dnsPrefetchControl({ allow: true }));
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/api", authRoutes);

app.get("/", (req: any, res: any) => {
    res.json({
        message: "hello world App Works!!",
    });
});

app.listen(port, async (err: any) => {
    if (err) {
        throw err;
    }
    console.log(`
            +++++++++++++++++++++++++++++++++++
            server is listening on port ${port} 
            +++++++++++++++++++++++++++++++++++
        `);
});

// module.exports = app;
// https://github.com/santiq/nodejs-auth
