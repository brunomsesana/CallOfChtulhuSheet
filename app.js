const db = require('./db.js').db
const express = require('express')
const session = require('express-session')
const app = express();
const bp = require('body-parser')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config({path: "./.env"})

app.use(session({secret: process.env.SESSION_SECRET}))
app.use(bp())
app.set('view-engine', 'hbs')
app.use(express.static('public'))
app.get('/', (req, res) =>{
    if (req.session.login != null){
        res.render('index.hbs')
    } else {
        res.redirect('/login')
    }
})
app.get('/login', (req, res) =>{
    req.session.login = null;
    res.render('login.hbs')
})
app.get('/register', (req, res) =>{
    req.session.login = null;
    res.render('register.hbs')
})
app.post('/auth/register', (req, res) =>{
    if (req.body.password == req.body.passwordc){
        db.query("SELECT email FROM login WHERE email=$1", [req.body.email], (error, result) =>{
            if (result.rowCount > 0){
                res.render('register.hbs', {message: "Email already registered"})
            } else {
                db.query("SELECT email FROM login", (error, result) =>{
                    var id;
                    if (result.rowCount > 0){
                        id = result.rowCount + 1;
                    } else {
                        id = 1;
                    }
                    var hashedPass = bcrypt.hashSync(req.body.password, 8)
                    db.query("INSERT INTO login(id, name, email, password) VALUES($1, $2, $3, $4)", [id, req.body.name, req.body.email, hashedPass])
                    req.session.login = id;
                    res.redirect('/')
                })
            }
        })
    } else {
        res.render('register.hbs', {message: "Both passwords must be the same"})
    }
})
app.post('/auth/login', (req, res) =>{
    db.query("SELECT password,id FROM login WHERE email=$1", [req.body.email], (error, result) =>{
        if (result.rowCount > 0){
            if (bcrypt.compareSync(req.body.password, result.rows[0].password)){
                req.session.login = result.rows[0].id;
                res.redirect('/')
            } else {
                res.render('login.hbs', {message: "Wrong password"})
            }
        } else {
            res.render('login.hbs', {message: "This email is not registered"})
        }
    })
})
app.post('/save', (req, res) =>{
    
})

app.listen(5000);
