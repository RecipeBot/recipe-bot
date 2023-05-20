interface ButtonProps {
  children: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick } = props

  return (
    <button
      className="bg-brand-500 hover:brightness-110 transition-all text-white font-bold py-4 px-8 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  )
}