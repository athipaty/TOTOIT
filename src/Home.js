import { useState } from 'react';

const Home = () => {
  const [members, setMembers] = useState([
    { name: "Athipat", position: "leader" },
    { name: "Anuchit", position: "supervisor" },
    { name: "Phakjiran", position: "leader" },
    { name: "Suwanna", position: "staff" },
    { name: "Sumeena", position: "staff" },
  ]);
  const result = members.filter((item) => item.name.includes("a"))
  console.log(result)

  return (
    <div className="home">
      <div className="home_head">
        <h2>Your faverite</h2>
      </div>
      <div className="home_details">
        <div>Movie#1</div>
        <div>Movie#2</div>
        <div>Movie#3</div>
        <div>Movie#4</div>
      </div>
    </div>
  );
};

export default Home;
