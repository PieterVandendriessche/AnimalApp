var mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
		unique: true },
	hash: String,
  salt: String, //Voor voorkomen rainbox attacks
  animals: [{type: mongoose.Schema.Types.ObjectId,ref: 'Animal'}],
  money: Number,
  food:Number,
  drink:Number,
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex');
}
UserSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.returnJSONProfile = function(){
 
    return {
        username: this.username,
        money: this.money,
        food: this.food,
        drink: this.drink

    }

}
UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id, //Voor token en verificatie belangrijk
        username: this.username,
        exp: parseInt(exp.getTime() / 1000) //Expire van een token
    }, process.env.ANIMAL_BACKEND_SECRET);
  };

mongoose.model('User', UserSchema);