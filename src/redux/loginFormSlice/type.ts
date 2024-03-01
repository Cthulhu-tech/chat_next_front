import { UserRegistrationType } from "../registrationFormSlice/type";
import { UserLoginAndCreateForm } from "../type";

export interface LoginFormType extends UserLoginAndCreateForm, UserRegistrationType {}
