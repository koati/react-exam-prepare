import React, {useState} from "react";

const Character = ({char}) => {
  
  const [showDetail, setShowDetail] = useState(false)

  return (
  <div className="card">
    <h2>Name: {char.name}</h2>
    <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? "Show less" : "Show more"}</button>
    {showDetail && <p>{char.details}</p>}
  </div>
)};

export default Character;