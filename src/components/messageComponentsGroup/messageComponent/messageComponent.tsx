import { memo } from "react";
import { MessageChatType } from "../../../redux/messageDataSlice/type";

const MessageContainer = ({ id, message, chat }: MessageChatType) => {
    return <div className="flex items-start gap-2.5 p-5 w-full" key={id}>
    <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
       <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{chat.id}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{chat.name}</span>
       </div>
       <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
    </div>
 </div>
}

export default memo(MessageContainer);
