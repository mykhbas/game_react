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

  const currentStage = useMemo(() => {
    return game.getCurrentStage();
  }, [game.getCurrentStage()]);

  const currentLevel = useMemo(() => {
    return game.getCurrentLevel();
  }, [game.getCurrentLevel()])

  const bgSong = useMemo(() => {
    if (gameFinished) {
      return 'https://www.youtube.com/watch?v=OCOeCrpRNGA';
    } else if (gameOver) {
      return 'https://www.youtube.com/watch?v=Hs7dYjkagxk';
    }
    return 'https://www.youtube.com/watch?v=BS5Q6cZMIM8';
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



    } else {
      setGameOver(true);
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      setGameFinished(true);
      stopTimer();
      onSubmitScores(score);
      setNub(0)
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
  console.log('correctDot: ', Math.floor(correctDot.length / 2) + 1);
  console.log('clickedStates: ', clickedStates);
  if (nub + 1 === correctDot.length || nub + 1 === Math.floor(correctDot.length / 2) + 1) {
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
    setClickedStates(new Array(dots.length).fill(false));

  }, [resetGame, setDots, setCorrectDot, setGameOver, setGameFinished, startTimer, resetTimer, levels, stages])
  useEffect(() => {
  
    restartGame();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <Timer time={time} />
      <BackgroundMusic songUrl={bgSong} />
      <h1>Level {currentLevel}</h1>
      {gameOver || gameFinished ? (
        <div>
          <h2>{gameFinished ? 'Congratulation You have Completed All Levels' : `Game Over! You reached only stage ${currentStage} of level ${currentLevel}`}</h2>
          <h3>Score : {finalScore}</h3>
          <button onClick={restartGame}>Restart</button>
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
          <h2>Stage {currentStage}</h2>
          <div
  style={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(${Math.sqrt(dots.length)}, 50px)`, 
    gap: '10px', 
    justifyContent: 'center' 
  }}
>
  {dots.map((color, index) => {
    // Define the threshold for hiding background and border
    const threshold = Math.floor(correctDot.length / 2) + 1;
    const isHidden = correctDot[index] > threshold;

    return (
      <Zoom in={true} key={index}>
        <div
          onClick={() => handleDotClick(index)}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: isHidden || clickedStates[index]? 'transparent' : color,
            cursor: 'pointer',
            border: isHidden || clickedStates[index] ? 'none' : '1px solid black',
            textAlign: 'center',
            fontSize: '24px',
            color: 'black',
          }}
        >
          {time>2000||(correctDot[index] > threshold|| clickedStates[index]) ?   '':correctDot[index]}
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
