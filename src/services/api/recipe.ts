import { api } from "./api"

export const getRecipe = async (ingredients: string) => {
  return api.get("/recipe", { params: { ingredients } })
    .then(response => response.data.recipe)
}