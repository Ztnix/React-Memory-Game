import "./styles/CardGrid.css";

export default function CardGrid({ pokeList, onScore, onShuffle }) {
  return (
    <div className="gridContainer">
      {pokeList.map((pokemon) => (
        <button
          className="gridItem"
          key={pokemon.id}
          onClick={() => {
            onScore(pokemon);
            onShuffle();
          }}
        >
          <div className="pokeName">{pokemon.name.toUpperCase()}</div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
        </button>
      ))}
    </div>
  );
}
