import { FormError, ThunkLoadingEnum } from "../type";

export interface IChatData extends IChatType, IChatDataName {
    error: FormError;
    loading: ThunkLoadingEnum;
}

export interface IChatType {
    count: number;
    data: ChatType[];
}

export interface IChatDataName {
    name: string;
}

export interface IChatDataCreate extends IChatDataName {
    user: number;
}

export type ChatType = {
    id: number;
    name: string;
}
