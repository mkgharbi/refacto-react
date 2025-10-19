import { FC } from 'react';


export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}


const Select: FC<SelectProps> = ({ options, name, ...rest }) => {
  return (
    <select name={name} {...rest}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
