import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MoodChart = () => {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setMoodHistory(storedHistory);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Mood Trend</h2>
      
      {moodHistory.length === 0 ? (
        <p>No mood records yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MoodChart;
