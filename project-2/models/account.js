/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let addUser = (values, callback) => {
        let query = 'INSERT INTO users (username, password) values ($1, $2) returning *';
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

    let getUserLogin = (data, callback) => {
        console.log(data);
        let query = 'SELECT * FROM users WHERE username=($1)';
        let values = [];
        values.push(data[0]);

        dbPoolInstance.query(query, values, (error, queryResult) => {
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
        addUser,
        getUserLogin
    };
};
