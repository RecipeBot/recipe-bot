import { getRecipe } from "@/controllers/recipe"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": getRecipe(req, res); break;
    default: {
      res.status(405).json({ message: "Method not allowed" })
    }
  }
}

export default handler