//mongoDB
require('./../Skin Sense Backend/config/db.js')

const app = require ('express')();
const port = process.env.PORT || 3000;

const UserRouter = require('./../Skin Sense Backend/api/User')

//for accepting post from data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})