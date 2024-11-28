import { useSelector } from "react-redux";
import ChatBox_Nav from "./ChatBox_Nav";
import ChatBox_Body from "./ChatBox_Body";
import ChatBox_Tool from "./ChatBox_Tool";
import ChatBox_Nav_groupMembers from "./ChatBox_Nav_groupMembers";
import { useEffect, useState } from "react";



const ChatBox = () => {
    const user = useSelector((state) => state.currentUser?.data);
    const isDarker = useSelector((state) => state.isDarker);
    const chatType = useSelector((state) => state.chatType);
    const [navGroup, setNavGroup] = useState(false)

    function handleNavGroup() {
        setNavGroup((prev) => !prev)
    }

    return (
        <div className={`chatBox  grid-15-75-10 h-full   border-r-4 ${isDarker ? 'bg-slate-700 border-r-black' : 'bg-sky-100 border-r-gray-50'}`}>
            <ChatBox_Nav currentUser={user} handleNavGroup={handleNavGroup} />
            {!navGroup && <ChatBox_Body currentUser={user} />}
            {navGroup && <ChatBox_Nav_groupMembers handleNavGroup={handleNavGroup} />}
            <ChatBox_Tool />

        </div>
    );
}

export default ChatBox;