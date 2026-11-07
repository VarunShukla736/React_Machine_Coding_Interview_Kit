import React, { useState, useEffect } from "react";

const lights = [
  { color: "green", duration: 3000 },
  { color: "yellow", duration: 500 },
  { color: "red", duration: 4000 },
];

function TrafficLight() {
  const [currentLight, setCurrentLight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLight((prev) => (prev + 1) % lights.length);
    }, lights[currentLight].duration);

    return () => clearTimeout(timer);
  }, [currentLight]);

  const activeColor = lights[currentLight].color;

  const getLightClass = (color) => {
    const base = "w-20 h-20 rounded-full transition-all duration-200";

    if (activeColor !== color) {
      return `${base} bg-gray-700 opacity-35`;
    }

    const activeStyles = {
      red: "bg-red-500 opacity-100 shadow-[0_0_25px_#ef4444]",
      yellow: "bg-yellow-400 opacity-100 shadow-[0_0_25px_#facc15]",
      green: "bg-green-500 opacity-100 shadow-[0_0_25px_#22c55e]",
    };

    return `${base} ${activeStyles[color]}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gray-100">
      {/* Accessible status */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-xl font-bold capitalize text-gray-800"
      >
        Current light: {activeColor}
      </div>

      {/* Traffic light */}
      <div
        aria-hidden="true"
        className="flex flex-col gap-4 rounded-3xl bg-gray-900 p-5 shadow-xl"
      >
        <div className={getLightClass("red")} />

        <div className={getLightClass("yellow")} />

        <div className={getLightClass("green")} />
      </div>
    </div>
  );
}

export default TrafficLight;
