import { ChatType } from "../chatDataSlice/type";
import { ThunkLoadingEnum } from "../type";

export interface MessageType {
    id: number;
    message: string;
}

export interface MessageChatType extends MessageType {
    chat: ChatType;
}

export interface NewMessageChatType {
    id: number;
    room_id: number;
    message: MessageChatType;
}

export interface MessagesChatType {
    message: MessageChatType[];
    room_id: number;
}

export type MessageTypeDataStore = {
    loading: ThunkLoadingEnum;
    messageData: Record<string, MessagesChatType>;
    message: string;
}
