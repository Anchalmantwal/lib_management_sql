const express = require("express");
const router = express.Router();

const {handleInsertEntry, handleReadAllEntries, handleUpdateEntry, handleReadSelectedEntry, handleDeleteData} = require("../Controllers/book")

module.exports = (connection) => {
    router.post("/books", (req, res) => handleInsertEntry(req, res, connection));
    router.get("/books", (req, res) => handleReadAllEntries(req, res, connection));
    router.patch("/books/:id", (req, res) => handleUpdateEntry(req, res, connection));
    router.get("/books/:id", (req, res) => handleReadSelectedEntry(req, res, connection));
    router.delete("/books/:id", (req, res) => handleDeleteData(req, res, connection));

    return router;
};
