const express = require('express');
const app = express();
const port = 3001;
const http = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/newReactProjChats',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//mongodb+srv://idanel:saribeni12@cluster0-cquxv.mongodb.net/newReactProjChats?retryWrites=true&w=majority



app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'idan chats',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
}));

const userRoute = require('./api/user.route');
app.use('/api/user', userRoute);


app.get('/', function (req, res) {
  res.send('Hello World')
});

http.listen(port, () => console.log(`Example app listening on port ${port}!`))