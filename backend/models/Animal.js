var mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
    name:String,
    male:Boolean,
    birthdate:Date,
    food:Number,
    pleasure:Number,
    soort:String,
    drink:Number,
    lastFoodUpdate:Date,
    lastPleasureUpdate:Date,
    lastDrinkUpdate:Date,
    alive:Boolean

});

mongoose.model('Animal', AnimalSchema);