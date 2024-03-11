import { memo } from "react";
import { MessageChatType } from "../../../redux/messageDataSlice/type";

const MessageContainer = ({ id, message, chat }: MessageChatType) => {
    console.log(id, message, chat)
    return <div>
        <span>{chat.name}</span>
        <span>{id}</span>
        <span>{message}</span>
    </div>
}

export default memo(MessageContainer);
