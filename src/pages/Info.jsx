import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from '../redux/slices/loggedInUser';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const DELETE_USER = gql`
    mutation DeleteUser($senderId: String!) {
        deleteUser(senderId: $senderId) {
            id
            fullName
        }
    }
`;

const Info = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sender = useSelector((state) => state.currentUser?.data);
    const senderId = sender?.id;

    const [deleteUser, { loading, error }] = useMutation(DELETE_USER);

    useEffect(() => {
        dispatch(fetchLoggedInUser());
    }, [dispatch]);


    const removeBrowserData = (name) => {
        localStorage.clear()
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate("/");
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser({ variables: { senderId: senderId } });
            removeBrowserData('token');
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    // Loading and error handling for the mutation
    if (loading) return <p className='flex-center'>Loading...</p>;
    if (error) return <p className='flex-center'>Error: {error.message}</p>;

    return (
        <div className="info bg-slate-900 h-full w-full flex-center flex-col gap-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF">
                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
            </svg>
            <div className="info_fullName border rounded-lg grid-20-80-col p-4 w-1/2">
                <label htmlFor="fullName">Full Name :</label>
                <input
                    id="fullName"
                    className="px-4 py-2 text-black rounded-lg"
                    type="text"
                    value={sender?.fullName || 'N/A'}
                    disabled
                />
            </div>
            <div className="info_mobileNumber border rounded-lg grid-20-80-col p-4 w-1/2">
                <label htmlFor="mobileNumber">Mobile : </label>
                <input
                    id="mobileNumber"
                    className="px-4 py-2 text-black rounded-lg"
                    type="text"
                    value={sender?.mobileNumber || 'N/A'}
                    disabled
                />
            </div>
            <div className="info_email border rounded-lg grid-20-80-col p-4 w-1/2">
                <label htmlFor="email">Email : </label>
                <input
                    id="email"
                    className="px-4 py-2 text-black rounded-lg"
                    type="email"
                    value={sender?.email || 'N/A'}
                    disabled
                />
            </div>
            <div className="info_dob border rounded-lg grid-20-80-col p-4 w-1/2">
                <label htmlFor="dateOfBirth">Birth Date : </label>
                <input
                    id="dateOfBirth"
                    className="px-4 py-2 text-black rounded-lg"
                    type="text"
                    value={sender?.dateOfBirth?.slice(0, 10) || 'N/A'}
                    disabled
                />
            </div>
            <div className="info_btn rounded-lg flex-center gap-8">
                <button className="bg-red-600 rounded-lg px-4 py-2 active:scale-[0.95]" onClick={handleDeleteUser}>
                    Delete Account
                </button>
                <button
                    className="bg-blue-800 rounded-lg px-4 py-2 active:scale-[0.95]"
                    onClick={() => removeBrowserData('token')}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Info;
