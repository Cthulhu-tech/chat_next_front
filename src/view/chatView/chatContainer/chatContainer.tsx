import { NavLink } from "react-router-dom";
import { ChatType } from "../../../redux/chatDataSlice/type";
import { memo, useContext, useEffect } from "react";
import { SocketContext } from "../../../context/socketContext";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/type";

const ChatContainer = ({ id, name }: ChatType) => {
    const socket = useContext(SocketContext);
    const userLogin = useSelector<StoreType, string | undefined>((data) => data.token.decodeData?.data.login)
    useEffect(() => {
        console.log(123)
        if(userLogin) {
            socket.emit('joinChat', {
                user: userLogin,
                id,
            });
            socket.emit('getMessages', {
                user: userLogin,
                id,
            });
        }

        socket.on('joinChat', (data: any) => {
            console.log(data, id)
        });

        socket.on('getMessages', (data: any) => {
            console.log(data, id)
        });

        return () => {
            socket.off('joinChat');
        }
    }, []);

    return  <li key={id}>
        <NavLink
            to={`${id}`}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
            <span className="flex-1 ms-3 whitespace-nowrap">
                {name} - {id}
            </span>
        </NavLink>
    </li>
}

export const MemoChatContainer = memo(ChatContainer);
