import { useState } from "react";
import { useSelector } from "react-redux";

const SendMsgBox = ({ message }) => {
    const [msgReceived, setMsgReceived] = useState(true); // Initially received status
    const isDarker = useSelector((state) => state.isDarker);

    const timestamp = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


    return (
        <div className="relative">
            <div
                className={`sendMsgBox float-right max-w-full w-max px-2 py-1 rounded-lg ${isDarker ? 'isLightMode' : 'isDarkMode'}`}
            >
                <div
                    className={`sendMsg break-words overflow-x-hidden font-bold h-full w-full px-4 py-2 rounded-lg ${message.file ? 'bg-red-700 cursor-pointer active:scale-[0.95]' : ''
                        }`}
                >
                    {message.content || message.file || message}
                    {message.file && (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                    )}
                </div>

                <div className="flex items-center justify-end mt-1 space-x-1">
                    <div className="sendMsgTimestamp text-[0.6rem]">
                        {timestamp}
                    </div>

                    <div className="msgSend">
                        {msgReceived ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#D9D9D9">
                                <path d="M293-288 100-482l50-50 143 142 51 51-51 51Zm204 0L303-482l51-51 143 143 324-324 51 51-375 375Zm0-203-51-51 172-172 51 51-172 172Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#D9D9D9">
                                <path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMsgBox;
