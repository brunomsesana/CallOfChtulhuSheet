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
        db.query('SELECT skills, characteristics, sheetid, img FROM sheets WHERE id=$1', [req.session.login], (error, result) =>{
            var sheetnames = [];
            var sheets = [];
            for (var i = 0; i < result.rowCount; i++){
                sheetnames[i] = result.rows[i].characteristics.split('=9-=9--')[0].split(':::')[1].split('/0-0/')[0]
                sheets[i] = [result.rows[i].characteristics, result.rows[i].skills, result.rows[i].sheetid, result.rows[i].img]
            }
            res.render('index.hbs', {sheets: sheets.flat(), sheetnames: sheetnames, sheetq: sheets.length})
        })
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
    if (req.body.sheetid == 'new'){
        db.query('SELECT id FROM sheets', (error, result) =>{
            db.query('INSERT INTO sheets(id, characteristics, skills, sheetid, img) VALUES($1, $2, $3, $4, $5)', [req.session.login, req.body.characteristics, req.body.skills, result.rowCount, req.body.img])
        })
    } else {
        db.query('UPDATE sheets SET characteristics=$1, skills=$2, img=$3 WHERE sheetid=$4', [req.body.characteristics, req.body.skills, req.body.img, req.body.sheetid])
    }
})
app.post('/erase', (req, res) =>{
    db.query('DELETE FROM sheets WHERE sheetid=$1', [req.body.sheetid])
})

app.listen(5000);
