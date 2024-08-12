const mysql = require("mysql2");

function connectSqlDb() {
    const connection = mysql.createConnection({
        host:'localhost',
        user: 'roots',
        password:'root',
        database: 'book_data',
        port: 3307
    });
    connection.connect((err) => {
        if(err) {
            console.error("There is an error in connecting",err);
            return;
        }
        console.log("The server is connected to the database");
    })
    return connection;
}

module.exports = {
    connectSqlDb,
};
