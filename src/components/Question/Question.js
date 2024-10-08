import {Button} from '@material-ui/core'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import QRCode from 'qrcode' // Importing the qrcode library
import './Question.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  participantName, // Add participantName prop
  setParticipants, // Add setParticipants prop
  participants, // Add participants prop
}) => {
  const [selected, setSelected] = useState()
  const [error, setError] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('') // State to store QR code URL
  const history = useHistory()
  const [newParticipantName, setNewParticipantName] = useState('') // State for new participant name input

  const handleSelect = i => {
    if (selected === i && selected === correct) return 'select'
    if (selected === i && selected !== correct) return 'wrong'
    if (i === correct) return 'select'
    return '' // Ensure a return value in all cases
  }

  const handleCheck = i => {
    setSelected(i)
    if (i === correct) setScore(score + 1)
    setError(false)
  }

  const handleNext = () => {
    if (currQues > 8) {
      history.push('/result')
      return // Early return if navigating to results
    }
    if (selected) {
      setCurrQues(currQues + 1)
      setSelected()
    } else {
      setError('Please select an option first')
    }
  }

  const handleQuit = () => {
    setCurrQues(0)
    setQuestions()
  }

  // Effect to generate QR code URL when the question changes
  useEffect(() => {
    const questionText = `Question ${currQues + 1}: ${
      questions[currQues].question
    }`
    const joinUrl = `https://afreedtesting.ccbp.tech/quiz/join?name=${encodeURIComponent(
      participantName,
    )}`
    // Update with your app URL
    QRCode.toDataURL(joinUrl)
      .then(url => {
        setQrCodeUrl(url) // Set the generated QR code URL
      })
      .catch(err => {
        console.error(err)
      })
  }, [currQues, questions, participantName])

  const handleJoin = () => {
    if (newParticipantName.trim()) {
      setParticipants(prev => [...prev, newParticipantName]) // Store the new participant name
      setNewParticipantName('') // Clear the input field
    }
  }

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>

        {/* Display the QR code image */}
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{width: '128px', height: '128px'}}
          />
        )}

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map(i => (
              <button
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{width: 185}}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{width: 185}}
            onClick={handleNext}
          >
            {currQues > 20 ? 'Submit' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Question
