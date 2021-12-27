const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const expresslayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000

//assets
app.use(express.static('public'));

app.use(expresslayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get('/',(req,res) =>{
    res.render('home')
});
app.get('/cart',(req,res) =>{
    res.render('customers/cart')
});
app.get('/login',(req,res) =>{
    res.render('auth/login')
});
app.get('/register',(req,res) =>{
    res.render('auth/register')
});

app.listen(PORT, () =>{
    console.log(`Listning on port ${PORT}`);
}); 