import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type";
import { ChatType } from "../../../redux/chatDataSlice/type";
import { MemoChatContainer } from "../chatContainer/chatContainer";

export const ChatList = () => {

    const chatData = useSelector<StoreType, ChatType[]>((value) => value.chat_data.data);



    return <ul className="space-y-2 font-medium">
        {chatData.map((data) => <MemoChatContainer key={data.id} id={data.id} name={data.name}/>)}
    </ul>
}