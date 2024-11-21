require("dotenv").config()
const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const expressLsyout = require('express-ejs-layouts');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS Views
app.use(expressLsyout);
app.set('layout', "./layouts/main");
app.set('view engine', 'ejs');

// All Routes
app.use('/hewan', require('./server/routes/hewan.js'));

// HomePage
app.get('/', (req, res) => {
    res.render('home', { title: "HomePage"})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});