import "./Profile.css";

const Profile = ({ name, role, avatarUrl }) => (
  <div className="profile-card">
    <img src={avatarUrl} alt={name} className="profile-avatar" />
    <h3 className="profile-name">{name}</h3>
    <p className="profile-role">{role}</p>
  </div>
);

export default Profile;