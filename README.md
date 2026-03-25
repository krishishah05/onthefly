# ✈️ On the Fly

On the Fly is a trip planning web app that makes organizing group trips a breeze. Users can create trips, assign destinations, add activities, and track budgets — all in one place.

## Features

- View all active trips
- Create, view, update, and delete a trip
- Assign a cost, date, and description to a trip
- Choose from a list of available destinations to assign to a trip
- View all trips associated with a given destination
- View a trip's budget, description, date, and entertainment options

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (hosted on Render)
- **Other:** cors, dotenv, nodemon, pg

## Project Structure

```
onthefly/
└── server/
    ├── server.js                      # Express entry point
    ├── package.json
    ├── config/
    │   ├── database.js                # PostgreSQL connection pool
    │   ├── dotenv.js                  # Loads .env variables
    │   ├── reset.js                   # Creates and seeds all DB tables
    │   └── data/
    │       └── data.json              # Seed data for trips
    ├── controllers/
    │   ├── trips.js                   # CRUD for trips
    │   ├── activities.js              # CRUD for activities
    │   ├── destinations.js            # CRUD for destinations
    │   └── trips_destinations.js      # Join table logic
    └── routes/
        ├── trips.js
        ├── activities.js
        ├── destinations.js
        └── trips_destinations.js
```

## Database Schema

| Table | Key Columns |
|---|---|
| trips | id, title, description, img_url, num_days, start_date, end_date, total_cost |
| destinations | id, destination, description, city, country, img_url, flag_img_url |
| activities | id, trip_id (FK), activity, num_votes |
| trips_destinations | trip_id (FK), destination_id (FK) |
| users | id, githubid, username, avatarurl, accesstoken |
| trips_users | trip_id (FK), user_id (FK) |

## API Endpoints

### Trips — `/api/trips`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trips` | Get all trips |
| GET | `/api/trips/:id` | Get a single trip |
| POST | `/api/trips` | Create a new trip |
| PATCH | `/api/trips/:id` | Update a trip |
| DELETE | `/api/trips/:id` | Delete a trip |

### Activities — `/api/activities`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activities` | Get all activities |
| GET | `/api/activities/:trip_id` | Get activities for a trip |
| POST | `/api/activities/:trip_id` | Add an activity to a trip |
| PATCH | `/api/activities/:id` | Upvote an activity |
| DELETE | `/api/activities/:id` | Delete an activity |

### Destinations — `/api/destinations`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/:id` | Get a single destination |
| POST | `/api/destinations` | Create a destination |
| PATCH | `/api/destinations/:id` | Update a destination |
| DELETE | `/api/destinations/:id` | Delete a destination |

### Trips & Destinations — `/api/trips_destinations`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trips_destinations` | Get all trip-destination pairs |
| GET | `/api/trips_destinations/trips/:destination_id` | Get all trips for a destination |
| GET | `/api/trips_destinations/destinations/:trip_id` | Get all destinations for a trip |
| POST | `/api/trips_destinations` | Link a trip to a destination |

## Setup

### Prerequisites
- Node.js
- A [Render](https://render.com) PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/krishishah05/onthefly.git
   cd onthefly/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory:
   ```
   PGDATABASE=your_database_name
   PGHOST=your_host.oregon-postgres.render.com
   PGPASSWORD=your_password
   PGPORT=5432
   PGUSER=your_username
   ```

4. Start the server (automatically resets and seeds the database):
   ```bash
   npm start
   ```

The server runs on `http://localhost:3001` by default.
