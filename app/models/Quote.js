var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
                    //author : {type: String, default: ''},
                    quote : {type: String, default: ''}
});

quoteSchema.set('collection', 'quotes');

module.exports = mongoose.model('Quote', quoteSchema);