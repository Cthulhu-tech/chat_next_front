import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreType } from "../../redux/type";
import { TokenSliceType } from "../../redux/tokenSlice/type";
import { ChatCreate } from "./chatCreate/chatCreate";
import { getChats } from "../../redux/chatDataSlice/async";
import { ChatList } from "./chatList/chatList";
import { SocketContext, socket } from "../../context/socketContext";

export const ChatView = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const tokenDataStore = useSelector<StoreType, TokenSliceType>((value) => value.token);
    useLayoutEffect(() => {
        dispatch(getChats());
    }, []);

    useEffect(() => {
        if(tokenDataStore.decodeData) {
            socket.connect();
        }
        return () => {
            socket.close();
        }
    }, []);

    return <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
       <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ChatCreate/>
        <SocketContext.Provider value={socket}>
           <ChatList/> 
        </SocketContext.Provider>
       </div>
    </aside>
}
