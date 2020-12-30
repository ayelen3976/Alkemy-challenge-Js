const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./config/database')

//test db

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



const app = express();



app.use(express.urlencoded({ extended:false }));
app.use(cors());
app.use(express.json());


app.use('/balance', require('./routes/balance'));
const PORT =process.env.PORT||4000;
app.listen (PORT , console.log(`listening in ${PORT}`))

