const express = require("express");
const cors = require('cors');
const app = express();

//middleware
app.use( cors(), express.json(), express.urlencoded({ extended: true }) );

require('dotenv').config();
const port = process.env.PORT;


// DB connection
require("./config/mongoose.config")
    
//Routing 
require("./routes/routes")(app)

    
app.listen(port, () => console.log(`Listening on port: 👀👀👀 ${port}`) );