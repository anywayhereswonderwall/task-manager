import React, { useState } from "react";
import x from "../assets/icons/x.svg";
import bars from "../assets/icons/bars.svg";
const Home = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <button onClick={() => setSidebar(!sidebar)} className="sidebar-toggle">
        {sidebar ? (
          <img src={x} alt="x icon" />
        ) : (
          <img src={bars} alt="bars icon" />
        )}
      </button>
      <h1 className="heading">Hello, Jon</h1>
    </>
  );
};

export default Home;
