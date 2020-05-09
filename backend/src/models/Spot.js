const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

//192.168.0.26
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.0.26:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);