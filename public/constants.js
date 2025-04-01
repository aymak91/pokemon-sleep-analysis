export const NATURES = [
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

export const SUBSKILLS = [
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
        berries: "Boosts the number of Dream Shards you earn from sleep research by 6%.	No impact on the production of berries for berry specialists.",
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
        berries: "Reduces the time needed by team members to help out by 5%. Largely beneficial for any Pokemon, especially Pokemon you plan to have on the team often.",
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
        berries: "Reduces the time needed for this Pokémon to help out by 7%. Beneficial for all Pokemon. Can be upgraded to Helping Speed M.",
        ingredients: "Speeds up helpers, improving their contribution.",
        skills: "Speeds up helpers, improving their contribution.",
      },
    },
    {
      name: "Ingredient Finder M",
      benefits: { berries: -1, ingredients: 1, skills: 0 },
      description: {
        berries: "Boosts the likelihood of this Pokémon finding ingredients by 36%. This hurts berry specialists because it reduces the chances of finding berries. However, this can be remedied somewhat by allowing your pokemon to sneaky snack.",
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

  export const INGREDIENTS = {
    'bean sausage': '/ingredients/beansausage.png',
    'fancy apple': '/ingredients/fancyapple.png',
    'fancy egg': '/ingredients/fancyegg.png',
    'fiery herb': '/ingredients/fieryherb.png ',
    'greengrass corn': '/ingredients/greengrasscorn.png ',
    'greengrass soybeans': '/ingredients/greengrasssoybeans.png ',
    'honey': '/ingredients/honey.png ',
    'large leek': '/ingredients/largeleek.png ',
    'moomoo milk': '/ingredients/moomoomilk.png ',
    'pure oil': '/ingredients/pureoil.png ',
    'rousing coffee': '/ingredients/rousingcoffee.png ',
    'slowpoke tail': '/ingredients/slowpoketail.png ',
    'snoozy tomato': '/ingredients/snoozytomato.png ',
    'soft potato': '/ingredients/softpotato.png ',
    'soothing cacao': '/ingredients/soothingcacao.png ',
    'tasty mushroom': '/ingredients/tastymushroom.png ',    
    'warming ginger': '/ingredients/warmingginger.png',
  }