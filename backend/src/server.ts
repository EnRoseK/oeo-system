import app from './app';
import { envalid } from './libs';
import mongoose from 'mongoose';

const PORT = envalid.PORT;
const MONGO_URL = envalid.MONGO_DB;

mongoose.connect(MONGO_URL).then(() => {
	console.log(`MongoDB connected`);
	app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}`);
	});
});
