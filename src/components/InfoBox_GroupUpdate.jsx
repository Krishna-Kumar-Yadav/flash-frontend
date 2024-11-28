import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";

const UPDATE_GROUP = gql`
  mutation UpdateGroup($groupName: String!, $userIds: [ID], $newGroupName: String) {
  updateGroup(groupName: $groupName, userIds: $userIds, newGroupName: $newGroupName) {
    success
  }
}
`;

const InfoBox_GroupUpdate = ({ users }) => {
  const isDarker = useSelector((state) => state.isDarker);
  const groupName = useSelector((state) => state.groupUser?.name);
  const dispatch = useDispatch()

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newGroupName, setnewGroupName] = useState(groupName)

  const [updateGroup] = useMutation(UPDATE_GROUP);

  async function handleOnSubmit() {
    await updateGroup({
      variables: {
        groupName: groupName,
        userIds: selectedUsers,
        newGroupName: newGroupName,

      },
      onCompleted() {
        alert("Group Get Updated");
        window.location.reload();
      },
      onError(err) {
        console.log(err);

      }
    })
  }



  function handleOnChange(e) {
    setnewGroupName(e.target.value);
  }

  const toggleSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="infoBox_update w-full h-full flex flex-col gap-3">
      <div>
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="Enter the new GroupName"
          defaultValue={groupName}
          className={`px-4 py-2 rounded-lg outline-none ${isDarker ? "bg-slate-600" : "bg-slate-200"
            }`}
        />
        <button onClick={handleOnSubmit} className="px-4 py-1 rounded-lg cursor-pointer active:scale-95 ml-2 bg-blue-500">Update</button>
      </div>
      <p>Add Members</p>
      <div className="members h-full">
        {users.map((user) => (
          <div key={user.id} className="flex gap-3 items-center select-none my-3">
            <div
              className="text-2xl w-full font-extrabold rounded-lg px-4 py-2 bg-slate-700 cursor-pointer active:scale-95"
              onClick={() => toggleSelect(user.id)}
            >
              {user.fullName}
            </div>
            {!selectedUsers.includes(user.id) ? (
              <svg
                className="ml-3 "
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="17.5"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#33d17a"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                />
              </svg>
            ) : (
              <svg className="ml-3 " xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path fill="#e01b24" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBox_GroupUpdate;
