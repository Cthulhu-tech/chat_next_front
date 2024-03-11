import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button/button";
import { ButtonTypeEnum } from "../../../components/ui/button/type";
import { Input } from "../../../components/ui/input/input";
import { StoreDispatch, StoreType } from "../../../redux/type";
import { FormTypeUpdateValue } from "../../../redux/registrationFormSlice/type";
import { useState } from "react";
import { ErrorMessage } from "../../../components/ui/errorMessage/errorMessage";
import { loginUser } from "../../../redux/loginFormSlice/async";
import { setToken } from "../../../redux/tokenSlice/tokenSlice";
import { TokenAccess } from "../../../redux/tokenSlice/type";
import { LoginFormType } from "../../../redux/loginFormSlice/type";
import { setValueInLoginForm } from "../../../redux/loginFormSlice/loginFormSlice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [formDisabled, setFormDisabled] = useState(false);
    const loginDataStore = useSelector<StoreType, LoginFormType>((value) => value.login_form);
    const dispatch = useDispatch<StoreDispatch>();
    const callbackHandler = ({ name, value }: FormTypeUpdateValue) => 
        void dispatch(setValueInLoginForm({
            name,
            value,
        }));

    const formLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormDisabled(() => true);
        dispatch(loginUser({
            login: loginDataStore.login,
            password: loginDataStore.password,
        })).then((data) => {
            if(data.payload && (data.payload as TokenAccess)?.access) {
                dispatch(setToken((data.payload as TokenAccess).access as string));
            }
        }).then(() => {
            navigate("/chat");
        }).finally(() => setFormDisabled(() => false));
    }
    
    return <div className="flex flex-col h-dvh w-full items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Login form
        </h1>
        <form
            className="max-w-sm mx-auto"
            onSubmit={formLoginHandler}
        >   
            <Input
                name='login'
                type='text'
                title='login'
                placeholder="your login"
                required={true}
                value={loginDataStore.login}
                callback={callbackHandler}
            />
            <Input
                name='password'
                type='password'
                title='password'
                placeholder="your password"
                required={true}
                value={loginDataStore.password}
                callback={callbackHandler}
            />
            <div className="flex items-center justify-between pr-4">
                <Button
                    disabled={formDisabled}
                    text="login"
                    type={ButtonTypeEnum.submit}
                />
                <NavLink to='/registration'>
                    Registration
                </NavLink>
            </div>
        </form>
        <ErrorMessage
            message={loginDataStore.error.message}
        />
    </div>
}
