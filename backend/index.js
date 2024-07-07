require('dotenv').config()
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors'); 
const { options } = require('./routes/auth');
const corsConfig = {
  options:"*",
  Credential:true,
  methods:["GET","POST","PUT","DELETE"],
};


const app = express()

app.options("",cors(corsConfig));
app.use(cors(corsConfig));
connectToMongo();

const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', async(req, res) => {
  res.send('Hello, Vercel!');
});
// Available Routes
app.use('/api/auth',  require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, async() => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
