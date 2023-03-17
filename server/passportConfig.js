const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((mail, password_, done) => {
            const query = "SELECT * FROM ipk.users where mail = ?";
            db.query(query, [mail] ,(err, rows) => {
                if(err)throw err;  
                if(rows.length === 0) {
                    return done(null, false);
                }
                bcrypt.compare(password_, rows[0].password_, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, rows[0]);
                    } 
                    else {
                        return done(null, false);
                    }
                })
            })
        }))


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })


    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM ipk.users where id = ?";
        db.query(query, [id] ,(err, rows) => {
            if(err)throw err;  
            const userInfo = {
                id: rows[0].id,
                mail: rows[0].mail
            }
            done(null, userInfo);
        })
    }) 
}