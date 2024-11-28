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
        <div className={`infoBox_body flex-center flex-col h-[32rem] pb-4 ${isDarker ? "bg-slate-600" : "bg-slate-300"}`}>

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
                className="fixed bottom-4 right-[25%] bg-green-600 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFFFFF"
            >
                <path d="M480-520q42 0 71-29.5t29-71.5q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71.5t71 29.5Zm-300 300q-42 0-71-29t-29-71v-34q0-25 12-46.5t35-33.5q51-25 104.5-38.5T480-480q70 0 123.5 13.5T708-428q23 11 35.5 33.5T756-348v34q0 42-29.5 71T656-240H180Z" />
            </svg>
        </div>
    );
};

export default InfoBox_Body;
