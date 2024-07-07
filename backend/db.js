const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI
console.log(mongoURI)

const connectToMongo = async () => {
    mongoose.connect(mongoURI);

    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}


module.exports = connectToMongo;