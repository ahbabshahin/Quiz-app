import mongoose from 'mongoose';
const connectDB = require('./connect');
const MONGODB_URI = process.env.MONGO_URI;

const connect = async () => {
	const connectionState = mongoose.connection.readyState;

	if (connectionState == 1) {
		console.log('Already Connected');
		return;
	} else if (connectionState == 2) {
		console.log('Connecting....');
		return;
	}

	try {
		mongoose.connect(MONGODB_URI, {
			dbName: 'next',
			bufferCommands: false,
		});
		console.log('connected');
	} catch (err) {
		console.log('error in connection to db', err);
		throw new Error('error in connection to db', err);
	}
};

export default connect;
