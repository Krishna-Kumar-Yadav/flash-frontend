import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdateGroup } from "../redux/slices/updateGroup";
import { setGroupUser } from "../redux/slices/groupUser";

const DELETE_GROUP = gql`
  mutation DeleteGroup($groupName: String!) {
    deleteGroup(groupName: $groupName) {
      success
    }
  }
`;

const DELETE_USER_FROM_GROUP = gql`
  mutation DeleteUserFromGroup($groupName: String!, $userId: String!) {
    deleteUserFromGroup(groupName: $groupName, userId: $userId) {
      success
    }
  }
`;

const ChatBox_Nav_groupMembers = ({ handleNavGroup }) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.currentUser?.data?.id);
  const group = useSelector((state) => state.groupUser);
  const adminId = group?.adminId;

  const [deleteGroup] = useMutation(DELETE_GROUP);
  const [deleteUserFromGroup] = useMutation(DELETE_USER_FROM_GROUP);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleOnDeleteGroup() {
    setLoading(true);
    setError(null);

    const isConfirmed = window.confirm("Are you sure you want to delete the group?");
    if (!isConfirmed) return;

    try {
      const { data } = await deleteGroup({ variables: { groupName: group?.name } });
      if (data?.deleteGroup?.success) {
        window.location.reload();
      }
    } catch (err) {
      setError("Failed to delete group.");
    } finally {
      setLoading(false);
    }
  }

  function handleOnUpdate() {
    dispatch(toggleUpdateGroup());
  }

  async function handleOnDeleteUserFromGroup(id) {
    setLoading(true);
    setError(null);

    const isConfirmed = window.confirm("Are you sure you want to leave from group?");
    if (!isConfirmed) return;

    try {
      const { data } = await deleteUserFromGroup({
        variables: {
          groupName: group.name,
          userId: id,
        },
      });

      if (data?.deleteUserFromGroup?.success) {
        const updatedUsers = {
          name: group.name,
          adminId: group.adminId,
          users: group.users.filter((member) => member.id !== id)
        }


        dispatch(setGroupUser(updatedUsers));

        if (updatedUsers.users.length < 2) {
          alert("Group has less than 2 members. It will now be deleted.");
          await handleOnDeleteGroup();
        }

      }




    } catch (err) {
      setError("Failed to remove user from group.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid-10-80-10 w-full mr-2 rounded-lg bg-slate-200 p-2 h-[27.42rem]">
      <div className="flex items-center justify-end gap-2 py-2">
        <h1 className="mr-[80%] shadow-lg">Members</h1>
        <svg
          onClick={() => {
            handleOnDeleteUserFromGroup(currentId);
            window.location.reload();
          }}
          className="cursor-pointer active:scale-[0.95]"
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#999999"
        >
          <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
        </svg>
        <svg
          onClick={handleNavGroup}
          className="cursor-pointer active:scale-[0.95]"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#BB271A"
        >
          <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        </svg>
      </div>
      <div className="border border-cyan-900 rounded-lg overflow-y-scroll flex flex-col items-center p-4 gap-3">
        {group.users.map((member) => (
          <div className="flex items-center w-full" key={member.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#000000"
            >
              <path d="M226-262q59-39.67 121-60.83Q409-344 480-344t133.33 21.17q62.34 21.16 121.34 60.83 41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM479.73-80q-83.1 0-156.18-31.5-73.09-31.5-127.15-85.83-54.07-54.34-85.23-127.23Q80-397.45 80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.33 709-143 635.91-111.5 562.83-80 479.73-80Z" />
            </svg>
            <div className="px-4 rounded-lg w-full ml-3 h-max p-1 shadow-xl text-2xl font-bold flex">
              <p className="w-full">{member?.fullName}</p>
              {adminId === member.id && (
                <p className="select-none text-xs p-2 text-green-500">Admin</p>
              )}
            </div>
            {currentId === adminId && currentId !== member?.id && (
              <svg
                onClick={() => handleOnDeleteUserFromGroup(member.id)}
                className="cursor-pointer active:scale-[0.95]"
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#EA3323"
              >
                <path d="M267.33-120q-27 0-46.83-19.83-19.83-19.84-19.83-46.84V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm97.34-150.67h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386Z" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {currentId === adminId && (
        <div className="flex-center gap-32 select-none pt-2">
          <p
            onClick={handleOnUpdate}
            className="isDarkMode px-4 py-2 rounded-lg cursor-pointer active:scale-[0.95]"
          >
            Update Group
          </p>
          <p
            onClick={handleOnDeleteGroup}
            className="bg-red-400 px-4 py-2 rounded-lg cursor-pointer active:scale-[0.95]"
          >
            Delete Group
          </p>
        </div>
      )}
      {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ChatBox_Nav_groupMembers;
