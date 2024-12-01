import { useEffect, useState } from "react";
import FileViewer from "./FileViewer";
import { useMutation, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import socket from "../services/Socket.io/socket";
import { setCurrentMsg } from "../redux/slices/currentMsg";
import axios from 'axios';
import { setCurrentFile } from "../redux/slices/currentFile";


const SEND_MSG = gql`
  mutation SendMsg($senderId: String!, $recieverId: [ID!]!, $content: String!, $groupName: String) {
  sendMsg(senderId: $senderId, recieverId: $recieverId, content: $content, groupName: $groupName) {
    id
    content
    chatRoomId
    senderId
    creationTime
  }
}
`;

const ChatBox_Tool = ({ setFileMode }) => {
    const isDarker = useSelector((state) => state.isDarker);
    const chatType = useSelector((state) => state.chatType);
    const user = useSelector((state) => state.currentUser.data);
    const senderId = user?.id;
    const recieverId = useSelector((state) => state.recieverUser.recieverId);
    const group = useSelector((state) => state.groupUser);
    const currentFile = useSelector((state) => state.file)


    const groupName = group?.name;
    const groupIds = group?.users.map((user) => user.id) || [];
    const groupRecieverIds = groupIds.filter((user) => user !== senderId);




    const [view, setView] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();

    const [sendMsg] = useMutation(SEND_MSG, {
        onCompleted: (data) => {
            console.log("Message sent successfully:");
            setMessage("");
        },
        onError: (error) => {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        },
    });

    useEffect(() => {
        if (senderId) {
            socket.emit("register", senderId);
        }
        return () => {
            socket.off("register");
        };
    }, [senderId]);



    const handleMsgSend = (e) => {
        const msg = e.target.value;
        setMessage(msg);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
        dispatch(setCurrentFile({
            content: `uploads/${file.name}`,
            type: file.type,
            lastModified: file.lastModified,
            size: file.size
        }));
        setView(false);
    };


    const handleSubmitBtn = async (e) => {
        e.preventDefault();

        const recipientIds = chatType === "group" ? groupRecieverIds : [recieverId];


        if (message) {
            dispatch(setCurrentMsg(message))
        }

        if (!senderId) {
            alert("Sender ID is missing.");
            return;
        }
        if (!recipientIds) {
            alert("Receiver ID is missing.");
            return;
        }
        if (!message && !selectedFile) {
            alert("Message cannot be empty.");
            return;
        }

        if (!recipientIds.length) {
            alert("Receiver ID(s) missing for the selected chat type.");
            return;
        }



        try {

            const { data } = await sendMsg({
                variables: {
                    senderId,
                    recieverId: recipientIds,
                    content: selectedFile ? currentFile.content : message,
                    groupName: chatType === "group" ? groupName : undefined
                },
            });




            setMessage("");
            setSelectedFile(null);
            setView(true);


        } catch (error) {
            console.error("Error sending message:", error);
        }

        if (selectedFile) {

            const formdata = new FormData();
            formdata.append('file', selectedFile)
            const url = `${import.meta.env.VITE_SOCKET_SERVER_URL}${import.meta.env.VITE_FILE_UPLOAD}`

            const response = await axios.post(url, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
    };

    const triggerCameraInput = () => {
        setSelectedFile(null)
        document.getElementById("camera-upload").click();
    };

    const triggerFileInput = () => {
        setSelectedFile(null)
        document.getElementById("file-upload").click();
    };

    return (
        <div className="chatBox_tool ">
            <form onSubmit={handleSubmitBtn} className="bg-slate-900 flex  h-full">
                <div className="chatbox_tool-attach flex-center gap-4 px-4 py-2">
                    <div className="chatbox_tool-attach--file cursor-pointer active:scale-[0.85]" onClick={triggerFileInput}>
                        <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f6f5f4" d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" /></svg>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            onClick={() => setFileMode(true)}
                            style={{ display: 'none' }} // Hide the default file input
                        />
                    </div>
                    <div className="chatbox_tool-attach--camera cursor-pointer active:scale-95" onClick={triggerCameraInput}>
                        <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" /></svg>                        <input
                            id="camera-upload"
                            type="file"
                            onChange={handleFileChange}
                            onClick={() => setFileMode(true)}
                            accept="image/*"
                            capture="user"
                            style={{ display: 'none' }}
                        />
                    </div>

                </div>
                <div className="w-full">
                    <input
                        type="text"
                        onClick={() => setFileMode(false)}
                        value={message}
                        onChange={handleMsgSend}
                        className={`chatbox_tool-input w-full h-full size-8 px-3 outline-none ${isDarker ? 'isDarkMode' : 'isLightMode'}`}
                        placeholder="Enter the message"
                        name="chatbox_tool-input"
                    />sengMsg
                </div>

                <button type="submit" className="flex-center chatbox_tool-sendBtn p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m600-200-56-57 143-143H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760h20v80h-20q-42 0-71 29t-29 71q0 42 29 71t71 29h387L544-624l56-56 240 240-240 240Z" /></svg>
                </button>

            </form>
            {!view && <FileViewer theFile={selectedFile} handleView={() => setView(true)} handleSubmit={handleSubmitBtn} />}
        </div>
    );
};

export default ChatBox_Tool;
