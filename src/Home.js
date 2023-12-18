import { useState } from 'react';

const Home = () => {
  const [members, setMembers] = useState([
    { name: "Athipat", position: "leader" },
    { name: "Anuchit", position: "supervisor" },
    { name: "Phakjiran", position: "leader" },
    { name: "Suwanna", position: "staff" },
    { name: "Sumeena", position: "staff" },
    { name: "jariya", position: "staff" },
  ]);

  return (
    <div className="home">
      {members.map((member) => (
        <div key={member.name}>
          <div>{member.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
