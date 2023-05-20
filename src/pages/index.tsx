import { Inter } from 'next/font/google'
import { Input } from '@/components/base/Input'
import { Button } from '@/components/base/Button'
import { Robot } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const inter = Inter({ subsets: ['latin'] })

const RecipeFormSchema = z.object({
  ingredients: z.string().nonempty('Insira pelo menos um ingrediente')
})

type RecipeFormSchemaType = z.infer<typeof RecipeFormSchema>

export default function Home() {

  const { control, handleSubmit } = useForm<RecipeFormSchemaType>({
    defaultValues: {
      ingredients: ''
    },
    resolver: zodResolver(RecipeFormSchema)
  })

  const onSubmit = (data: RecipeFormSchemaType) => {
    console.log(data)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-6 p-10 bg-bg-df ${inter.className}`}
    >
      <div className='flex items-center justify-start gap-2'>
        <Robot size={48} weight="bold" />
        <h1 className='text-2xl font-bold text-zinc-900 lg:text-4xl'>Nome do app</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex z-10 w-full flex-col gap-6 max-w-4xl items-center justify-between text-sm"
      >
        <Controller
          name='ingredients'
          control={control}
          render={({ field: { onChange } }) => (
            <Input type="text" onChange={(value) => onChange(value)} placeholder='Insira seus ingredientes aqui' />
          )}
        />
        <Button type="submit">Criar Receita</Button>
      </form>
    </main>
  )
}
