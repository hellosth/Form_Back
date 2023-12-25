// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const port = 5000;
const dotenv = require('dotenv');
const BusRoute = require('./schema');
const cors = require('cors');
app.use(cors());

dotenv.config();
const uri = process.env.MONGO;

// Connect to MongoDB
const mongoConnect = async () => {
    console.log("first");
    try {
        const res = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10 seconds
        });
        // console.log(res);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

app.use(bodyParser.json());

// Verify the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/adddata', async (req, res) => {
    try {
        const formData = req.body;
        const busRoute = new BusRoute(formData);
        await busRoute.save();
        res.status(200).json({
            success: true,
            message: 'Thank you for your help 🤗. Consider adding more data and sharing this form.',
            data: busRoute,
        });
    } catch (error) {
        console.error('Error saving form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        if (req.body.email === "hellllllo123abcd@gmail.com" && req.body.password === "moc.liamg@dcba321ollllleh") {
            res.status(200).json({
                success: true,
                message: 'Aaija Munte.',
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Ja Vag.',
            });
        }
    } catch (error) {
        console.error('Error saving form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.get('/alldata', async (req, res) => {
    try {
        const allData = await BusRoute.find();
        res.status(200).json({
            success: true,
            message: 'All data retrieved successfully',
            data: allData,
        });
    } catch (error) {
        console.error('Error retrieving all data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    mongoConnect();

});