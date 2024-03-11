import { memo, useContext, useEffect } from "react";
import { SocketContext } from "../../context/socketContext";
import { useParams } from "react-router";
import { MessagesComponent } from "../messageComponentsGroup/messagesComponent/messagesComponent";
import { Input } from "../ui/input/input";
import { ButtonTypeEnum } from "../ui/button/type";
import { Button } from "../ui/button/button";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreType } from "../../redux/type";
import { updateMessage } from "../../redux/messageDataSlice/messageDataSlice";
import { FormTypeUpdateValue } from "../../redux/registrationFormSlice/type";
import { DecodeUserTokenType } from "../../redux/tokenSlice/type";

const ChatComponent = () => {
    
    const { chatId } = useParams();
    const dispatch = useDispatch<StoreDispatch>();
    const socket = useContext(SocketContext);
    const message = useSelector<StoreType, string>((state) => state.message_data.message);
    const user_create = useSelector<StoreType, DecodeUserTokenType | undefined>((state) => state.token.decodeData?.data);
    useEffect(() => {
        return () => {
            socket.off('createMessage');
        }
    }, []);
    const callbackHandler = ({ name, value }: FormTypeUpdateValue) => 
    void dispatch(updateMessage({
        name,
        value,
    }));
    const createMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!chatId) return;
        socket.emit('createMessage', {
            message,
            chat: chatId,
            user_create: user_create?.id,
        });
    }

    return <main className="w-full">
        <MessagesComponent/>
        <form onSubmit={createMessage}>
            <Input
                type='text'
                required={true}
                placeholder="Message"
                value={message}
                name='message'
                callback={callbackHandler}
            />
            <Button
                text='Submit'
                type={ButtonTypeEnum.submit}
                disabled={false}
            />
        </form>
    </main>
}

export default memo(ChatComponent);
