import { useState } from "react";
import { useSelector } from "react-redux";

const SendMsgBox = ({ message, handleChatDelete }) => {
    const [msgReceived, setMsgReceived] = useState(true);
    const isDarker = useSelector((state) => state.isDarker);
    const timestamp = message.creationTime
        ? new Date(message.creationTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const isFile = message.content && (message.content.startsWith("uploads/") || message.type === "file");
    const fileUrl = `${import.meta.env.VITE_SOCKET_SERVER_URL}/${message.content || message.name}`;

    // Handle file download
    const handleFileDownload = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = message.content;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative" >
            <div
                className={`sendMsgBox float-right max-w-full w-max px-2 py-1 rounded-lg ${isDarker ? 'isLightMode' : 'isDarkMode'}`}
            >
                <div
                    className={`sendMsg break-words overflow-x-hidden font-bold h-full w-full px-4 py-2 rounded-lg ${isFile ? 'bg-slate-200 cursor-pointer active:scale-[0.95]' : ''}`}
                >
                    {!isFile && (message.content || message || "Sending...")}

                    {isFile && (
                        <>

                            <iframe
                                className="h-11 w-28 mt-1 rounded-lg shadow-lg m-auto overflow-hidden"
                                src={fileUrl}
                                sandbox="allow-same-origin allow-scripts"
                                title="file-preview"
                            />

                            <button
                                className="mt-2 text-sm text-blue-500 hover:underline"
                                onClick={handleFileDownload}
                            >
                                Download
                            </button>
                        </>
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
