var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pokemon = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    Hp:{
        type:String,
        required:true
    },
    Attack:{
        type:String,
        required:true
    },
    Defense:{
        type:String,
        required:true
    },
    Speed:{
        type:String,
        required:true
    },
    Sprite:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Pokemon', Pokemon);