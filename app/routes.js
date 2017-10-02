var User            = require('../app/models/user');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
        res.render('index.ejs');
    });

app.get('/home', function(req, res) {
      res.render('index1.ejs');
  });

app.get('/form', function(req,res){
    res.render('form.ejs')
  });

  app.get('/mason', function(req, res) {
        res.render('mason.ejs');
    });

  app.get('/carpenter', function(req, res) {
          res.render('carpenter.ejs');
      });

  app.get('/plumber', function(req, res) {
            res.render('Plumber.ejs');
        });

  app.get('/painter', function(req, res) {
              res.render('painter.ejs');
          });

  app.get('/electricians', function(req, res) {
                      res.render('Electricians.ejs');
                  });

//
// app.get("/service", (req, res) => {
//    res.render('service.ejs');
// });
//
// app.get("/hiredetails", (req, res) => {
//    res.render('hiredetails.ejs');
// });

var User            = require('../app/models/user');
// var userArray =  require('../app/models/userArray');

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.render("profile.ejs");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

// normal routes ===============================================================

    // show the home page (will also have our login links)
    // app.get('/', function(req, res) {
    //     res.render('index.ejs');
    // });

    // PROFILE SECTION =========================


  //   app.get('/profile', function(req, res) {
  //
  //     User.findOne(function(err,user){
  //       if (err)
  //               return done(err);
  //
  //           // check to see if theres already a user with that email
  //           if (user) {
  //             console.log("THIS : " + user.country);
  //             res.render('profile.ejs', {
  //             user: user
  //           });
  //     }
  //   });
  //
  // });

  app.get('/profile', function(req, res) {
    User.find({}, function(err,user){
      if (err)
          return done(err);

      if (user) {
        console.log("Users count : " + user.length);
        res.render('index1.ejs', {
          usersArray:user
        });
      }
    });
  });

  
  // app.get('/profile', function(req, res) {
  //   User.find({}, function(err,user){
  //     if (err)
  //         return done(err);
  //
  //     if (user) {
  //       console.log("Users count : " + user.length);
  //       res.render('profile1.ejs', {
  //         usersArray:user
  //       });
  //     }
  //   });
  // });


    //add serial
    // app.get('/add', function(req, res) {
  	// 	res.render('profile.ejs'); // load the index.ejs file
  	// });


    //add eetails
    app.get('/detail', function(req, res) {
  		res.render('details.ejs'); // load the index.ejs file
  	});


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        app.get('/home', function(req, res) {
            res.render('index2.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        // app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
        //
        // // handle the callback after twitter has authenticated the user
        // app.get('/auth/twitter/callback',
        //     passport.authenticate('twitter', {
        //         successRedirect : '/profile',
        //         failureRedirect : '/'
        //     }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // // send to twitter to do the authentication
        // app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
        //
        // // handle the callback after twitter has authorized the user
        // app.get('/connect/twitter/callback',
        //     passport.authorize('twitter', {
        //         successRedirect : '/profile',
        //         failureRedirect : '/'
        //     }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // // twitter --------------------------------
    // app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    //     var user           = req.user;
    //     user.twitter.token = undefined;
    //     user.save(function(err) {
    //         res.redirect('/profile');
    //     });
    // });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
