import { useState } from "react";
import { useSelector } from "react-redux";

const InfoBox_Group_Add = ({ users, group }) => {
  const [usersId, setUsersId] = useState([]);
  const [groupName, setGroupName] = useState("");
  const admin = useSelector((state) => state.currentUser?.data);
  const currentUserId = admin?.id;

  function handleInput(e) {
    setGroupName(e.target.value);
  }

  function handleAddUser(currentUser) {
    if (!usersId.some((user) => user.id === currentUser.id)) {
      setUsersId((prev) => [...prev, { id: currentUser.id, fullName: currentUser.fullName }]);
    }
  }

  function handleRemoveUser(currentUser) {
    setUsersId((prev) => prev.filter((user) => user.id !== currentUser.id));
  }

  function handleGroup() {
    if (groupName === "") {
      alert("Group Name is mandatory");
      return;
    }

    const selectedUsers = usersId.map((user) => ({
      id: user.id,
      fullName: user.fullName,
    }));

    group((prev) => [
      ...prev,
      {
        name: groupName,
        adminId: currentUserId,
        users: [admin, ...selectedUsers],
      },
    ]);

    setGroupName("");
    setUsersId([]);
  }

  return (
    <div className=" w-full h-full p-2 gap-3 overflow-hidden">
      <div className="infoBox_group_addBox flex py-2">
        <input
          value={groupName}
          onChange={handleInput}
          className="outline-none text-black px-4 rounded-lg"
          type="text"
          placeholder="Group Name"
        />
        <button
          onClick={handleGroup}
          className="bg-green-500 rounded-lg ml-3 px-4 border active:scale-[0.96]"
        >
          Create
        </button>
      </div>
      <div className="infoBox_group_addParticipants">
        <u><h3>Add Participants</h3></u>
        <div className="infoBox_group_participants overflow-y-scroll w-full h-full pr-4 pb-7">
          {users.map((user) => (
            user.id !== currentUserId && <div className="infoBox_group_participant flex mt-3 gap-2" key={user.id + "-participant"}>
              <div className="infoBox_group_participantName select-none w-full font-mono text-2xl bg-slate-500 px-4 py-2 rounded-lg">
                {user.fullName}
              </div>
              {!usersId.some((u) => u.id === user.id) ? (
                <svg
                  onClick={() => handleAddUser(user)}
                  className="cursor-pointer active:scale-[0.96]"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#75FB4C"
                >
                  <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
                </svg>
              ) : (
                <svg
                  onClick={() => handleRemoveUser(user)} // Remove the user
                  className="cursor-pointer active:scale-[0.96]"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#EA3323"
                >
                  <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoBox_Group_Add;
