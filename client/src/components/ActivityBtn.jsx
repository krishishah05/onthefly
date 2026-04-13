import { useState } from 'react';
import './ActivityBtn.css'

const ActivityBtn = (props) => {

  const [num_votes, setNumVotes] = useState(props.num_votes)

  const updateCount = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ num_votes: num_votes + 1 })
    }

    const url = props.api_url ? `${props.api_url}/api/activities/${props.id}` : `/api/activities/${props.id}`
    fetch(url, options)
    setNumVotes((num_votes) => num_votes + 1)
  }

  return (
    <button className='activityBtn' id={props.id} onClick={updateCount}>
      {props.activity} <br /> {'△ ' + num_votes + ' Upvotes'}
    </button>
  )
}

export default ActivityBtn;
