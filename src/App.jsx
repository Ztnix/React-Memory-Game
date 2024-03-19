import { useState } from "react";
import { useEffect } from "react";
import "./styles/App.css";
import ScoreBoard from "./ScoreBoard";
import CardGrid from "./CardGrid";
import EndCard from "./EndCard";

export default function App() {
  const [pokeList, setPokeList] = useState([]);
  const [idList, setIdList] = useState(createRandomArray());
  const [loading, setLoading] = useState();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [endCard, setEndCard] = useState(false);
  const [goodEnding, setGoodEnding] = useState(false);

  function createRandomArray(size = 5) {
    let arr = [];
    while (arr.length < size) {
      let x = Math.floor(Math.random() * 600) + 1;
      if (arr.indexOf(x) === -1) arr.push(x);
    }
    return arr;
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const promises = idList.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
      });

      const fetchedData = await Promise.all(promises);
      setPokeList(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [idList]);

  const gameReset = () => {
    setIdList(createRandomArray());
    setEndCard(false);
    setScore(0);
    setLoading(true);
    setGoodEnding(false);
  };

  const shuffle = () => {
    setPokeList(pokeList.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (pokemon) => {
    if (clicked.includes(pokemon.id)) {
      setEndCard(true);
      setScore(0);
    } else if (score + 1 === 5) {
      setGoodEnding(true);
      setEndCard(true);
      setHighScore(0);
    } else {
      setClicked([...clicked, pokemon.id]);
      setScore(score + 1);
      console.log(score + 1);
      if (score + 1 > highScore) {
        setHighScore(highScore + 1);
      }
    }
  };

  return (
    <div className="app">
      <div className="bottomPage">
        {!loading ? (
          !endCard ? (
            <div className="gameScreen">
              <div className="topPage">
                <ScoreBoard score={score} highScore={highScore}></ScoreBoard>
              </div>
              <div className="bottomPage">
                <CardGrid
                  pokeList={pokeList}
                  onScore={handleCardClick}
                  onShuffle={shuffle}
                ></CardGrid>
              </div>
            </div>
          ) : (
            <EndCard onReset={gameReset} goodEnding={goodEnding}></EndCard>
          )
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
