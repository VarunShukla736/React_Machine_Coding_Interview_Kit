import React, { useState } from "react";
import { accordiandata } from "../data/allData";

const Accordian = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="container p-3">
      <h1 className="text-2xl font-bold">Accordian Component</h1>
      {accordiandata.map((item) => (
        <div key={item.id}>
          <h3
            className="text-lg font-medium my-2 P-1 cursor-pointer"
            onClick={() =>
              setActiveIndex(activeIndex === item.id ? null : item.id)
            }
          >
            {item.title}
            {activeIndex === item.id ? " 🔻" : " 🔺"}
          </h3>
          {activeIndex === item.id && <p>{item.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default Accordian;
