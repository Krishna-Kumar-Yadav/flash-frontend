import { useState, } from "react";
import { useSelector } from "react-redux";

import ChatBox from "../components/ChatBox";
import InfoBox from "../components/InfoBox";

const HomePage = () => {
    const reciever = useSelector((state) => state.recieverUser?.recieverId);
    const groupName = useSelector((state) => state.groupUser?.name)

    const handleDisplayMode = () => {
        setMode(prevMode => {
            const newMode = !prevMode;
            return newMode;
        });
        return !mode;
    };



    return (
        <div className="mainContainer h-full w-full  grid-70-30 overflow-hidden">
            {(reciever !== "" || groupName !== "") && <ChatBox />}
            {(reciever === "" && groupName === "") && <div className="h-full w-full flex-center bg-slate-900">
                <img src="./src/assets/images/logo.png" />
            </div>}
            <InfoBox mode={handleDisplayMode} />
        </div>
    );
}

export default HomePage