import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

import SendMsgBox from "./SendMsgBox";
import RecieveMsgBox from "./RecieveMsgBox";
import socket from "../services/Socket.io/socket";
import { setDeleteChat } from "../redux/slices/deleteChat";
import { useDispatch } from "react-redux";


// GraphQL query to fetch messages
const GET_ALL_MESSAGES = gql`
  query GetAllMessages($senderId: String!, $recieverId: [ID!]!, $groupName: String) {
    getAllMessages(senderId: $senderId, recieverId: $recieverId, groupName: $groupName) {
      id
      content
      chatRoomId
      senderId
      creationTime
    }
  }
`;

const GET_CHATROOM = gql`
  query GetChatRoom($senderId: String, $recieverId: String, $groupName: String) {
    getChatRoom(senderId: $senderId, recieverId: $recieverId, groupName: $groupName) {
      id
      name
    }
  }
`;

const DELETE_CHAT = gql`
    mutation DeleteChat($chatId: String!) {
        deleteChat(chatId: $chatId) {
    success
  }
}
`;

const ChatBox_Body = ({ fileMode }) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.currentUser.data);
    const recieverId = useSelector((state) => state.recieverUser.recieverId);
    const senderId = user?.id;


    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    const currentMsg = useSelector((state) => state.currentMsg);
    const isDarker = useSelector((state) => state.isDarker);
    const chatType = useSelector((state) => state.chatType);
    const group = useSelector((state) => state.groupUser);
    const currentFile = useSelector((state) => state.file);
    const deleteChat = useSelector((state) => state.deleteChat);


    const groupName = group?.name;
    const groupIds = group?.users.map((user) => user.id) || [];
    const groupRecieverIds = groupIds.filter((user) => user !== senderId);

    const formattedRecieverId = chatType === "single" ? [recieverId] : groupRecieverIds;

    // GraphQL query to fetch messages
    const { loading, error } = useQuery(GET_ALL_MESSAGES, {
        variables: {
            senderId,
            recieverId: formattedRecieverId,
            groupName: chatType === "group" ? groupName : undefined,
        },
        skip: !senderId || !formattedRecieverId.length,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            setMessages(data?.getAllMessages || []);

        },
        onError: (error) => {
            console.error("Error retrieving messages:", error);
        },
    });

    const [chatDelete] = useMutation(DELETE_CHAT);

    async function handleChatDelete(id) {

        setMessages(messages.filter((chat) => chat.id !== id))

        if (!id) return
        try {
            await chatDelete({
                variables: { chatId: id },
                onCompleted() {
                    console.log("chat deleted successfully");

                }
            })
        } catch (err) {
            console.log("error in deletion chat", err);

        }

    }


    useEffect(() => {
        if (deleteChat) setMessages([]);
        dispatch(setDeleteChat(false));
    }, [deleteChat])

    const [getChatRoom, { data }] = useLazyQuery(GET_CHATROOM);

    const handleGetChatRoom = async () => {
        await getChatRoom({
            variables: {
                senderId: chatType === "single" ? user?.id : null,
                recieverId: chatType === "single" ? recieverId : null,
                groupName: chatType === "group" ? groupName : null,
            },
        });
    };




    useEffect(() => {
        handleGetChatRoom();
    }, [groupName, recieverId]);

    // Real-time message and group notification listeners

    useEffect(() => {
        if (!socket) return;

        const handleSingleMessage = (message) => {
            if (chatType === "single" && message.senderId === recieverId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        const handleGroupMessage = (message) => {
            if (chatType === "group" && message.groupName === data?.getChatRoom.name) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        const handleJoinGroup = (group) => {

            console.log("Group added notification received:", group);
        };

        // Attach listeners
        socket.on("receiveSingleMessage", handleSingleMessage);
        socket.on("receiveGroupMessage", handleGroupMessage);
        socket.on("joinGroup", handleJoinGroup);

        // Cleanup listeners on component unmount or when socket changes
        return () => {
            socket.off("receiveSingleMessage", handleSingleMessage);
            socket.off("receiveGroupMessage", handleGroupMessage);
            socket.off("joinGroup", handleJoinGroup);
        };
    }, [socket, data, chatType, recieverId]);

    useEffect(() => {
        if (currentFile && fileMode) {
            setMessages((prevMessages) => [...prevMessages, currentFile]);
        }
    }, [currentFile])


    useEffect(() => {
        if (currentMsg) {
            setMessages((prevMessages) => [...prevMessages, currentMsg]);
        }
    }, [currentMsg]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    if (!senderId) return <div className="flex-center text-white">Please log in to see the messages.</div>;
    if (loading) return <div className="flex-center text-white">Loading messages...</div>;
    if (error) return <div className="flex-center text-white">Error loading messages: {error.message}</div>;;

    return (
        <div
            ref={chatBoxRef}
            className="chatBox_body overflow-y-scroll overflow-x-hidden h-[27.42rem] p-4 flex flex-col gap-3"
            aria-live="polite"
        >

            {messages.map((msg, index) =>

                (msg.senderId === senderId || typeof msg === "string" || ("size" in msg)) ? (
                    <SendMsgBox key={msg.id || `${index}-${msg.creationTime}`} message={msg} isDarker={isDarker} handleChatDelete={handleChatDelete} />
                ) : (
                    <RecieveMsgBox key={msg.id || `${index}-${msg.creationTime}`} message={msg} isDarker={isDarker} handleChatDelete={handleChatDelete} />
                )
            )}

        </div>
    );
};

export default ChatBox_Body;
