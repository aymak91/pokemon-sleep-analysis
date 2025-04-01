import React, { useEffect, useState } from "react";

const natures = [
  { name: "Lonely", speed: 0.1, energy: -0.12 },
  { name: "Adamant", speed: 0.1, ingredient: -0.2 },
  { name: "Naughty", speed: 0.1, skill: -0.2 },
  { name: "Brave", speed: 0.1, exp: -0.18 },
  { name: "Bold", energy: .2, speed: -0.1 },
  { name: "Impish", energy: 0.2, ingredient: -0.2 },
  { name: "Lax", energy: 0.2, skill: -0.2 },
  { name: "Relaxed", energy: 0.2, exp: -0.18 },
  { name: "Modest", ingredient: 0.2, speed: -0.1 },
  { name: "Mild", ingredient: 0.2, energy: -0.12 },
  { name: "Rash", ingredient: 0.2, skill: -0.2 },
  { name: "Quiet", ingredient: 0.2, exp: -0.18 },
  { name: "Calm", skill: 0.2, speed: -0.1 },
  { name: "Gentle", skill: 0.2, energy: -0.12 },
  { name: "Careful", skill: 0.2, ingredient: -0.2 },
  { name: "Sassy", skill: 0.2, exp: -0.18 },
  { name: "Timid", exp: 0.18, speed: -0.1 },
  { name: "Hasty", exp: 0.18, energy: -0.12 },
  { name: "Jolly", exp: 0.18, ingredient: -0.2 },
  { name: "Naive", exp: 0.18, skill: -0.2 },
  { name: "Bashful" },
  { name: "Hardy" },
  { name: "Docile" },
  { name: "Quirky" },
  { name: "Serious" }
];


const subskills = [
  {
    name: "Berry Finding S",
    benefits: { berries: 1, ingredients: 0, skills: 0 },
    description: {
      berries: "Adds 1 additional berry each time the Pokemon finds a berry. Berry Finding S is essential for any berries specialist.",
      ingredients: "Adds 1 additional berry each time the Pokemon finds a berry. Not essential for ingredients specialists, but it is a nice bonus if this Pokemon already has Ingredient Finding boost(s). Be sure to clear the inventory to ensure this Pokemon can continue to find ingredients.",
      skills: "Adds 1 additional berry each time the Pokemon finds a berry.",
    },
  },
  {
    name: "Dream Shard Bonus",
    benefits: { berries: 0, ingredients: 0, skills: 0 },
    description: {
      berries: "No impact on berry specialists.",
      ingredients: "No impact on ingredients specialists.",
      skills: "No impact on skills specialists.",
    },
  },
  {
    name: "Energy Recovery Bonus",
    benefits: { berries: 0, ingredients: 0, skills: 0 },
    description: {
      berries: "No impact on berry specialists.",
      ingredients: "No impact on ingredients specialists.",
      skills: "No impact on skills specialists.",
    },
  },
  {
    name: "Helping Bonus",
    benefits: { berries: 1, ingredients: 1, skills: 1 },
    description: {
      berries: "Increases the effectiveness of all helpers.",
      ingredients: "Increases the effectiveness of all helpers.",
      skills: "Increases the effectiveness of all helpers.",
    },
  },
  {
    name: "Helping Speed M",
    benefits: { berries: 1, ingredients: 1, skills: 1 },
    description: {
      berries: "Speeds up helpers, improving their contribution.",
      ingredients: "Speeds up helpers, improving their contribution.",
      skills: "Speeds up helpers, improving their contribution.",
    },
  },
  {
    name: "Helping Speed S",
    benefits: { berries: 1, ingredients: 1, skills: 1 },
    description: {
      berries: "Speeds up helpers, improving their contribution.",
      ingredients: "Speeds up helpers, improving their contribution.",
      skills: "Speeds up helpers, improving their contribution.",
    },
  },
  {
    name: "Ingredient Finder M",
    benefits: { berries: -1, ingredients: 1, skills: 0 },
    description: {
      berries: "Reduces efficiency for berry specialists.",
      ingredients: "Boosts the likelihood of this Pokémon finding ingredients by 36%.	Ingredient boosts are essential for ingredient specialists to generate as many ingredients as possible.",
      skills: "No impact on skills specialists.",
    },
  },
  {
    name: "Ingredient Finder S",
    benefits: { berries: -1, ingredients: 1, skills: 0 },
    description: {
      berries: "Reduces efficiency for berry specialists.",
      ingredients: "Boosts ingredient finding efficiency for ingredients specialists.",
      skills: "No impact on skills specialists. This can be considered a skill ",
    },
  },
  {
    name: "Skill Trigger M",
    benefits: { berries: 0, ingredient: 0, skills: 1 },
    description: {
      berries: "No impact on berry specialists.",
      ingredients: "No significant impact on ingredients specialists. This can be considered a nice bonus if other skills are good.",
      skills: "Boosts skill trigger rates for skills specialists.",
    },
  },
  {
  name: "Skill Trigger S",
  benefits: { berries: 0, ingredient: 0, skills: 1 },
  description: {
      berries: "No impact on berry specialists.",
      ingredients: "No significant impact on ingredients specialists. This can be considered a nice bonus if other skills are good.",
      skills: "Boosts skill trigger rates for skills specialists.",
    },
  },
  {
  name: "Inventory Up L",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Inventory Up M",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Inventory Up S",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Research EXP Bonus",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Skill Level Up M",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Skill Level Up S",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
  {
  name: "Sleep EXP Bonus",
  benefits: { berries: -2, ingredient: -2, skills: -2 },
  description: {
      berries: "",
      ingredients: "",
      skills: "",
    },
  },
];

export default function Home() {
  const [pokemonData, setPokemonData] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedSubskills, setSelectedSubskills] = useState({
    lv10: "",
    lv25: "",
    lv50: "",
    lv75: "",
    lv100: "",
  });
  const [specialty, setSpecialty] = useState("Berry");
  const [nature, setNature] = useState("Bashful")

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("/pokemon.json");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPokemonData();
  }, []);

  const handlePokemonSelect = async (event) => {
    const pokemonName = event.target.value;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const selected = pokemonData[pokemonName];
      setSelectedPokemon({
        name: data.name,
        sprites: data.sprites.front_default,
        specialty: selected?.specialty || "Berry",
        type: selected?.type,
        sleepType: selected?.sleepType,
      });
      setSpecialty(selected?.specialty || "Berry");
    } catch (err) {
      console.error("Error fetching Pokémon details:", err.message);
    }
  };

  const getBenefit = (subskillName) => {
    const subskill = subskills.find((skill) => skill.name === subskillName);
    return subskill?.benefits[specialty] || 0;
  };

  const getDescription = (subskillName) => {
    const subskill = subskills.find((skill) => skill.name === subskillName);
    return subskill?.description[specialty] || "No description available.";
  };

  const getHighlightClass = (benefit) => {
    if (benefit === 1) return "beneficial";
    if (benefit === 0) return "neutral";
    if (benefit === -1) return "detrimental";
    return "";
  };

  const handleSubskillChange = (level, subskillName) => {
    setSelectedSubskills((prev) => ({
      ...prev,
      [level]: subskillName,
    }));
  };

  return (
    <div className="container">
      <h1>Pokémon Sleep Analysis</h1>

      {/* Pokémon Dropdown */}
      <div className="input-group">
        <label htmlFor="pokemon-select">Select a Pokémon:</label>
        <select id="pokemon-select" onChange={handlePokemonSelect} defaultValue="">
          <option value="" disabled>
            Choose a Pokémon
          </option>
          {Object.keys(pokemonData).map((name) => (
            <option key={name} value={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Pokémon Details */}
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name || "Details"}</h2>
          <img src={selectedPokemon.sprites} alt={selectedPokemon.name} />
          <p>Specialty: {selectedPokemon.specialty}</p>
          {/* <p>Type: {selectedPokemon.type}</p>
          <p>Sleep Type: {selectedPokemon.sleepType}</p> */}
        </div>
      )}

      {/* Nature Card */}
      <div className="card">
        <h2>Nature</h2>
        <select>
        <option value="">Select a nature</option>
          {natures.map((nature) => (
            <option key={nature.name} value={nature.name}>{nature.name}</option>
          ))}
        </select>
      </div>

      {/* Early Levels Card */}
      <div className="card early-levels">
        <h2>Early Levels</h2>
        <p>These are the most important levels to look at. When subskills can be unlocked early, you can utilize the benefits of better production for a longer period of time. </p>
        {["lv10", "lv25", "lv50"].map((level) => {
          const selectedSubskill = selectedSubskills[level];
          const benefit = getBenefit(selectedSubskill);
          const description = selectedSubskill ? getDescription(selectedSubskill) : "";

          return (
            <div key={level} className={`input-group ${getHighlightClass(benefit)}`}>
              <label htmlFor={level}>Subskill (Level {level.slice(2)}):</label>
              <select
                id={level}
                value={selectedSubskill}
                onChange={(e) => handleSubskillChange(level, e.target.value)}
              >
                <option value="">Select a subskill</option>
                {subskills.map((subskill) => (
                  <option key={subskill.name} value={subskill.name}>
                    {subskill.name}
                  </option>
                ))}
              </select>
              {selectedSubskill && <p className="description">{description}</p>}
            </div>
          );
        })}
      </div>

      {/* Late Game Levels Card */}
      <div className="card late-levels">
        <h2>Late Game Levels</h2>
        <p>These subskills will take a significant amount of time and investment to unlock. It is often not worth investing in if the only revelent subskills are within the late game levels.</p>
        {["lv75", "lv100"].map((level) => {
          const selectedSubskill = selectedSubskills[level];
          const benefit = getBenefit(selectedSubskill);
          const description = selectedSubskill ? getDescription(selectedSubskill) : "";

          return (
            <div key={level} className={`input-group ${getHighlightClass(benefit)}`}>
              <label htmlFor={level}>Subskill (Level {level.slice(2)}):</label>
              <select
                id={level}
                value={selectedSubskill}
                onChange={(e) => handleSubskillChange(level, e.target.value)}
              >
                <option value="">Select a subskill</option>
                {subskills.map((subskill) => (
                  <option key={subskill.name} value={subskill.name}>
                    {subskill.name}
                  </option>
                ))}
              </select>
              {selectedSubskill && <p className="description">{description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}