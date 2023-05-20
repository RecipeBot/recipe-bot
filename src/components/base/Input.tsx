type InputType = 'text' | 'number' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';

type InputValue<Type extends InputType> = Type extends 'number' ? number : string;

interface InputProps<Type extends InputType> {
  type: Type;
  placeholder?: string;
  value?: InputValue<Type>;
  defaultValue?: InputValue<Type>;
  onChange: (value: InputValue<Type>) => void;
}

export const Input = <Type extends InputType>(props: InputProps<Type>) => {
  const { defaultValue, onChange, type, value, placeholder } = props

  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      className='rounded-md px-4 py-2 text-zinc-900 w-full border-zinc-500 border-2 h-12 bg-white hover:bg-slate-50'
      placeholder={placeholder}
      onChange={e => onChange(e.target.value as InputValue<Type>)}
    />
  );
}