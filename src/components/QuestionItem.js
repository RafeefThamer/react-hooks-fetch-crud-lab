import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(id);
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleCorrectAnswerChange(event) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(event.target.value, 10),
    };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        onUpdate(updatedData);
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
