import { Inter } from 'next/font/google'
import { Input } from '@/components/base/Input'
import { Button } from '@/components/base/Button'
import { Robot } from 'phosphor-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-8 p-16 bg-bg-df ${inter.className}`}
    >
      <div className='flex items-center justify-start gap-2'>
        <Robot size={48} weight="bold" />
        <h1 className='text-2xl font-bold text-zinc-900 lg:text-4xl'>Recipe AI</h1>
      </div>
      <div className="flex z-10 w-full flex-col gap-8 max-w-4xl items-center justify-between text-sm">
        <Input type="text" onChange={console.log} placeholder='Insira seus ingredientes aqui' />
        <Button onClick={() => { }}>Criar Receita</Button>
      </div>
    </main>
  )
}
