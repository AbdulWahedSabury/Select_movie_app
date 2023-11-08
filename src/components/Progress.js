export default function Progress({questionNum, index, userAnswer,points, maxPoint}) {
  return <header className="progress">
        <progress max={questionNum}  value={index + Number(userAnswer + 1)}/>
        <p> <strong>{index + 1} </strong>/ {questionNum}</p>
        <p> <strong>{points} </strong>/ {maxPoint}</p>
  </header>;
}
