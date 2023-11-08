import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { useReducer } from "react";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedSecren";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        userAnswer: null,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "answered":
      const question = state.questions.at(state.index);
      return {
        ...state,
        userAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? question.points + state.points
            : 0,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        hightestScore:
          state.hightestScore > state.points
            ? state.hightestScore
            : state.points,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("something is wrong try again later.");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  userAnswer: null,
  points: 0,
  hightestScore: 0,
};

export default function App() {
  const [
    { questions, status, index, userAnswer, points, hightestScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPoint = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(hightestScore);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartPage numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionNum={numOfQuestions}
              index={index}
              userAnswer={userAnswer}
              points={points}
              maxPoint={maxPoint}
            />
            <Question
              question={questions[index]}
              userAnswer={userAnswer}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={userAnswer}
              index={index}
              numOfQuestions={numOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={points}
            highscore={hightestScore}
            maxPossiblePoints={maxPoint}
          />
        )}
      </Main>
    </div>
  );
}
