// Define Variables
const bodyParser = require('body-parser');
const express = require('express'); 
const cors = require('cors');
// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, running); 
function running(){
    console.log(`server running at port ${port}`);
};
// Callback function to complete GET '/all'
app.get('/all', (req,res) => {
    res.send(projectData)
}
);
// Post Route
app.post('/add', (req,res) => {
    projectData = req.body;
    res.send({message: "Request successfully posted"})
}
);