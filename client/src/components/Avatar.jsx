import './Avatar.css'

const Avatar = ({ user }) => {
    return (
        <div className="Avatar">
            <img src={user.avatarurl} alt={user.username} className="avatar-img" />
            <span className="avatar-username">{user.username}</span>
        </div>
    )
}

export default Avatar
