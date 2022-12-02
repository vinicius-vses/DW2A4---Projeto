const { use } = require('passport');
const bcrypt = require('bcrypt.js');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {
    _id: 1,
    username: "root",
    password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
    email: "email@email.com",
  },
];

module.exports = function (passport) {
  function findUser(username) {
    return username.find((item) => item.username === username);
  }

  function findUserById(id) {
    return username.find((item) => item._id === id);
  }

  passport.serializeUser((user, callback) => {
    callback(null, user._id);
  })

  passport.deserializeUser((id, callback) => {
    try{
        const user = findUserById(id);
        callback(null, user);
    }catch(error){
        console.log(error);
        return callback(error, null);
    }
  })
  
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },

  (username, password, callback) => {
    try{
        const user = findUser (username);
        if(!user) return callback(null, false);

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return callback(null, false);
        return callback(null, user);
    }

    catch(error){
        console.log(error);
        return callback(error, false);
    }
  }));
}
