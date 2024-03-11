import { useEffect, useState } from "react"
import { InputType } from "./type"

export const Input = ({ 
    type,
    title,
    callback,
    required,
    placeholder,
    value,
    name,
}: InputType) => {

    const [inputValue, setInputValue] = useState(value);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(() => event.target.value);
    useEffect(() => {
        callback({
            name,
            value: inputValue,
        });
    }, [inputValue]);
    

    return <div className="mb-5">
        <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {title}
        </label>
        <input
            name={name}
            type={type}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder={placeholder}
            required={required}
            onChange={changeHandler}
            value={inputValue}
        />
    </div>
}
