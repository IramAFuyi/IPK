const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const db = require('./db');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); 

app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(cookieParser('keyboard cat')); 


app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport); 


app.get('/', (req, res) => {
    res.send("hello world");
  });




app.post('/register', (req, res) => {
    const mail = req.body.mail;
    const password_ = req.body.password_;
    const birthdate = req.body.birthdate;

    const query = "INSERT INTO users(`mail`, `password_`, `birthdate`) VALUES (?,?,?)";
    const query2 = "SELECT * FROM users WHERE mail = ?";
  
    db.query(query2, [mail] , (err, result) => {
      if(err){throw err;}
      if(result.length > 0) {
        res.send({message: "Correo electrónico ya utilizado"});
        }
      if(result.length === 0) {
        const hashedPassword = bcrypt.hashSync(password_, 10);
        db.query(query, [mail, hashedPassword, birthdate], (err, result) => {
          if(err) {throw err;}
          res.send({message: "User created"});
        })
      }
    });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { 
    if (err) {console.log(err);}
    if (!user) {res.send("User not found");}
    if (user) {
      req.login(user, (err) => {
        if (err) {console.log(err);}
        res.send("User logged in");
        console.log(user);
      })
    }
  })(req, res, next); 
})


app.get('/getUser', (req, res) => {
  res.send(req.user);
})


app.listen(3001, () => {console.log('Server started on port 3001')});
