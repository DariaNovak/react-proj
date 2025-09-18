
import Profile from "./components/Profile";

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Fullstack Developer",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Project Manager",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "UI/UX Designer",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "Daniel Brown",
    role: "Data Analyst",
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "Olivia Martinez",
    role: "QA Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    id: 6,
    name: "James Taylor",
    role: "Mobile Developer",
    avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    id: 7,
    name: "Emma Davis",
    role: "Cloud Architect",
    avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg"
  }
];

const App = () => (
  <div className="app">
    {users.map(({ id, name, role, avatarUrl }) => (
      <Profile key={id} name={name} role={role} avatarUrl={avatarUrl} />
    ))}
  </div>
);

export default App;

