const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/inventory-management')
    .then(() => {
        console.log("Connected to MongoDB successfully");

        // Product routes
        app.use('/api/products', productRoutes);

        // Home route
        app.get('/', (req, res) => {
            res.send('Inventory Management System');
        });

        // Start server only after MongoDB connects
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch(err => {
        console.error("MongoDB connection failed:", err.message);
    });