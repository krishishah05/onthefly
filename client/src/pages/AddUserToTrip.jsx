import { useState } from 'react';
import { useParams } from 'react-router';
import './AddUserToTrip.css'

const AddUserToTrip = (props) => {
    const { trip_id } = useParams()
    const [username, setUsername] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        }

        await fetch(`${props.api_url}/api/users-trips/create/${trip_id}`, options)
        window.location.href = `/trip/get/${trip_id}`
    }

    return (
        <div className="AddUserToTrip">
            <center><h3>Add Traveler to Trip</h3></center>
            <form onSubmit={handleSubmit}>
                <label>GitHub Username</label><br />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                /><br />
                <br />
                <input type="submit" value="Add Traveler" />
            </form>
        </div>
    )
}

export default AddUserToTrip
