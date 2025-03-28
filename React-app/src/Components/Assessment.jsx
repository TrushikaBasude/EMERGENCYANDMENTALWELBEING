import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/Assessment.css";

const QUESTIONS_PER_PAGE = 3; // Number of questions per page

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/assessment/questions")
      .then((response) => {
        setQuestions(response.data);
        setResponses(new Array(response.data.length).fill(0));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = Number(value);
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if ((currentPage + 1) * QUESTIONS_PER_PAGE < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/assessment/submit", responses, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const { result, recommendation, score } = response.data;
        alert(
          `Result: ${result}\nRecommendation: ${recommendation}\nScore: ${score}`
        );
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
        alert("Error submitting assessment. Please try again.");
      });
  };

  if (loading) return <div className="loading">Loading questions...</div>;

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const visibleQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="assessment-container">
      <h1 className="title">🧠 Mental Health Assessment</h1>
      
      {visibleQuestions.map((q, index) => (
        <div key={startIndex + index} className="question-card">
          <p className="question-text">{q.question}</p>
          <input
            type="number"
            min="0"
            max="5"
            value={responses[startIndex + index]}
            onChange={(e) => handleResponseChange(startIndex + index, e.target.value)}
            className="input-box"
          />
        </div>
      ))}

      <div className="button-container">
        {currentPage > 0 && (
          <button className="nav-btn prev-btn" onClick={handlePrev}>
            ⬅️ Previous
          </button>
        )}
        {endIndex < questions.length ? (
          <button className="nav-btn next-btn" onClick={handleNext}>
            Next ➡️
          </button>
        ) : (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit 🚀
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
