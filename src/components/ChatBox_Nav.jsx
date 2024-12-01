import logo from '../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setDeleteChat } from '../redux/slices/deleteChat';

const DELETE_MSG_OF_CHATROOM = gql`
    mutation DeleteMsgOfChatroom($senderId: String!, $recieverId: String!) {
        deleteMsgOfChatroom(senderId: $senderId, recieverId: $recieverId) {
            success
        }
    }
`;

const ChatBox_Nav = ({ handleNavGroup }) => {
    const senderId = useSelector((state) => state.currentUser?.data?.id);
    const recieverId = useSelector((state) => state.recieverUser?.recieverId);
    const recieverName = useSelector((state) => state.recieverUser?.recieverName);
    const isDarker = useSelector((state) => state.isDarker);
    const [menu, setMenu] = useState(false);

    const groupName = useSelector((state) => state.groupUser?.name);
    const chatType = useSelector((state) => state.chatType);
    const dispatch = useDispatch()

    const [deleteMsgOfChatroom] = useMutation(DELETE_MSG_OF_CHATROOM, {
        onCompleted: () => {
            console.log("Chats Deleted Successfully");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    async function handleDeleteChats() {
        await deleteMsgOfChatroom({ variables: { senderId, recieverId } });
        setMenu(false);
        dispatch(setDeleteChat(true));
    }

    function handleToggleMenu() {
        setMenu((prevMenu) => {
            const newMenu = !prevMenu;
            if (newMenu) {
                setTimeout(() => setMenu(false), 3000);
            }
            return newMenu;
        });
    }

    return (
        <div className={`chatbox-nav grid-20-73-7-col ${isDarker ? 'isDarkMode' : 'isLightMode'}`}>
            <div className={`chatbox-nav__dp flex-center ${isDarker ? 'isDarkMode' : 'isLightMode'}`}>
                <img className="h-12 cursor-pointer bg-slate-800 rounded-full" src={logo} alt="Logo" />
            </div>
            <div className={`chatbox-nav__name flex items-center font-bold text-3xl ${isDarker ? 'isDarkMode' : 'isLightMode'}`}>
                {chatType === "group" ? groupName : recieverName}
            </div>
            <div className={`chatbox-nav__menu flex-center relative ${isDarker ? 'isDarkMode' : 'isLightMode'}`}>
                {chatType === "group" && (
                    <svg
                        onClick={handleNavGroup}
                        className="cursor-pointer active:scale-95 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 -960 960 960"
                        width="48px"
                        fill="#FFFFFF"
                    >
                        <path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108Z" />
                    </svg>
                )}
                {chatType === "single" && (
                    <svg
                        className="cursor-pointer active:scale-95 h-7 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        width="3rem"
                        height="3rem"
                        fill="#FFFFFF"
                        aria-label="Menu"
                        onClick={handleToggleMenu}
                    >
                        <path d="M480.61-126q-24.61 0-42.11-17.37-17.5-17.38-17.5-41.77 0-23.46 17.3-41.66 17.3-18.2 41.59-18.2Q505-245 522-226.78q17 18.21 17 42 0 23.78-16.89 41.28-16.9 17.5-41.5 17.5Zm0-295q-24.61 0-42.11-17.3T421-479.89Q421-505 438.3-522t41.59-17Q505-539 522-522.11q17 16.9 17 41.5 0 24.61-16.89 42.11-16.9 17.5-41.5 17.5Zm0-294q-24.61 0-42.11-17.68-17.5-17.67-17.5-42.5 0-24.82 17.3-42.32t41.59-17.5Q505-835 522-817.36t17 42.47q0 24.82-16.89 42.35-16.9 17.54-41.5 17.54Z" />
                    </svg>
                )}

                {menu && (
                    <div className="dropdown-menu bg-slate-400 rounded-lg px-4 py-2 border absolute right-10 top-1/2 shadow-md">
                        <option className="cursor-pointer active:scale-[0.95]" onClick={handleDeleteChats}>
                            Clear Chats
                        </option>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBox_Nav;
