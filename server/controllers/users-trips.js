import { pool } from '../config/database.js'

const createTripUser = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const { username } = req.body

        const userResults = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        const user = userResults.rows[0]

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const results = await pool.query(
            'INSERT INTO trips_users (trip_id, user_id) VALUES ($1, $2) RETURNING *',
            [trip_id, user.id]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getTripUsers = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const results = await pool.query(
            `SELECT users.id, users.username, users.avatarurl
             FROM users
             INNER JOIN trips_users ON users.id = trips_users.user_id
             WHERE trips_users.trip_id = $1`,
            [trip_id]
        )
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getUserTrips = async (req, res) => {
    try {
        const { username } = req.params
        const userResults = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        const user = userResults.rows[0]

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const results = await pool.query(
            `SELECT trips.*
             FROM trips
             INNER JOIN trips_users ON trips.id = trips_users.trip_id
             WHERE trips_users.user_id = $1`,
            [user.id]
        )
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default { createTripUser, getTripUsers, getUserTrips }
