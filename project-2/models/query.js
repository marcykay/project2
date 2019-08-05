/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let addNewNote = (values, callback) => {
        console.log("add new note");
        let query = 'INSERT INTO notes (title, content, image, owner_id, color) values ($1, $2, $3, $4, $5) returning *';
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    console.log("@addNewNote after query stage");
                    console.log(queryResult.rows);
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let deleteNote = (notes_id, callback) => {
        let query = 'DELETE FROM notes WHERE id=$1';
        let values = [];
        values.push(notes_id);
        console.log(values);
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let editNote = (values, callback) => {
        console.log("edit note");
        console.log(values);
        let query = 'UPDATE notes SET title=($1), content=($2), image=($3), color=($5) WHERE id=($4) RETURNING *';
        dbPoolInstance.query(query, values, (error, queryResult) => {
            console.log(queryResult);
            console.log(error);

            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let getNote = (notes_id, callback) => {
        console.log("get note");
        console.log(notes_id);
        let query = `SELECT * FROM notes WHERE id=$1`;
        let values = [];
        values.push(notes_id);
        dbPoolInstance.query(query, values, (error, queryResult) => {
            console.log(queryResult.rows);
            if (error) {
                console.log("error :" + error);
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    }


    let getAllNotes = (data, callback) => {
        console.log("get all notes");
        let query = `SELECT * FROM notes WHERE owner_id=$1 ORDER BY edited_time DESC`;
        let values = [];
        values.push(data);
        dbPoolInstance.query(query, values, (error, queryResult) => {
            console.log(queryResult);
            if (error) {
                console.log("error :" + error);
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    }



    return {
        addNewNote,
        deleteNote,
        editNote,
        getNote,
        getAllNotes
    };
};
