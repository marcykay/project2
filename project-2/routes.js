const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


module.exports = (app, allModels) => {
    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *        ALL ROUTES FOR MAIN CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    // require the controller
    const mainControllerCallbacks = require('./controllers/mainController')(allModels);

    app.get('/', mainControllerCallbacks.index);
    app.get('/notes', mainControllerCallbacks.index);
    app.get('/register', mainControllerCallbacks.loadRegister);
    app.get('/login', mainControllerCallbacks.loadLogin);
    app.get('/logout', mainControllerCallbacks.logoutUser);
    app.post('/register', mainControllerCallbacks.registerNewUser);
    app.post('/login', mainControllerCallbacks.loginUser);
    app.post('/notes/:id/delete', mainControllerCallbacks.deleteNote);
    app.put('/notes/:id/edit', mainControllerCallbacks.editNote);
    app.get('/notes/:id/edit', mainControllerCallbacks.loadEditNote);
    app.post('/notes/new', mainControllerCallbacks.newNote);
    app.get('/user', mainControllerCallbacks.returnAllNotes);
    app.post('/loadImage', upload.single('myFile'), mainControllerCallbacks.postImage);
    app.get('/loadImage', mainControllerCallbacks.loadImage);
    app.get('/dummy', mainControllerCallbacks.loadDummy);
};




// app.post('/Follow',          mainController.newFollow);
// app.post('/register',           mainController.registerPost);
// app.post('/login',              mainController.loginPost);
// app.get('/follows/followings',  mainController.listFollowing);
// app.get('/related',             mainController.getRelatedTwts);
// app.get('/follows',             mainController.follows);
// app.get('/profile',             mainController.profile);
// app.get('/register',            mainController.register);
// app.get('/logout',              mainController.logout);
// app.get('/login',               mainController.login);
// app.get('/',                    mainController.index);
