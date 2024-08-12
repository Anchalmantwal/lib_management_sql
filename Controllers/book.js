 function handleInsertEntry(req, res, connection){
    const { book_name , author_name, published_year } = req.body;
    const query = `INSERT INTO books (book_name, author_name, published_year) VALUES(? ,?, ?)`;
    connection.execute(query , [book_name, author_name, published_year], (err,result) => {
        if(err){
            console.error("Error in Inserting Books" ,err);
            res.status(500).send("Error in Inserting Books");
        }
        res.status(200).send({id: result.insertId , book_name, author_name, published_year});
    })
 }
 
 function handleReadAllEntries(req, res, connection){
    const query =`SELECT * FROM books`;
    connection.query(query ,(err, result) => {
        if(err){
            console.log("Error in Reading book entries",err);
            res.status(500).send("Error in Reading book entries");
        }
        res.status(200).send(result);
    })
 }

 function handleUpdateEntry(req, res, connection){
    const {book_name, author_name, published_year} = req.body;
    const id = req.params.id;

    const updates = [];
    const values = [];

    if( book_name !== undefined){
        updates.push("book_name =?");
        values.push(book_name);
    }
    if(author_name !== undefined){
        updates.push("author_name =?");
        values.push(author_name);
    }
    if(published_year !== undefined){
        updates.push("published_year = ?");
        values.push(published_year);
    }    

    if(updates.length === 0){
        return res.status(400).send("No updates provided");
    }
    values.push(id);
        
    const query = `UPDATE books SET ${updates.join(", ")} WHERE id=?`;
    connection.execute(query , values, (err,result) => {
        if(err){
            console.error("Error in updating", err);
            res.status(500).send("Error in updating");
        }
        res.status(200).send({id: result.insertId, book_name, author_name, published_year});
    })
 }

function handleReadSelectedEntry(req, res, connection){
    const id = req.params.id;
    const query = `SELECT * FROM books where id = ?`
    connection.execute(query, [id], (err,result) => {
    if(err){
        console.error("Error in reading selected entry", err);
         return res.status(500).send("Error in reading selected entry");
    }
    if (result.length === 0) {
        return res.status(404).send("Book not found");
    }
    const book = result[0];
        res.status(200).send({
            id: book.id,
            book_name: book.book_name,
            author_name: book.author_name,
            published_year: book.published_year
        });
    });
}

function handleDeleteData(req, res, connection) {
    const id = req.params.id;
    const query = `DELETE FROM books WHERE id = ?`;

    connection.execute(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting book:", err);
            return res.status(500).send("Error deleting book");
        }
        res.status(200).send("Book is deleted");
    });
}

 module.exports = {handleInsertEntry
    , handleReadAllEntries
    , handleUpdateEntry
    , handleReadSelectedEntry
    , handleDeleteData
 };
