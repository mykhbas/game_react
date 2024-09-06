import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zoom } from '@mui/material';

import { useMain } from '../../contexts/MainContext';
import ScoreboardButton from '../../components/ScoreboardButton';
import ColorSpotGame from './core/ColorSpotGame';
import Timer from '../../components/Timer';
import useTimer from '../../hooks/useTimer';
import BackgroundMusic from '../../components/BackgroundMusic';
import { submitScore } from '../../api/appScore'
import { Score } from '@mui/icons-material';

interface IGameProps {
  onSubmitScores : (score : number) => void
  levels: number,
  stages : number
}

const Game: React.FC<IGameProps> = (props : IGameProps) => {
  const navigate = useNavigate()
  const { channel, user } = useMain()
  const { time, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const {levels, stages, onSubmitScores} = props;
  const [nub,setNub] = useState<number>(0)
  const [finalScore, setFinalScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [game, resetGame] = useState(new ColorSpotGame(levels, stages));
  const [dots, setDots] = useState<string[]>([]);
  const [correctDot, setCorrectDot] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [clickedStates, setClickedStates] = useState<boolean[]>(new Array(dots.length).fill(false));
  const [score, setScore] = useState<number>(0);
  const currentStage = useMemo(() => {
    return game.getCurrentStage();
  }, [game.getCurrentStage()]);

  const currentLevel = useMemo(() => {
    return game.getCurrentLevel();
  }, [game.getCurrentLevel()])

  const bgSong = useMemo(() => {
    if (gameFinished) {
      return 'https://youtu.be/uKFOv8resL8?si=TyRVIeWi3HV3WVtu';
    } else if (gameOver) {
      return 'https://youtu.be/atdnjOZhKII?si=vHdJfQw1vDxzg55Y';
    }
    return 'https://youtu.be/2DA_MeIw-w8?si=diQHcP6bFAQsHFd3';
  }, [gameOver, gameFinished])

  const submitScoreToServer = useCallback(async (score:number) => {
    try {
      await submitScore({
        appName: channel!,
        userName: user!,
        score
      })
    } catch (error) {
      console.error(error)
      alert("Error to submit score to server.")
    }
  },[user, channel])

  const handleNextStage = useCallback(async() => {

    if (game.nextStage()) {
      const { dots: newDotList, resultIdx: newResultIdx } = game.getGameNextLevel();
      setDots(newDotList);
      setCorrectDot(newResultIdx)
      resetTimer();
      startTimer();
      setClickedStates((prev)=>new Array(prev.length).fill(false));
      setScore(game.getScore(Math.floor((time % 60000) / 1000)));



    } else {
      setGameOver(true);
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      setGameFinished(true);
      stopTimer();
      onSubmitScores(score);
      setNub(0)
      setScore(0)
      setClickedStates((prev)=>new Array(prev.length).fill(false));
      submitScoreToServer(score)    }
  }, [game, time, setGameOver, submitScoreToServer, setGameFinished, stopTimer, onSubmitScores,nub]);

  const handleDotClick = useCallback(async (index: number) => {
    setClickedStates((prev) => {
      const newClickedStates = [...prev];
      newClickedStates[index] = true;
      return newClickedStates;
    });
  console.log('nub: ', nub + 1);
  console.log('index: ', index);
  console.log('correct: ', correctDot[index] );
  console.log('ans: ', correctDot );

  if (correctDot[index] === nub + 1 && (nub + 1 === correctDot.length || nub + 1 === Math.floor(correctDot.length / 2) + 1)) {
    setNub(0);
    handleNextStage();
  } else if (correctDot[index] === nub + 1) {
    setNub(nub + 1);
    console.log(correctDot[index]);
  } else {
    console.log('clickedStates before reset: ', clickedStates);
    setClickedStates((prev) => new Array(prev.length).fill(false));
    console.log('clickedStates after reset: ', clickedStates);

    setGameOver(true);
    const score = game.getScore(Math.floor((time % 60000) / 1000));
    setFinalScore(score);
    stopTimer();
    onSubmitScores(score);
    submitScoreToServer(score);
  }

  
}, [handleNextStage, dots, time, setGameOver, stopTimer, correctDot, submitScoreToServer, nub]);
  const restartGame = useCallback(() => {
    const newGame = new ColorSpotGame(levels, stages);
    const { dots: newDotList, resultIdx: newResultIdx } = newGame.getGameNextLevel();
    setDots(newDotList);
    setCorrectDot(newResultIdx)
    resetGame(newGame);
    setGameOver(false);
    setGameFinished(false);
    resetTimer();
    startTimer();
    setNub(0)
    setScore(0)

    setClickedStates(new Array(dots.length).fill(false));

  }, [resetGame, setDots, setCorrectDot, setGameOver, setGameFinished, startTimer, resetTimer, levels, stages])
  useEffect(() => {
  
    restartGame();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <BackgroundMusic songUrl={bgSong} />
      {gameOver || gameFinished ? (
        <div>
          <h2>{gameFinished ? 'Congratulation You have Completed All Levels' : `Game Over! You reached only stage ${currentStage} of level ${currentLevel}`}</h2>
          <h3>Score : {finalScore}</h3>
          <button onClick={restartGame}
            style={{
              backgroundColor:'#9aa090',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >Restart</button>
          <br />
          <br />
          <ScoreboardButton
            onScoreboardClick={() => {
              navigate('/score')
            }}
          />
        </div>
      ) : (
        <>
          <div style={{
      display: 'flex',
      alignItems: 'center', // จัดแนวแนวตั้งให้องค์ประกอบอยู่กลาง
      justifyContent: 'space-between', // จัดให้แต่ละส่วนกระจายออกจากกัน
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Timer time={time} />
        
      </div>
      <div style={{ textAlign: 'center' }}>
      <h2>Score: {score}</h2>
      </div>
      <div style={{ textAlign: 'right' }}>
        <h2>Level {currentLevel}</h2>
        <h2>Stage {currentStage}</h2>
      </div>
    </div>

  <div
  style={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(${Math.sqrt(dots.length)}, 80px)`, 
    gap: '10px', 
    justifyContent: 'center',
     width: '100%', // ทำให้กริดขยายเต็มความกว้างของ container
    height: '100%',
  }}
>
  {dots.map((color, index) => {
    // Define the threshold for hiding background and border
    let threshold = Math.floor(correctDot.length / 2) + 1;
    if (game.getCurrentLevel() > 5 ){
      threshold = threshold +game.getCurrentLevel()-2;
    }
    const isHidden = correctDot[index] > threshold;

    return ( //แก้
      <Zoom in={true} key={index}>
        <div
          onClick={() => handleDotClick(index)}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '10px',
            backgroundColor: isHidden || clickedStates[index]? 'transparent' : '#4e342e',
            cursor: 'pointer',
            border: isHidden || clickedStates[index] ? 'none' : '1px solid white',
            textAlign: 'center',
            fontSize: '24px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* {correctDot[index]  > Math.floor(correctDot.length / 2) + 1 ? <img src='../../assets/bomb.png' alt="bomb_image"></img> : (time > 2000 || (correctDot[index] > threshold || clickedStates[index]) ? '' : correctDot[index])} */}
          { time > 2000 || (correctDot[index] > threshold || clickedStates[index]) ?  "": (correctDot[index]  > Math.floor(correctDot.length / 2) + 1 ? <img src='src\assets\bomb.png' alt="bomb_image" width="50px"></img> : correctDot[index] )}


        </div>
      </Zoom>
    );
  })}
</div>

        </>
      )}
    </div>
  );
};

export default Game;
