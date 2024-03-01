import { UserType } from "./registrationFormSlice/type";
import { store } from "./store";

export type PayloadType<T> = {
    readonly payload: T;
    readonly type: string;
}

export enum ThunkLoadingEnum {
   'idle' = 'idle',
   'pending' = 'pending',
   'succeeded' = 'succeeded',
   'failed' = 'failed',
}

export interface UserLoginAndCreateForm {
    loading: ThunkLoadingEnum;
    error: FormError;
}

export interface UserDataAfterFetch {
    error: FormError;
    requestStatus: ThunkLoadingEnum;
}

export interface FormError {
    message: string;
    statusCode: string | null;
}

export interface UserErrorAfterFetch {
    error: FormError;
    requestStatus: ThunkLoadingEnum;
}

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
