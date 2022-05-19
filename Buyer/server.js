const express = require('express');
const mongoose = require('mongoose');
 //const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
// const passport = require('passport');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb Connection Success!');
});

const CartRoutes = require('./routes/cartRoute');
app.use('/cart',CartRoutes);

const ItemRoutes = require('./routes/itemRoute');
app.use('/item', ItemRoutes );

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});

//routes
// const PostRoutes = require('./routes/posts');
//
// app.use('/post',PostRoutes);






