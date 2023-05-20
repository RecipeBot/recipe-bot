import { openai } from "./openai"

const config = {
  language: "pt-BR",
  maxTokens: 256,
  instructions: {
    max: 5,
    characters: 40,
  },
  ingredients: {
    max: 5,
    characters: 10,
  },
  format: JSON.stringify({
    name: "string",
    ingredients: ["string"],
    instructions: ["string"],
    servings: "number",
    cookingTime: "string",
  }),
}

export const generateRecipe = async (ingredients: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
      Create a recipe based on the following ingredients: ${ingredients}.
      The recipe must have the following properties:
      Only edible ingredients.
      Be a valid JSON object.
      JSON format: ${config.format}.
      Invalid characters: "\n" and "\t".
      Language: ${config.language}.
      Number of instructions: ${config.instructions.max}.
      Max characters per instruction: ${config.instructions.characters}.
      Number of ingredients: ${config.ingredients.max}.
      Max characters per ingredient: ${config.ingredients.characters}.
      The valid JSON object:
    `,
    temperature: 1,
    max_tokens: config.maxTokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  console.log('safeResponse', response.data.choices[0].text)

  return JSON.parse(response.data.choices[0].text as string)
}