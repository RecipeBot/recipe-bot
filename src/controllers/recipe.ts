import { generateRecipe } from "@/services/server/recipe"
import { NextApiRequest, NextApiResponse } from "next"

export const getRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.ingredients) {
    res.status(400).json({ message: "Missing query param 'ingredients'." })
    return
  }

  try {
    const response = await generateRecipe(String(req.query.ingredients))

    res.status(200).json({ recipe: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}