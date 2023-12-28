const express = require('express');
const tasks = require('./routes/tasks');
const app = express();

const connectDB = require('./db/connect')
require('dotenv').config();
const notfound = require('./middleware/notfound')

//middleware for parsing json
app.use(express.static('./public'))
app.use(express.json());


app.use('/api/v1/tasks' , tasks);
app.use(notfound)

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () =>  console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log('Errorrrrrr',error);        
    }
}

start()
