import express from 'express'
import usersTripController from '../controllers/users-trips.js'
const router = express.Router()

router.post('/create/:trip_id', usersTripController.createTripUser)
router.get('/users/:trip_id', usersTripController.getTripUsers)
router.get('/trips/:username', usersTripController.getUserTrips)

export default router
