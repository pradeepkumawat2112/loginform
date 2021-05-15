const express = require('express')
const mysql = require('mysql')
const path = require('path')
const dotenv = require("dotenv");

dotenv.config({ path: ".env" })

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
})



// for static  files...  
// const publicDirectory = path.join(__dirname, "./public")
// app.use(express.static(publicDirectory))

app.use(express.static(path.join(__dirname,'public')))

//parser URL -encoded bodies as sent by html form
app.use(express.urlencoded({ extended: false}));
app.use(express.json());



//for template engine
app.set('view engine', 'hbs')
app.set("views",path.join(__dirname,"views"))

//connect to database..  
db.connect(mysql, (error) => {
    if (error) {
        console.log("ERROR--")
    } else {
        console.log("MYSQL-Connected...")
    }
})



//define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require('./routes/auth'));


 //server listing...
app.listen(8000, () => {
    console.log('server running')
})