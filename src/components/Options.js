export default function Options({ question, userAnswer, dispatch }) {
    const hasAnswer = userAnswer !== null ;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswer}
          className={`btn btn-option ${index === userAnswer ? "answer" : ""}
         ${
           hasAnswer
             ? index === question.correctOption
               ? "correct"
               : "wrong"
             : ""
         }
         `}
          onClick={(e) => dispatch({ type: "answered", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
