import "./styles/EndCard.css";

export default function EndCard({ onReset, goodEnding }) {
  return (
    <div className="endScreen">
      {!goodEnding ? (
        <div className="endMessage">¡You Lost!</div>
      ) : (
        <div className="endMessage">¡You Won!</div>
      )}

      <div className="buttonContainer">
        <button
          className="newGame"
          onClick={() => {
            onReset();
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
