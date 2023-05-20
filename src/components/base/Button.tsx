import { type } from "os";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, type } = props

  return (
    <button
      type={type}
      className="bg-brand-500 hover:brightness-110 transition-all text-white font-bold py-4 px-8 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  )
}