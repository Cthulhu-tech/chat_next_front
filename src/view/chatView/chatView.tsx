import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreType } from "../../redux/type";
import { DecodeUserTokenType } from "../../redux/tokenSlice/type";
import { ChatCreate } from "./chatCreate/chatCreate";
import { getChats } from "../../redux/chatDataSlice/async";
import { ChatList } from "./chatList/chatList";
import { SocketContext, socket } from "../../context/socketContext";
import { Outlet } from "react-router";

export const ChatView = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const decodeUserToken = useSelector<StoreType, DecodeUserTokenType | undefined>((value) => value.token.decodeData?.data);
    useLayoutEffect(() => {
        dispatch(getChats())
    }, []);

    useEffect(() => {
        if(decodeUserToken) {
            socket.connect();
        }
        return () => {
            socket.close();
        }
    }, [decodeUserToken]);

    return <div className="wrapper-app">
    <aside>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ChatCreate/>
            <SocketContext.Provider value={socket}>
                <ChatList/> 
            </SocketContext.Provider>
        </div>
    </aside>
    <Outlet/>
    </div>
}
