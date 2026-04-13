import './App.css';
import { useState, useEffect } from 'react';
import { Link, useRoutes } from 'react-router'
import ReadTrips from './pages/ReadTrips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import CreateDestination from './pages/CreateDestination';
import ReadDestinations from './pages/ReadDestinations'
import TripDetails from './pages/TripDetails'
import CreateActivity from './pages/CreateActivity';
import AddToTrip from './pages/AddToTrip';
import Login from './pages/Login';
import AddUserToTrip from './pages/AddUserToTrip';
import Avatar from './components/Avatar';

const API_URL = 'http://localhost:3001'

const App = () => {

  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login/success`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        if (data.success) setUser(data.user)
      }
    } catch (error) {
      setUser(null)
    }
  }

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, { credentials: 'include' })
    setUser(null)
    window.location.href = '/'
  }

  useEffect(() => {
    getUser()

    const fetchTrips = async () => {
      const response = await fetch(`${API_URL}/api/trips`)
      const data = await response.json()
      setTrips(data)
    }

    const fetchDestinations = async () => {
      const response = await fetch(`${API_URL}/api/destinations`)
      const data = await response.json()
      setDestinations(data)
    }

    fetchTrips()
    fetchDestinations()
  }, []);

  let element = useRoutes([
    {
      path: "/",
      element: user && user.id ? <ReadTrips data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/trip/new",
      element: user && user.id ? <CreateTrip user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/edit/:id",
      element: user && user.id ? <EditTrip data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/destinations",
      element: user && user.id ? <ReadDestinations data={destinations} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/trip/get/:id",
      element: user && user.id ? <TripDetails data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/destination/new/:trip_id",
      element: user && user.id ? <CreateDestination api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/activity/create/:trip_id",
      element: user && user.id ? <CreateActivity api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/destinations/add/:destination_id",
      element: user && user.id ? <AddToTrip data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: "/users/add/:trip_id",
      element: user && user.id ? <AddUserToTrip api_url={API_URL} /> : <Login api_url={API_URL} />
    }
  ]);

  return (
    <div className="App">
      {user && user.id && (
        <div className="header">
          <h1>On The Fly ✈️</h1>
          <Link to="/"><button className="headerBtn">Explore Trips</button></Link>
          <Link to="/destinations"><button className="headerBtn">Explore Destinations</button></Link>
          <Link to="/trip/new"><button className="headerBtn"> + Add Trip </button></Link>
          <Avatar user={user} />
          <button className="headerBtn" onClick={logout}>Logout</button>
        </div>
      )}
      {element}
    </div>
  );
}

export default App;
