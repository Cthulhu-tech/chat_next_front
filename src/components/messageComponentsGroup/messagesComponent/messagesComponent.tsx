import { useSelector } from "react-redux";
import { MessagesChatType } from "../../../redux/messageDataSlice/type";
import { StoreType } from "../../../redux/type";
import { useParams } from "react-router";
import MessageContainer from '../messageComponent/messageComponent';

export const MessagesComponent = () => {

    const { chatId } = useParams();
    const messageData = useSelector<StoreType, Record<string, MessagesChatType>>((state) => state.message_data.messageData);
    if(!chatId || !messageData[chatId])
    return <></>
    return <div className="w-full">
        {messageData[chatId].message.map((dataMessage) => 
        <MessageContainer
            key={dataMessage.id}
            id={dataMessage.id}
            message={dataMessage.message}
            chat={dataMessage.chat}
        />)}
    </div>
}
