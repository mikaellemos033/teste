const express = require('express')

module.exports = function(server) {

	const router  = express.Router()
	const service = require('../api/cars/carsService')

	// apply middleware
	server.use('/api', router)

	// map route with node-restful
	service.register(router, '/cars')
}