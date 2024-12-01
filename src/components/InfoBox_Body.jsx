import InfoBox_GroupChat from "./InfoBox_GroupChat";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../redux/slices/loggedInUser";
import { useEffect, useState } from "react";
import InfoBox_Chats from "./InfoBox_Chats";
import InfoBox_Users from "./InfoBox_Users";
import InfoBox_Group_Add from "./InfoBox_Group_Add";
import InfoBox_GroupUpdate from "./InfoBox_GroupUpdate";

const GET_USERS = gql`
    query GetAllUsers {
        getAllUsers {
            id
            fullName
            email
            mobileNumber
            dateOfBirth
        }
    }
`;

const GET_ALL_GROUPS = gql`
    query GetAllGroup($userId: String!) {
        getAllGroup(userId: $userId) {
            id
            name
            adminId
            users {
                id
                fullName
                email
                mobileNumber
                dateOfBirth
            }
        }
    }
`;



const InfoBox_Body = ({ searchValue }) => {
    const isDarker = useSelector((state) => state.isDarker);
    const currentUser = useSelector((state) => state.currentUser.data);
    const currentUserId = currentUser?.id;
    const newUser = useSelector((state) => state.addUser);
    const updateGroup = useSelector((state) => state.updateGroup);


    const [click, setClick] = useState("chats");
    const [groups, setGroups] = useState([]);
    const [chats, setChats] = useState(
        JSON.parse(localStorage.getItem('chats')) || []
    );


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedInUser());
    }, [dispatch]);

    // Fetch Users
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USERS, {
        fetchPolicy: "cache-first",
    });

    // Fetch Groups
    const { loading: groupLoading, error: groupError } = useQuery(GET_ALL_GROUPS, {
        skip: !currentUserId,
        variables: { userId: currentUserId },
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => setGroups(data.getAllGroup),
        onError: (error) => console.error("Error fetching groups:", error),
    });

    // Add new user to chats
    useEffect(() => {
        if (newUser?.id) {
            setChats((prevChats) => {
                if (!prevChats.some((chat) => chat.id === newUser.id)) {
                    const updatedChats = [...prevChats, newUser]
                    localStorage.setItem('chats', JSON.stringify(updatedChats))
                    return updatedChats;
                }
                return prevChats;
            });
        }
    }, [newUser]);

    // Loading and error handling
    if (!currentUser) return <div className="flex-center">Loading...</div>;
    if (userLoading || groupLoading) return <p className="flex-center">Loading...</p>;
    if (userError) return <p className="flex-center">Error fetching users</p>;
    if (!userData || !userData.getAllUsers) return <p className="flex-center">No Users Found</p>;

    return (
        <div className={`infoBox_body flex-center flex-col h-[32rem] pb-4 relative ${isDarker ? "bg-slate-600" : "bg-slate-300"}`}>

            <div className="flex-center w-[95%]">

                <svg
                    onClick={() => setClick("chats")}
                    className={`w-1/2 rounded-tr-3xl rounded-tl-3xl mr-4 cursor-pointer ${click === "chats" ? "isDarkMode" : "isLightMode"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#FFFFFF"
                >
                    <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                </svg>

                <svg
                    onClick={() => setClick("groupChats")}
                    className={`w-1/2 rounded-tr-3xl rounded-tl-3xl cursor-pointer ${click === "groupChats" ? "isDarkMode" : "isLightMode"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#FFFFFF"
                >
                    <path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480-390q-79 0-129.5 23.5T300-305v5ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.35-60Q506-540 523-557.35t17-43Q540-626 522.85-643t-42.5-17q-25.35 0-42.85 17.15t-17.5 42.5q0 25.35 17.35 42.85t43 17.5ZM480-300Zm0-300Z" />
                </svg>
            </div>


            {(click === "chats" || click === "groupChats" || click === "groupCreate") && (
                <div
                    className={`infoBox_body_chatArea flex overflow-y-scroll items-center py-4 px-4 flex-col gap-4 w-[95%] h-full ${isDarker ? "isDarkMode " : "isLightMode"}`}
                >
                    {click === "chats" &&
                        chats.map((user) => user.fullName.includes(searchValue) && <InfoBox_Chats key={user.id} user={user} />)}

                    {click === "groupChats" && (
                        !updateGroup && <>
                            {groups.map((group) => (
                                <InfoBox_GroupChat group={group} key={group.id || `${group.name}-${Date.now()}`} />
                            ))}
                            <div
                                onClick={() => setClick("groupCreate")}
                                className="infoBox_group_create border px-4 py-2 w-full text-center mt-8 rounded-lg cursor-pointer"
                            >
                                Create +
                            </div>
                        </>
                    )}
                    {updateGroup && <InfoBox_GroupUpdate users={userData.getAllUsers} />}
                    {click === "groupCreate" && <InfoBox_Group_Add users={userData.getAllUsers} group={setGroups} />}
                </div>
            )}


            {click === "users" && (
                <div
                    className={`infoBox_userlist overflow-y-scroll h-full w-[95%] ${isDarker ? "isDarkMode" : "isLightMode"}`}
                >
                    {userData.getAllUsers
                        .filter((user) => user.id !== currentUser.id)
                        .map((user) => (
                            <InfoBox_Users key={user.id} user={user} setClick={setClick} />
                        ))}
                </div>
            )}



            <svg
                onClick={() => setClick("users")}
                className="absolute bottom-6 left-4 bg-green-600 cursor-pointer h-11 p-1 rounded-full"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="#ffffff" d="M224 0c17.7 0 32 14.3 32 32l0 30.1 15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49 0 70.3 61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.8 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7l0 70.3 49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15 0 30.1c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-30.1-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49 0-70.3-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3l0-70.3L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15L192 32c0-17.7 14.3-32 32-32z" />
            </svg>
        </div>
    );
};

export default InfoBox_Body;
