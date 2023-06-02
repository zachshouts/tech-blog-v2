interface InputProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: any;
}


const Input: React.FC<InputProps> = ({ id, type, label, value, onChange }) => {

  return (
    <div className="relative">
      <input 
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className="
        block
        rounded-lg
        drop-shadow-lg
        px-6
        pt-6
        pb-1
        w-full
        text-md
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1"
        placeholder=" "
        />
        <label
          htmlFor={id}
          className="
          absolute 
          text-md
          text-zinc-500
          duration-150 
          transform 
          -translate-y-3 
          scale-75 
          top-4 
          z-10 
          origin-[0] 
          left-6
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-3"
          >{label}</label>
    </div>

  );
}

export default Input;