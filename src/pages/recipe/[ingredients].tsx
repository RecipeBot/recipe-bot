import { IRecipe } from "@/@types/interfaces"
import { getRecipe } from "@/services/api/recipe";
import { GetStaticPaths, GetStaticProps } from "next";
import { Clock, Robot, User } from "phosphor-react";

interface RecipeProps {
  recipe: IRecipe | null;
  error: boolean;
}

export default function Recipe(props: RecipeProps) {
  const { recipe } = props

  if (!recipe) {
    return (
      <div>
        <h1>Receita não encontrada</h1>
      </div>
    )
  }

  return (
    <main
      className={`flex min-h-screen flex-col justify-start gap-6 p-10 bg-bg-df`}
    >
      <div className='flex items-center justify-start gap-2'>
        <Robot size={48} weight="bold" />
        <h2 className='text-2xl font-bold text-zinc-900 lg:text-4xl'>Nome do App</h2>
      </div>

      <hr className="border-zinc-300" />

      <h1 className='text-2xl font-bold text-zinc-900 lg:text-4xl'>{recipe.name}</h1>

      <div className="flex gap-4 align-center">
        <div
          className="flex gap-2 align-center"
        >
          <User size={22} weight="bold" />
          <p>
            {recipe.servings} pessoas
          </p>
        </div>
        <div
          className="flex gap-2 align-center"
        >
          <Clock size={22} weight="bold" />
          <p>
            {recipe.cookingTime} minutos
          </p>
        </div>
      </div>

      <h2 className='text-1xl font-bold text-zinc-900 lg:text-3xl'>Ingredientes</h2>
      <ul>
        {
          recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))
        }
      </ul>
      <h2 className='text-1xl font-bold text-zinc-900 lg:text-3xl'>Modo de preparo</h2>
      <ul>
        {
          recipe.instructions.map((instruction, index) => (
            <li key={instruction}>{index + 1} - {instruction}</li>
          ))
        }
      </ul>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const ingredients = params?.ingredients as string

    const recipe = await getRecipe(ingredients)

    return {
      revalidate: 60 * 60 * 24,
      props: {
        recipe,
        error: false
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        recipe: null,
        error: true
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: 'blocking' });