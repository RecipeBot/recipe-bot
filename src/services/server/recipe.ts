import { openai } from "./openai"

const config = {
  language: "pt-BR",
  tokens: 256,
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
      Answer in the language: ${config.language}
      The answer must be a valid JSON object with the following format: ${config.format}.
      The valid JSON object must fit in ${config.tokens} text tokens.
      The valid JSON object cannot have the characters "\n" nor "\t".
      Create a food recipe based on the following ingredients: ${ingredients}.
      The valid JSON object:
    `,
    temperature: 1,
    max_tokens: config.tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  console.log('safeResponse', response.data.choices[0].text)

  return JSON.parse(response.data.choices[0].text as string)
}