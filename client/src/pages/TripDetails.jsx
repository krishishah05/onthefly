import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css'

const TripDetails = ({ data }) => {
    const { id } = useParams();
    const [activities, setActivities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/activities/' + id)
            const data = await response.json()
            setActivities(data)
        }

        const fetchDestinations = async () => {
            const response = await fetch('/api/trips_destinations/destinations/' + id)
            const data = await response.json()
            setDestinations(data)
        }

        fetchActivities()
        fetchDestinations()

        if (data && data.length > 0) {
            const current = data.find(t => t.id === parseInt(id))
            if (current) setTrip(current)
        }
    }, [data, id]);

    if (!trip) return <h3 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</h3>

    return (
        <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
            <h2 style={{ textAlign: 'center', color: 'white' }}>{trip.title}</h2>
            <div className="flex-container">
                <div>
                    <p><strong>Description:</strong> {trip.description}</p>
                    <p><strong>Budget:</strong> ${trip.total_cost}</p>
                    <p><strong>Start Date:</strong> {trip.start_date ? trip.start_date.slice(0, 10) : ''}</p>
                    <p><strong>End Date:</strong> {trip.end_date ? trip.end_date.slice(0, 10) : ''}</p>
                    <p><strong>Duration:</strong> {trip.num_days} days</p>
                    <h4>Destinations</h4>
                    {destinations && destinations.map(d =>
                        <DestinationBtn key={d.id} id={d.id} destination={d.destination} />
                    )}
                    <br />
                    <Link to={'/destination/new/' + id}>
                        <button className="addDestinationBtn">+ Add Destination</button>
                    </Link>
                </div>
                <div className="right-side" style={{ backgroundImage: trip.img_url ? `url(${trip.img_url})` : '' }}>
                    <h4>Entertainment Options</h4>
                    {activities && activities.map(a =>
                        <ActivityBtn key={a.id} id={a.id} activity={a.activity} num_votes={a.num_votes} />
                    )}
                    <br />
                    <Link to={'/activity/create/' + id}>
                        <button className="addActivityBtn">+ Add Activity</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TripDetails
