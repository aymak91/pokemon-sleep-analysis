import React, { useEffect, useState } from "react";
import {NATURES, SUBSKILLS, INGREDIENTS} from "../../public/constants";

export default function Home() {
  const [pokemonData, setPokemonData] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: "pikachu",
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif",
    specialty: "berries",
    type: "electric",
    sleepType: "snoozing",
    ingredients: {"1": "fancyapple", "25":"warmingginger", "60": "fancyegg"}
  });
  
  const [selectedSubskills, setSelectedSubskills] = useState({
    lv10: "",
    lv25: "",
    lv50: "",
    lv75: "",
    lv100: "",
  });
  const [specialty, setSpecialty] = useState("berries");
  const [nature, setNature] = useState("Bashful")
  const [natureDetails, setNatureDetails] = useState({ buffs: {}, debuffs: {} });
  const [selectedIngredients, setSelectedIngredients] = useState({
    level1: "fancy apple",
    level25: "warming ginger",
    level60: "fancy egg",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true); // Set loading to true at the start of the fetch
      try {
        const response = await fetch("/pokemon.json");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setPokemonData(data);
  
        // Ensure the default Pokémon is loaded properly
        if (data.pikachu) {
          handlePokemonSelect("pikachu", data); // Select the default Pokémon if it's available
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // Set loading to false after the fetch is completed
      }
    };
  
    fetchPokemonData();
  }, []); // Only run once on initial load
  

  const handlePokemonSelect = async (pokemonNameOrEvent) => {
    const pokemonName = typeof pokemonNameOrEvent === "string" 
      ? pokemonNameOrEvent // Direct name when called manually
      : pokemonNameOrEvent.target.value; // Value from event when called from UI
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      const selected = pokemonData[pokemonName];
  
      // Set the new Pokémon data
      setSelectedPokemon({
        name: data.name,
        sprites: data.sprites.other.showdown.front_default,
        specialty: selected?.specialty || "berries",
        type: selected?.type,
        sleepType: selected?.sleepType,
        ingredients: selected?.ingredients || {}
      });
  
      setSpecialty(selected?.specialty || "berries");
      setSelectedIngredients({
        level1: selected?.ingredients[1] || "",
        level25: selected?.ingredients[1] || "",
        level60: selected?.ingredients[1] || "",
      });
  
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error("Error fetching Pokémon details:", err.message);
      setLoading(false); // Ensure loading is stopped even in case of an error
    }
  };

  const getBenefit = (subskillName) => {
    const subskill = SUBSKILLS.find((skill) => skill.name === subskillName);
    return subskill?.benefits[specialty] || 0;
  };

  const getDescription = (subskillName) => {
    const subskill = SUBSKILLS.find((skill) => skill.name === subskillName);
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

  const handleNatureChange = (event) => {
    const selectedNature = event.target.value;
    setNature(selectedNature);

    // Find the nature in the NATURES array
    const natureData = NATURES.find((n) => n.name === selectedNature);

    if (natureData) {
      const buffs = {};
      const debuffs = {};

      // Separate buffs (positive values) and debuffs (negative values)
      Object.entries(natureData).forEach(([key, value]) => {
        if (key !== "name" && value !== undefined) {
          if (value > 0) buffs[key] = value;
          if (value < 0) debuffs[key] = value;
        }
      });

      setNatureDetails({ buffs, debuffs });
    } else {
      setNatureDetails({ buffs: {}, debuffs: {} });
    }
  };

  const handleIngredientClick = (level, ingredient) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [level]: ingredient,
    }));
  };

  function getIngredientMessage(selectedIngredients) {
    const { level1, level25, level60 } = selectedIngredients;

    
    // AAA
    if (level1 === level25 && level25 === level60) {
      return `This ingredient list is optimal for consistently farming ${level1}.`;
    }
    
    // eggs
    if (level25 == "fancyegg" && level60 == "fancyegg") {
      return "Eggs are currently difficult to come by. This is a solid egg farmer."
    }

    // leeks 
    if (level25 == "largeleek" && level60 == "largeleek") {
      return "Leeks are currently difficult to come by. This is a solid leek farmer."
    }

    // tails
    if (level60 == "slowpoketail") {
      return "Slowpoke tails are currently difficult to come by. This could be worth considering for slowpoke tails if the subskills are good."
    }

    // ABB
    if (level1 !== level25 && level25 == level60) {
      return `This Pokemon is decently good for farming ${level25} but may not be the most consistent. If ${level25} cannot be found at level 1 elsewhere, this is optimal.`;
    }
  
    // AAB, AAC
    if (level1 === level25 && level60 !== level1) {
      return `This ingredient list is good for temporary use until you can find a list with mono ${level1}. Alternatively, you can keep this Pokémon below level 60 to ensure you can consistently farm ${level1}.`;
    }

    // ABA
    if (level1 == level60 && level1 != level25) {
      return `This will be decent at farming ${level25} until level 60. It will farm ${level1} decently well in the longer term. The ingredient list is not very consistent and generally not recommended, but it may fill a niche role for you.`
    }
  
    // ABC
    return "Due to the different ingredients, this ingredient list is inconsistent and could be difficult to consistently farm the ingredients you are looking for.";
  }
  

  return (
    <div className="container">
      <div>
        <h1>Pokémon Sleep Analysis</h1>
        <p className="intro-paragraph">This is a Sleep Analysis tool meant to help you learn how to self-assess Pokemon that you catch in Pokemon Sleep. Depending on a Pokemon's specialty, different buffs or debuffs can be beneficial. Enter your Pokemon details to learn more about them!</p>
      </div>

      {/* Pokémon Dropdown */}
      <div className="input-group">
        <label htmlFor="pokemon-select">Select a Pokémon:</label>
        <select
          id="pokemon-select"
          onChange={handlePokemonSelect}
          value={selectedPokemon.name} // Bind the dropdown value to selectedPokemon.name
        >
          <option value="" disabled>
            Choose a Pokémon
          </option>
          {Object.keys(pokemonData).map((name) => (
            <option key={name} value={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </option>
          ))}
        </select>
        {/* Pokémon Details */}
        {selectedPokemon && (
          <div className="pokemon-details">
            {/* <h2>{selectedPokemon.name || "Details"}</h2> */}
            <img src={selectedPokemon.sprites} alt={selectedPokemon.name} />
            <p>Specialty: {selectedPokemon.specialty}</p>
            {/* <p>Type: {selectedPokemon.type}</p>
            <p>Sleep Type: {selectedPokemon.sleepType}</p> */}
          </div>
        )}
      </div>

      <div className="card">
      <h2 className="card-title">Ingredients</h2>
      {!selectedPokemon || Object.keys(selectedPokemon.ingredients).length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {/* Level 1 */}
          <div className="level">
            <label className="level-label">Level 1</label>
            <div className="ingredients-container">
              <img
                src={INGREDIENTS[selectedPokemon.ingredients[1]]}
                alt="Level 1 Ingredient"
                onClick={() =>
                  handleIngredientClick("level1", selectedPokemon.ingredients[1])
                }
                className={`ingredient ${
                  selectedIngredients.level1 === selectedPokemon.ingredients[1]
                    ? "selected"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* Level 25 */}
          <div className="level">
            <label className="level-label">Level 25</label>
            <div className="ingredients-container">
              {["1", "25"].map((lvl) => (
                <img
                  key={lvl}
                  src={INGREDIENTS[selectedPokemon.ingredients[lvl]]}
                  alt={`Level ${lvl} Ingredient`}
                  onClick={() =>
                    handleIngredientClick(
                      "level25",
                      selectedPokemon.ingredients[lvl]
                    )
                  }
                  className={`ingredient ${
                    selectedIngredients.level25 === selectedPokemon.ingredients[lvl]
                      ? "selected"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Level 60 */}
          <div className="level">
            <label className="level-label">Level 60</label>
            <div className="ingredients-container">
              {["1", "25", "60"].map((lvl) => (
                <img
                  key={lvl}
                  src={INGREDIENTS[selectedPokemon.ingredients[lvl]]}
                  alt={`Level ${lvl} Ingredient`}
                  onClick={() =>
                    handleIngredientClick(
                      "level60",
                      selectedPokemon.ingredients[lvl]
                    )
                  }
                  className={`ingredient ${
                    selectedIngredients.level60 === selectedPokemon.ingredients[lvl]
                      ? "selected"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
            
      <p>
        {!selectedIngredients['level1'] 
          ? "Loading..."
          : selectedPokemon.specialty === "berries"
          ? "The ingredient list is typically not a concern for berry specialists."
          : selectedPokemon.specialty === "skills"
          ? "The ingredient list is typically not a concern for skills specialists."
          : getIngredientMessage(selectedIngredients)}
      </p>

    </div>



      {/* Nature Card */}
      <div className="card">
        <h2>Nature</h2>
        <select onChange={handleNatureChange} value={nature}>
          <option value="">Select a nature</option>
          {NATURES.sort((a, b) => a.name.localeCompare(b.name)).map((nature) =>  (
            <option key={nature.name} value={nature.name}>
              {nature.name}
            </option>
          ))}
        </select>

        {/* Buff and Debuff Display */}
        {!natureDetails.buffs || Object.keys(natureDetails.buffs).length === 0 && !natureDetails.debuffs || Object.keys(natureDetails.debuffs).length === 0 ? (
        <p className="nature-no-effect">This nature does not have an effect. If the subskills are good enough, neutral natures are acceptable.</p>
        ) :(
          <>  
            {natureDetails.buffs && Object.keys(natureDetails.buffs).length > 0 && (
              <div className={"nature-details" + (
                (Object.keys(natureDetails.buffs)[0] === "skill" && selectedPokemon.specialty === "skills") ||
                (Object.keys(natureDetails.buffs)[0] === "ingredient" && selectedPokemon.specialty === "ingredients") ||
                (Object.keys(natureDetails.buffs)[0] === "speed")
                  ? " beneficial"
                  : (Object.keys(natureDetails.buffs)[0] === "ingredient" && selectedPokemon.specialty === "berries")
                  ? " detrimental"
                  : " neutral"
              )}>
              
                <h3 className="">Buffs:</h3>
                <ul>
                  {Object.entries(natureDetails.buffs).map(([key, value]) => (
                    <>
                      <li key={key}>
                        {key}: {value > 0 ? "+" : ""}{(value * 100).toFixed(2)}%
                      </li>
                      <li>
                        {
                          key === 'energy'
                          ? "Not the most useful buff, especially if you have a good healer."
                          : key === 'exp'
                          ? "Does not affect production but can be useful on pseudolegendaries or legendaries that take a long time to level up."
                          : key == 'speed'
                          ? "Speed is always a useful buff!"
                          : key === 'skill'
                          ? (selectedPokemon.specialty === "skills"
                            ? "Very beneficial for skills specialists!"
                            : "Not the best buff for ingredient or berry specialists, but can still be decently useful if the subskills are good."
                          )
                          : (selectedPokemon.specialty === "ingredients"
                            ? "Very beneficial for ingredient specialists!"
                            : selectedPokemon.specialty === "berries"
                            ? "Slightly detrimental to berry specialists but can be remedied by just sneaky snacking."
                            : "No major effect on skills specialists, though inventory may fill slightly faster."
                          )
                        }
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            )}
            
            {natureDetails.debuffs && Object.keys(natureDetails.debuffs).length > 0 && (
              <div className={"nature-details" + (
                (Object.keys(natureDetails.debuffs)[0] === "skill" && selectedPokemon.specialty === "skills") ||
                (Object.keys(natureDetails.debuffs)[0] === "ingredient" && selectedPokemon.specialty === "ingredients") ||
                (Object.keys(natureDetails.debuffs)[0] === "speed")
                ? " detrimental"
                : (Object.keys(natureDetails.debuffs)[0] === "ingredient" && selectedPokemon.specialty === "berries")
                ? " beneficial"
                : " neutral"
              )}>
              
                <h3>Debuffs:</h3>
                <ul>
                  {Object.entries(natureDetails.debuffs).map(([key, value]) => (
                    <>
                      <li key={key}>
                        {key}: {value > 0 ? "+" : ""}{(value * 100).toFixed(2)}%
                      </li>
                      <li>
                      {
                        key === 'energy'
                        ? "This debuff is not a big deal if you have a good healer."
                        : key === 'exp'
                        ? "Does not affect production but can make pseudolegendaries or legendaries take an extremely long time to level up."
                        : key == 'speed'
                        ? "A speed debuff is detrimental for all Pokemon!"
                        : key === 'skill'
                        ? (selectedPokemon.specialty === "skills"
                          ? "Very detrimental for skills specialists!"
                          : "This debuff is not a big concern for ingredient or berry specialists."
                        )
                        : (selectedPokemon.specialty === "ingredients"
                          ? "Very detrimental for ingredient specialists!"
                          : selectedPokemon.specialty === "berries"
                          ? "Beneficial for berry specialist since berries are more likely to be produced!"
                          : "No major effect on skills specialists."
                        )
                      }
                    </li>
                    </>
                  ))}
                </ul>
              </div>
            )}
          </>
      )}
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
                {SUBSKILLS.sort((a,b) => a.name.localeCompare(b.name)).map((subskill) => (
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
                {SUBSKILLS.map((subskill) => (
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