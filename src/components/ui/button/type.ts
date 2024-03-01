export enum ButtonTypeEnum {
    "button" = "button",
    "reset" = "reset",
    "submit" = "submit",
}

export type ButtonType = {
    text: string;
    type: ButtonTypeEnum;
    disabled: boolean;
}
