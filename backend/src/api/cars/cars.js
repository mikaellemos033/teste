const restful  = require('node-restful')
const mongoose = restful.mongoose

const carsSchema = new mongoose.Schema({
	name: {type: String, required: true},
	model: {type: String, required: true},
	company: {type: String, required: true},
	color: {type: String, required: true},
	km: {type: Number, required: true},
	year: {type: Number, required: true},
	price: {type: Number, required: true},	
	createdAt: {type: Date, default: Date.now}
})

module.exports = restful.model('Cars', carsSchema)