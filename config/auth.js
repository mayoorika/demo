// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '118547465531627', // your App ID
        'clientSecret'    : 'd6a526c9a9b3a0a5bc24f5963a9582a0', // your App Secret
        'callbackURL'     : 'http://127.0.0.1:8080/auth/facebook/callback',
        'profileFields'   :  ['emails']
      //  'callbackURL'     : 'https://ukiassignment3bymayoori.herokuapp.com/auth/facebook/callback'
        // // 'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },


    'googleAuth' : {
        'clientID'         : '662925948866-nedhiei564qr72i065t5v2nhqe0gvo5g.apps.googleusercontent.com',
        'clientSecret'     : 'NvZYGoAg0oWJj2g8MS3ZzYuo',
        'callbackURL'      : 'http://127.0.0.1:8080/auth/google/callback'
        // 'callbackURL'      : 'https://ukiassignment3bymayoori.herokuapp.com/auth/google/callback'
    }

};
