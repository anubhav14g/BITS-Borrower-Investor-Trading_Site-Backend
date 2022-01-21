const mongoose = require('mongoose');

exports.connect = () => {
    // connecting to mongo database
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if(err) {
            console.log('Some error occurred while connecting to database');
            console.log(err);
        } else {
            console.log('Successfully connected to database');
        }
    });
}