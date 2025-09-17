import React, { useState } from 'react';
// Import all data
import { phq9Questions, gad7Questions, phq9ScoringGuide, gad7ScoringGuide } from '../data/phq9data';
import './PHQ9Form.css';

function PHQ9Form({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [phq9Score, setPhq9Score] = useState(null);
  const [gad7Score, setGad7Score] = useState(null);
  const [phq9Risk, setPhq9Risk] = useState(null);
  const [gad7Risk, setGad7Risk] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const allQuestions = [...phq9Questions, ...gad7Questions];

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: parseInt(value)
    });
  };

  const calculateResults = () => {
    let phq9Sum = 0;
    let gad7Sum = 0;

    phq9Questions.forEach((_, index) => {
      phq9Sum += answers[index] || 0;
    });

    gad7Questions.forEach((_, index) => {
      gad7Sum += answers[phq9Questions.length + index] || 0;
    });

    setPhq9Score(phq9Sum);
    setGad7Score(gad7Sum);

    const phq9Level = phq9ScoringGuide.find(guide => phq9Sum >= guide.min && phq9Sum <= guide.max);
    setPhq9Risk(phq9Level ? phq9Level.label : 'No data');

    const gad7Level = gad7ScoringGuide.find(guide => gad7Sum >= guide.min && gad7Sum <= guide.max);
    setGad7Risk(gad7Level ? gad7Level.label : 'No data');

    setShowResult(true);
    if (onComplete) {
      onComplete({ phq9Score: phq9Sum, gad7Score: gad7Sum, phq9Risk: phq9Level.label, gad7Risk: gad7Level.label });
    }
  };

  const isFormValid = allQuestions.every((_, index) => answers.hasOwnProperty(index));

  return (
    <div className="phq9-container">
      {!showResult ? (
        <div className="phq9-form-section">
          <h2 className="phq9-title">Mental Health Assessment</h2>
          <p className="phq9-intro">Over the last two weeks, how often have you been bothered by any of the following problems?</p>

          {/* PHQ-9 Questions */}
          <h3 className="section-heading">Depression & Mood (PHQ-9)</h3>
          {phq9Questions.map((question, index) => (
            <div key={index} className="question-block">
              <p className="question-text">{`${index + 1}. ${question}`}</p>
              <div className="options-container">
                <label className="option-label">
                  <input type="radio" name={`q${index}`} value="0" onChange={() => handleAnswerChange(index, 0)} required />
                  Not at all
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${index}`} value="1" onChange={() => handleAnswerChange(index, 1)} />
                  Several days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${index}`} value="2" onChange={() => handleAnswerChange(index, 2)} />
                  More than half the days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${index}`} value="3" onChange={() => handleAnswerChange(index, 3)} />
                  Nearly every day
                </label>
              </div>
            </div>
          ))}

          {/* GAD-7 Questions */}
          <h3 className="section-heading">Anxiety & Worry (GAD-7)</h3>
          {gad7Questions.map((question, index) => (
            <div key={phq9Questions.length + index} className="question-block">
              <p className="question-text">{`${index + 1}. ${question}`}</p>
              <div className="options-container">
                <label className="option-label">
                  <input type="radio" name={`q${phq9Questions.length + index}`} value="0" onChange={() => handleAnswerChange(phq9Questions.length + index, 0)} required />
                  Not at all
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${phq9Questions.length + index}`} value="1" onChange={() => handleAnswerChange(phq9Questions.length + index, 1)} />
                  Several days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${phq9Questions.length + index}`} value="2" onChange={() => handleAnswerChange(phq9Questions.length + index, 2)} />
                  More than half the days
                </label>
                <label className="option-label">
                  <input type="radio" name={`q${phq9Questions.length + index}`} value="3" onChange={() => handleAnswerChange(phq9Questions.length + index, 3)} />
                  Nearly every day
                </label>
              </div>
            </div>
          ))}

          <button onClick={calculateResults} disabled={!isFormValid} className="phq9-submit-btn">
            Submit
          </button>
        </div>
      ) : (
        <div className="phq9-result-section">
          <h2 className="phq9-title">Your Results</h2>
          <div className="result-block">
            <h4 className="result-heading">Depression Score: <strong>{phq9Score}</strong></h4>
            <p className="result-level">Risk Level: <strong className={`level-${phq9Risk.replace(/\s/g, '-').toLowerCase()}`}>{phq9Risk}</strong></p>
          </div>
          <div className="result-block">
            <h4 className="result-heading">Anxiety Score: <strong>{gad7Score}</strong></h4>
            <p className="result-level">Risk Level: <strong className={`level-${gad7Risk.replace(/\s/g, '-').toLowerCase()}`}>{gad7Risk}</strong></p>
          </div>
          <p className="result-disclaimer">This is a screening tool, not a diagnosis. Please consult a counselor for a professional assessment.</p>
        </div>
      )}
    </div>
  );
}

export default PHQ9Form;