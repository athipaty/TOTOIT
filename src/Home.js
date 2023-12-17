import { useState } from 'react';

const Home = () => {
  const [members, setMembers] = useState([
    { name: "Athipat", position: "leader" },
    { name: "Anuchit", position: "supervisor" },
    { name: "Amornrat", position: "supervisor" },
  ]);

  return (
    <div className="home">
      {members.map((member) => (
        <div key={member.name}>
          <div>{member.name}</div>
          <div>{member.position}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
