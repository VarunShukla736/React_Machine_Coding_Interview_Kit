import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="container p-3">
      <h1 className="text-2xl font-bold">Main Page</h1>
      <h2 className="text-md text-gray-700 font-semibold">
        Welcome to the React Machine Coding Interview Kit!
      </h2>
      <div className="flex flex-col">
        <h2 className="text-lg font-medium my-2">
          Click the button below to view the Components
        </h2>
        <Link to="/todo" className="text-green-500 hover:underline">
          TODO
        </Link>
        <Link to="/accordian" className="text-green-500 hover:underline">
          Accordian
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
