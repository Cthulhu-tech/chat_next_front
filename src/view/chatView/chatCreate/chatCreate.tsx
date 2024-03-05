import { useState } from "react";
import { Input } from "../../../components/ui/input/input";
import { FormTypeUpdateValue } from "../../../redux/registrationFormSlice/type";
import { Button } from "../../../components/ui/button/button";
import { ButtonTypeEnum } from "../../../components/ui/button/type";
import { setValueInChatCreateForm } from "../../../redux/chatDataSlice/chatDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreType } from "../../../redux/type";
import { IChatData } from "../../../redux/chatDataSlice/type";
import { createChat } from "../../../redux/chatDataSlice/async";
import { TokenSliceType } from "../../../redux/tokenSlice/type";

export const ChatCreate = () => {

    const dispatch = useDispatch<StoreDispatch>();
    const [chat, setChat] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const chatHandler = () => setChat((state) => !state);
    const chatData = useSelector<StoreType, IChatData>((value) => value.chat_data);
    const tokenData = useSelector<StoreType, TokenSliceType>((value) => value.token);
    const callbackHandler = ({ name, value }: FormTypeUpdateValue) => 
        void dispatch(setValueInChatCreateForm({
            name,
            value,
        }));
    const submitData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(() => true);
        if(tokenData.decodeData?.data.id ) {
            dispatch(createChat({ name: chatData.name, user: tokenData.decodeData?.data.id }))
            .finally(() => {
                setDisabled(() => false);
            });
        } else {
            setDisabled(() => false);
        }
    }

    return <>
        <div onClick={chatHandler}>
            <span className="cursor-pointer">
                {chat ? 'Закрыть создание чата' : 'Создать чат'}
            </span>
        </div>
        {chat && <form onSubmit={submitData}>
            <Input
                type='string'
                title='Имя чата'
                required={true}
                placeholder='Имя чата'
                name={'name'}
                callback={callbackHandler}
                value={chatData.name}
            />
            <Button
                type={ButtonTypeEnum.submit}
                text='Создать чат'
                disabled={disabled}
            />
        </form>}
    </>
}