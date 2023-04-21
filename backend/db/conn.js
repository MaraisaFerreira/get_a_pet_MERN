const mongoose = require('mongoose');

const uri = process.env.DB_URI;

async function main() {
	await mongoose.connect(uri);
	console.log('Conectado ao MongoDB Atlas! DB getApet...');
}

main().catch((err) => console.log('Connection error: ', err));

module.exports = mongoose;
