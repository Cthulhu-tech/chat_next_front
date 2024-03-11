import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreType } from "../../../redux/type";
import { ChatType } from "../../../redux/chatDataSlice/type";
import { MemoChatContainer } from "../chatContainer/chatContainer";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../context/socketContext";
import { UserConnectionType } from "./type";
import { setMessageInChat, setMessagesInChat } from "../../../redux/messageDataSlice/messageDataSlice";
import { MessagesChatType, NewMessageChatType } from "../../../redux/messageDataSlice/type";

export const ChatList = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const socket = useContext(SocketContext);
    const chatData = useSelector<StoreType, ChatType[]>((value) => value.chat_data.data);

    useEffect(() => {
        socket.on('joinChat', (data: UserConnectionType) => {
            console.log(data)
        });
        socket.on('getMessages', (data: MessagesChatType) => {
            dispatch(setMessagesInChat(data));
        });
        socket.on('createMessage', (data: NewMessageChatType) => {
            dispatch(setMessageInChat(data));
        });
        return () => {
            socket.off('joinChat');
            socket.off('getMessages');
            socket.off('createMessage');
        }
    }, []);

    return <ul className="space-y-2 font-medium">
        {chatData.map((data) => <MemoChatContainer key={data.id} id={data.id} name={data.name}/>)}
    </ul>
}
