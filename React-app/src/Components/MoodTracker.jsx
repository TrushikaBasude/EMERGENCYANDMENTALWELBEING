import React, { useState, useEffect } from "react";
import "./MoodTracker.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MoodTracker = () => {
  const [mood, setMood] = useState(5);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setMoodHistory(storedHistory);
  }, []);

  const handleSaveMood = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood: mood,
      description: getMoodDescription(mood),
    };

    const updatedHistory = [newEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (index) => {
    const updatedHistory = moodHistory.filter((_, i) => i !== index);
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setMoodHistory([]);
    localStorage.setItem("moodHistory", JSON.stringify([]));
  };

  const getMoodDescription = (value) => {
    if (value <= 2) return "Very Sad 😭";
    if (value <= 4) return "Sad 😢";
    if (value <= 6) return "Neutral 😐";
    if (value <= 8) return "Happy 😊";
    return "Very Happy 😃";
  };

  const getMoodRecommendation = (value) => {
    if (value <= 2) return "It's okay to feel down. Talk to someone or take a break.";
    if (value <= 4) return "Try listening to music or going for a walk.";
    if (value <= 6) return "A neutral day! Stay mindful and balanced.";
    if (value <= 8) return "You're doing great! Keep up the positivity!";
    return "Amazing! Keep spreading your happiness!";
  };

  const processWeeklyData = () => {
    let weeklyData = {};
    moodHistory.forEach(entry => {
      weeklyData[entry.date] = (weeklyData[entry.date] || 0) + entry.mood;
    });
    return Object.entries(weeklyData).map(([date, mood]) => ({ date, mood }));
  };

  return (
    <div className="mood-card p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">How are you feeling today?</h2>
      
      <div className="mood-slider-container mb-4">
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="mood-slider w-full"
        />
        <p className="text-lg mt-2">{getMoodDescription(mood)}</p>
      </div>
      
      <div className="recommendation-container mt-4">
        <h3 className="text-lg font-semibold">Recommendation:</h3>
        <p className="text-sm text-gray-600">{getMoodRecommendation(mood)}</p>
      </div>

      <button onClick={handleSaveMood} className="save-btn bg-blue-500 text-white px-6 py-3 rounded mt-6">
        Save Mood
      </button>

      <div className="mood-history mt-4">
        <h3 className="text-lg font-semibold">Mood History</h3>
        {moodHistory.length === 0 ? (
          <p>No mood history yet.</p>
        ) : (
          <ul className="mood-history-list mt-2">
            {moodHistory.map((entry, index) => (
              <li key={index} className="mood-history-item mt-2 flex justify-between items-center">
                <p>{entry.date}: {entry.description}</p>
                <button 
                  onClick={() => handleDeleteHistory(index)} 
                  className="delete-btn text-red-500 text-sm ml-2">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {moodHistory.length > 0 && (
        <button 
          onClick={handleClearHistory} 
          className="clear-history-btn text-gray-500 mt-4">
          Clear All History
        </button>
      )}

      {/* New Report Button */}
      <button onClick={() => setShowReport(true)} className="report-btn">
        Show Weekly Report 📊
      </button>

      {/* Report Pop-up */}
      {showReport && (
        <div className="report-popup">
          <div className="report-content">
            <h2>Weekly Mood Report</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processWeeklyData()}>
                <XAxis dataKey="date" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Bar dataKey="mood" fill="#00c3ff" />
              </BarChart>
            </ResponsiveContainer>
            <button onClick={() => setShowReport(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
