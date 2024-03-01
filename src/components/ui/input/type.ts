import { FormTypeUpdateValue } from "../../../redux/registrationFormSlice/type";

export type InputType = {
    readonly type: string;
    readonly title?: string;
    callback: (value: FormTypeUpdateValue) => void;
    readonly placeholder?: string;
    readonly required: boolean;
    value: string;
    readonly name: string;
}
