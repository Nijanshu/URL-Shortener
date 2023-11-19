require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser=require('body-parser');
const connectToMongo = require('./db');

app.use(bodyParser.urlencoded({ extended: false }));// express 11
app.use(bodyParser.json());
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shorturl', require('./routes/shorturl'));


// app.post('/api/shorturl', function(req, res) {
//   let urs=req.body.url
  
//   res.json({
//     original_url: urs,
//     dat: 'data'
//   });
// })



// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port,async() => {
  try{
    await connectToMongo();
  console.log(`iBlog listening at ${port}`);
}catch(e){
  console.log("error: ", e.message);}
});