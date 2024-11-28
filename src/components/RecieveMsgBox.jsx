import { useSelector } from "react-redux";

const RecieveMsgBox = ({ message }) => {
    // Use the message timestamp if available

    const timestamp = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


    const isDarker = useSelector((state) => state.isDarker);

    return (
        <div
            className={`recieveMsgBox max-w-full w-max px-2 py-1 rounded-lg flex-right ${isDarker ? "bg-slate-500 text-black" : "bg-slate-900 text-white"
                }`}
        >
            <div
                className={`recieveMsg break-words overflow-x-hidden font-bold p-2 rounded-lg ${message.file ? "bg-red-700 cursor-pointer active:scale-[0.95]" : ""
                    }`}
            >
                {message.content || (message.file && "File attached")}
                {message.file && (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                        <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                    </svg>
                )}
            </div>

            <div className="flex items-center justify-end mt-1 space-x-1">
                <div className="recieveMsgTimestamp text-[0.5rem]">{timestamp}</div>
            </div>
        </div>
    );
};

export default RecieveMsgBox;





