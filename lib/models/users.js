const mongoose = require('mongoose');
import { Schema, model } from 'mongoose';
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},

	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 4,
	},
	admin: {
		type: Boolean,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
});

UserSchema.pre('save', async function () {
	// console.log(this.modifiedPaths());
	// console.log(this.isModified('name'));
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password);
	return isMatch;
};

// module.exports = mongoose.model('User', UserSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
