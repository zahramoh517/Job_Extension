//workplace to process incoming emails 

// load environment variables from  .env 
require('dotenv').config(); 

// import required modules 
const express =require('express'); // express.js framework for building APIs
const cors = require('cors'); // allows cross-origin requests (for Chrome extension communication)
const bodyParser = require('body-parser'); // helps process incoming JSON data

// create an express app will handle requests and responses 
const app = express(); 

app.use(cors()); // will allow the chrome extension to send requests to the backend 

app.use(bodyParser.json()); // automatically will process JSON data (emails sent from the extension)

const PORT = process.env.PORT || 3000; 

// test route 

app.get('/', (req, res) => {
    res.send('Backend is running...')
}); 

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // logs a message in the terminal when the server starts
});

app.post('/receive-emails', (req, res) => {
    const emailData = req.body; // get the list of emails sent from the Chrome extension

    if (!emailData || !Array.isArray(emailData)) {
        return res.status(400).json({ message: "Invalid email data format" });
    }

    console.log("Received email metadata:", emailData); // Log it for now
    res.json({ message: "Email metadata received successfully", data: emailData });
});
