import {CircularProgress} from '@material-ui/core'
import {useEffect, useState} from 'react'
import Question from '../../components/Question/Question'
import './Quiz.css'

// Move handleShuffle above its usage
const handleShuffle = options => options.sort(() => Math.random() - 0.5)

const Quiz = ({name, questions, score, setScore, setQuestions}) => {
  const [shuffledOptions, setShuffledOptions] = useState() // Renamed to avoid conflict
  const [currQues, setCurrQues] = useState(0)

  useEffect(() => {
    if (questions) {
      setShuffledOptions(
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ]),
      )
    }
  }, [currQues, questions])

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              {/* {questions[currQues].difficulty} */}
              Score: {score}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={shuffledOptions} // Updated to use the new variable
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{margin: 100}}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  )
}

export default Quiz
