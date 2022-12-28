const express = require('express');
require('./db/dbconnect')
const {userModal} = require('./db/Schema')
const bodyParser = require('body-parser');
const {router} = require('./routes/routes')
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors({origin:"*"}))

app.use('/user',router)


const port = process.env.PORT || 80;



app.listen(port,()=>{
    console.log(`port is listening on port no ${port}`);
})