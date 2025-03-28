import React, { useEffect, useState } from "react";

const MoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setMoodHistory(storedHistory);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Mood History</h2>

      {moodHistory.length === 0 ? (
        <p>No mood records yet.</p>
      ) : (
        moodHistory.map((entry, index) => (
          <div key={index} className="border p-3 my-2 rounded">
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Mood:</strong> {entry.mood} - {entry.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MoodHistory;
