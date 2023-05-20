import { openai } from "./openai"

const config = {
  language: "pt-BR",
  tokens: 256,
  format: JSON.stringify({
    name: "string",
    ingredients: ["string"],
    instructions: ["string"]
  }),
}

export const generateRecipe = async (ingredients: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
      Answer in the language: ${config.language}
      The answer must be a valid JSON object with the following format: ${config.format}.
      The valid JSON object must fit in ${config.tokens} tokens.
      Create a food recipe based on the following ingredients: ${ingredients}.
      The valid JSON object:
    `,
    temperature: 1,
    max_tokens: config.tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  const safeResponse = response.data.choices[0].text?.replaceAll("\n", "").replaceAll("\t", "")

  console.log('safeResponse', safeResponse)

  return JSON.parse(safeResponse as string)
}