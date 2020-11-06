const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,       
        unique: true 
    }    

});


module.exports = mongoose.model('cities', citySchema);