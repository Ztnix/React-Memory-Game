import "./styles/ScoreBoard.css";

export default function ScoreBoard({ score, highScore }) {
  return (
    <div className="scoreBoardContainer">
      <div className="currentScore">Score: {score}</div>
      <div className="highScore">High Score: {highScore}</div>
    </div>
  );
}
