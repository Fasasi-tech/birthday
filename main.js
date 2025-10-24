const express = require('express');
const app = express();

const authRoutes = require('./routes/authRouter')
const userRoutes = require('./routes/UserRouter')
const birthdayRoutes = require('./routes/emailRouter')
const path = require('path');
const cookieParser = require('cookie-parser');


app.use(express.json({limit:'10mb'}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.send('birthday api')
})

app.use ('/api/v1/auth', authRoutes )
app.use ('/api/v1/users', userRoutes)
app.use('/api/v1/birthday-reminder', birthdayRoutes)
module.exports=app;