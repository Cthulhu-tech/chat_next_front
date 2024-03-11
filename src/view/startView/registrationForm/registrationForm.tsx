import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button/button";
import { ButtonTypeEnum } from "../../../components/ui/button/type";
import { Input } from "../../../components/ui/input/input";
import { setValueInRegistrationForm } from "../../../redux/registrationFormSlice/registrationFormSlice";
import { StoreDispatch, StoreType } from "../../../redux/type";
import { FormTypeUpdateValue, RegistrationFormType } from "../../../redux/registrationFormSlice/type";
import { useState } from "react";
import { ErrorMessage } from "../../../components/ui/errorMessage/errorMessage";
import { createUser } from "../../../redux/registrationFormSlice/async";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
    const [formDisabled, setFormDisabled] = useState(false);
    const registrationDataStore = useSelector<StoreType, RegistrationFormType>((value) => value.registration_form);
    const dispatch = useDispatch<StoreDispatch>();
    const callbackHandler = ({ name, value }: FormTypeUpdateValue) => 
        void dispatch(setValueInRegistrationForm({
            name,
            value,
        }));
    const navigate = useNavigate();
    const formRegistrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormDisabled(() => true);
        dispatch(createUser({
            login: registrationDataStore.login,
            password: registrationDataStore.password
        }))
        .then(() => {
            navigate("/login");
        })
        .finally(() => setFormDisabled(() => false));
    }
    
    return <div className="flex flex-col h-dvh w-full items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Registration form
        </h1>
        <form
            className="max-w-sm mx-auto"
            onSubmit={formRegistrationHandler}
        >   
            <Input
                name='login'
                type='text'
                title='login'
                placeholder="your login"
                required={true}
                value={registrationDataStore.login}
                callback={callbackHandler}
            />
            <Input
                name='password'
                type='password'
                title='password'
                placeholder="your password"
                required={true}
                value={registrationDataStore.password}
                callback={callbackHandler}
            />
            <div className="flex items-center justify-between pr-4">
                <Button
                    disabled={formDisabled}
                    text="registration"
                    type={ButtonTypeEnum.submit}
                />
                <NavLink to='/login'>
                    Login
                </NavLink>
            </div>
        </form>
        <ErrorMessage
            message={registrationDataStore.error.message}
        />
    </div>
}
