import { SetStateAction } from 'react';

interface ITextInput {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TextInput: React.FC<ITextInput> = ({ value, setValue, inputRef }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      value={value}
      type="text"
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="off"
      autoComplete="off"
      onChange={onChange}
      ref={inputRef}
      style={{ position: 'absolute', zIndex: -1, top: 0, opacity: 0 }}
    />
  );
};

export default TextInput;
