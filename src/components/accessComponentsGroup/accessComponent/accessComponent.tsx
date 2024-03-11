import { useDispatch, useSelector } from "react-redux";
import { ChildComponent } from "../type"
import { StoreDispatch, StoreType } from "../../../redux/type";
import { TokenSliceType } from "../../../redux/tokenSlice/type";
import { useLayoutEffect } from "react";
import { refreshToken } from "../../../redux/tokenSlice/async";
import { Navigate } from "react-router";

export const AccessComponent = ({ children }: ChildComponent) => {
    
    const dispatch = useDispatch<StoreDispatch>();
    const tokenDataStore = useSelector<StoreType, TokenSliceType>((value) => value.token);
    useLayoutEffect(() => {
        if(
            !tokenDataStore.token &&
            tokenDataStore.loading
        ) {
            dispatch(refreshToken());
        }
    }, []);
    
    if(tokenDataStore.loading) {
        return <div>check</div>;
    }

    if(!tokenDataStore.token) {
        return <Navigate replace to='/login' />;
    }

    return children;
}
