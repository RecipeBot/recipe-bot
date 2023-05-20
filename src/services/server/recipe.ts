import { openai } from "./openai"

const config = {
  language: "pt-BR",
  prompt: "Create a food recipe based on the following ingredients: ",
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
      ${config.prompt}: ${ingredients}. 
      Answer in ${config.language}
      Create a valid JSON object with the following format: ${config.format}. 
      The valid JSON object: 
    `,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  const safeResponse = response.data.choices[0].text?.replaceAll("\n", "").replaceAll("\t", "")

  console.log('safeResponse', safeResponse)

  return JSON.parse(safeResponse as string)
}