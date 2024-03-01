import { UserLoginAndCreateForm } from "../type";

export type UserLoginType = {
    login: string;
}

export interface UserRegistrationType extends UserLoginType {
    password: string;
}

export interface IUserTypeRegistration {
    user: UserType;
}

export interface RegistrationFormType extends UserLoginType, UserRegistrationType, UserLoginAndCreateForm, IUserTypeRegistration {
    repeat_password: string;
}

export interface UserType extends UserLoginType {
    id: number | null;
}

export type FormTypeUpdateValue = {
    name: string;
    value: string;
}
