const express = require("express");
const { connectSqlDb} = require("./connection");
const app = express();
const PORT = 8000;

const bookRoutes = require("./Routes/book");

const connection = connectSqlDb();

app.use(express.json());
app.use("/", bookRoutes(connection));

app.listen(PORT ,() => console.log(`The server is on the port ${PORT}`));
