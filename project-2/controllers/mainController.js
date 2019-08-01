const hashFunc = require('js-sha256');

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let loadIndex = (request, response) => {
        if (checkSession(request)) {
            let currentUserId = request.cookies['user_id'];
            db.query.getAllNotes(currentUserId, (error, allResults) => {
                let currentUserId = request.cookies['user_id'];
                //console.log(allResults.rows);
                console.log("loadIndex======================");
                response.render('main/index', {
                    'allResults' : allResults
                });
            });
        } else {
            response.redirect('/login');
        }
    };

    let loadRegister = (request, response) => {
        response.render('main/register');
    };

    let registerNewUser = (request, response) => {
        let data = [request.body.username, hashFunc(request.body.password)];
        db.account.addUser(data, (error, results) => {
            if (error !== null) {
                let errormessage = `<h2>DUPLICATE USERNAME. CHOOSE ANOTHER.</h2><h5>${error.detail}</h5>`;
                response.status(403).send(errormessage);
            } else {
                giveCookie(results[0].id, request.body.username, response);

                // db.queryMod.getAll((error, allResults) => {
                //     console.log(allResults);
                //     response.render('/index', {
                //         allResults
                //     });
                // });
                console.log("##### login successful ##### ")
                response.redirect('/notes');
            }
        });
    };

    let loadLogin = (request, response) => {
        response.render('main/login');
    };

    let loginUser = (request, response) => {
        let hashedPW = hashFunc(request.body.password);
        let data = [request.body.username, hashFunc(request.body.password)];
        db.account.getUserLogin(data, (error, results) => {
            if (results === null) {
                response.status(403).send("<h2>USER NOT FOUND</h2>");
            } else {
                if (results[0].password === hashedPW) {
                    giveCookie(results[0].id, request.body.username, response);
                    let currentUser = results[0].id;
                    response.redirect('/');
                } else {
                    response.status(403).send("<h2>WRONG PASSWORD</h2>");
                }
            }
        });
    }

    let logoutUser = (request, response) => {
        destroyCookie(response);
        response.redirect('/');
    };

    let newNote = (request, response) => {
        if (checkSession(request)) {
            console.log("new note");
            console.log(request.body);
        //     let currentUserId = request.cookies['user_id'];
        //     let values = [request.body.title, request.body.content, request.body.image, currentUserId];
        //     db.query.addNewNote(values, (error, allResults) => {
        //         //let currentUserId = request.cookies['user_id'];
        //         //console.log(allResults);
        //         response.render('main/index', {
        //             'allResults' : allResults
        //         });
        //     });
        // } else {
        //     response.redirect('/login');
        }
    };

    let deleteNote = (request, response) => {
        if (checkSession(request)) {
            let currentUserId = request.cookies['user_id'];
            let notes_id = request.params.id;
            db.query.deleteNote(notes_id, (error, allResults) => {
                //let currentUserId = request.cookies['user_id'];
                //console.log(allResults);
                response.redirect('/');
            });
        } else {
            response.redirect('/login');
        }
    };

    let editNote = (request, response) => {
        if (checkSession(request)) {
            console.log("inside edit note route");
            let notes_id = request.params.id;
            let values = [request.body.title, request.body.content, request.body.image, notes_id];
            db.query.editNote(values, (error, allResults) => {
                //let currentUserId = request.cookies['user_id'];
                //console.log(allResults);
                // let data = {"allResults" : allResults};
                // response.redirect('/main/edit', data);
                response.redirect('/');
            });
        } else {
            response.redirect('/login');
        }
    };

    let loadEditNote = (request, response) => {
        if (checkSession(request)) {
            let notes_id = request.params.id;
            let currentUserId = request.cookies['user_id'];
            db.query.getNote(notes_id, (error, allResults) => {
                //let currentUserId = request.cookies['user_id'];
                //console.log(allResults);
                let data = {"allResults" : allResults};
                response.render('main/edit', data);
            });
        } else {
            response.redirect('/login');
        }
    };

    /**
     * ===========================================
     * Helper Functions
     * ===========================================
     */

    let giveCookie = function(userId, username, response) {
        let currentSessionCookie = hashFunc(userId + 'logged_id');
        response.cookie('takeanote', currentSessionCookie);
        response.cookie('user_id', userId);
        response.cookie('username', username);
    }

    let destroyCookie = function(response) {
        response.cookie('takeanote', "");
        response.cookie('user_id', "");
        response.cookie('username', "");
    }

    let checkSession = function(request) {
        let validSession = request.cookies['takeanote'];
        let validUser = request.cookies['user_id'];
        if (validSession && validUser) {
            if (hashFunc(validUser + 'logged_id') === validSession) {
                return true;
            }
        }
        console.log("authentification error");
        return false;
    };
    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        index: loadIndex,
        loadRegister: loadRegister,
        loadLogin: loadLogin,
        registerNewUser: registerNewUser,
        loginUser: loginUser,
        logoutUser     : logoutUser,
        newNote        : newNote,
        deleteNote        : deleteNote,
        editNote        : editNote,
        loadEditNote        : loadEditNote,
    };

}
// index           : loadIndex,
// login           : loadLogin,

// loginPost       : authenticateLogin,
// register        : loadRegistrationPage,

// profile         : loadProfilePage,
// newNote        : newNote,
// follows         : checkFollowsCount,
// newFollow       : addNewFollow,
// listFollowing   : listFollowings,
// getRelatedTwts  : loadRelatedTwts,
