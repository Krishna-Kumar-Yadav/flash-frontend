import { useSelector } from "react-redux";

const RecieveMsgBox = ({ message, handleChatDelete }) => {
    const timestamp = message.creationTime
        ? new Date(message.creationTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const isDarker = useSelector((state) => state.isDarker);
    const isFile = message.content && (message.content.startsWith("uploads/") || message.type === "file");
    const fileUrl = `${import.meta.env.VITE_SOCKET_SERVER_URL}/${message.content}`;

    const handleFileDownload = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = message.content;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className={`recieveMsgBox max-w-full w-max px-2 py-1 rounded-lg ${isDarker ? "bg-slate-500 text-black" : "bg-slate-900 text-white"
                }`}
        >
            <div
                className={`recieveMsg break-words w-28 place-content-center overflow-x-hidden font-bold p-2 rounded-lg ${isFile ? "bg-slate-400" : ""
                    }`}
            >
                {!isFile && (message.content)}
                {isFile && (
                    <div className="file-preview">
                        <iframe
                            className="h-11 rounded-lg shadow-lg m-auto overflow-hidden"
                            src={fileUrl}
                            title={message.content}
                            onLoad={(e) => {
                                e.target.style.display = "block";
                            }}
                            sandbox="allow-same-origin allow-scripts"
                        ></iframe>
                        <button
                            className="mt-2 text-sm text-blue-500 hover:underline"
                            onClick={handleFileDownload}
                        >
                            Download
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end mt-1 space-x-1">
                <div className="recieveMsgTimestamp text-[0.5rem]">{timestamp}</div>
            </div>
        </div>
    );
};

export default RecieveMsgBox;
