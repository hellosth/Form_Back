// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

const dotenv = require('dotenv');
const BusRoute = require('./schema');
const StopRoute=require('./stopSchema')

const cors = require('cors');
app.use(cors());

dotenv.config();
const uri = process.env.MONGO;
const port = process.env.PORT;
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

//FrontEnd Form
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

app.patch('/editdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid ID' });
        }

        // Find the document by ID and update it partially
        const updatedData = await BusRoute.findByIdAndUpdate(
            id,
            { $set: formData },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Data Updated successfully',
            data: updatedData,
        });
    } catch (error) {
        console.error('Error updating form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Delete data by ID
app.delete('/deletedata/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid ID' });
        }

        // Find the document by ID and delete it
        const deletedData = await BusRoute.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
            data: deletedData,
        });
    } catch (error) {
        console.error('Error deleting form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


//LatLong Add
app.post('/addstop', async (req, res) => {
    try {
        const formData = req.body;
        const busRoute = new StopRoute(formData);
        await busRoute.save();
        res.status(200).json({
            success: true,
            message: 'Added!!!!',
            data: busRoute,
        });
    } catch (error) {
        console.error('Error saving form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.patch('/editstop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid ID' });
        }

        // Find the document by ID and update it partially
        const updatedData = await StopRoute.findByIdAndUpdate(
            id,
            { $set: formData },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Data Updated successfully',
            data: updatedData,
        });
    } catch (error) {
        console.error('Error updating form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.delete('/deletestop/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid ID' });
        }

        // Find the document by ID and delete it
        const deletedData = await StopRoute.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
            data: deletedData,
        });
    } catch (error) {
        console.error('Error deleting form data:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.get('/allstops', async (req, res) => {
    try {
        const allData = await StopRoute.find();
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
