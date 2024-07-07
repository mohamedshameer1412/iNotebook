const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shameer:9dYw4NKwqk30NMSC@inotebook.1dq95lo.mongodb.net/'
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