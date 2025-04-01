import { useEffect, useState } from "react";

export default function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  // Load the Pokémon data from the local JSON file
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("/pokemon.json");
        if (!response.ok) {
          throw new Error("Failed to load Pokémon data");
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemonData();
  }, []);

  // Fetch additional details from the Pokémon API
  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      const data = await response.json();
      setPokemonDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Pokémon selection
  const handlePokemonSelect = (event) => {
    const pokemonName = event.target.value;
    const selectedData = pokemonData[pokemonName];
    setSelectedPokemon(selectedData);
    fetchPokemonDetails(pokemonName);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="pokemon-info">
      <h1>Pokémon Info</h1>
      {/* Dropdown for selecting a Pokémon */}
      <label htmlFor="pokemon-select">Choose a Pokémon:</label>
      <select
        id="pokemon-select"
        onChange={handlePokemonSelect}
        defaultValue=""
      >
        <option value="" disabled>
          Select a Pokémon
        </option>
        {Object.keys(pokemonData).map((name) => (
          <option key={name} value={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </option>
        ))}
      </select>

      {/* Display selected Pokémon's info */}
      {selectedPokemon && pokemonDetails ? (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name || "Details"}</h2>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Type: {selectedPokemon.type}</p>
          <p>Sleep Type: {selectedPokemon.sleepType}</p>
          <p>Specialty: {selectedPokemon.specialty}</p>
        </div>
      ) : (
        <p>Please select a Pokémon to see its details.</p>
      )}
    </div>
  );
}
