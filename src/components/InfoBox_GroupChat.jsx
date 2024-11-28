import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroupUser } from "../redux/slices/groupUser";
import { setChatType } from "../redux/slices/chatType";
import { useMutation, gql } from "@apollo/client";


const GET_ALL_IN_GROUP = gql`
  mutation InGroup($adminId: String!, $userIds: [ID]!, $groupName: String!) {
    inGroup(adminId: $adminId, userIds: $userIds, groupName: $groupName) {
      name
      id
      adminId
      users {
        id
        fullName
      }
    }
  }
`;

const InfoBox_GroupChat = ({ group }) => {
  const dispatch = useDispatch();
  const isDarker = useSelector((state) => state.isDarker);

  const [inGroup] = useMutation(GET_ALL_IN_GROUP, {
    onCompleted: (data) => {
      console.log("Group fetched successfully:");

    },
    onError: (err) => {
      console.error("Error creating group:", err);
    },
  });


  async function handleGroupOnClick() {

    try {
      const { data: groupData } = await inGroup({
        variables: {
          adminId: group?.adminId,
          userIds: group?.users.map((member) => member?.id),
          groupName: group?.name,
        },
      });


      // Update Redux state with selected group details
      dispatch(setGroupUser(groupData.inGroup));
      dispatch(setChatType("group"));

    } catch (err) {
      console.error("Error handling group click:", err);
    }
  }



  return (
    <div
      className="w-[95%] flex justify-center gap-2 select-none"
      onClick={handleGroupOnClick}
    >
      <div
        className={`infoBox_body_groupChat_name rounded-lg w-full font-bold text-center p-2 cursor-pointer active:scale-[0.98] ${isDarker ? "bg-slate-100 text-black" : "isDarkMode"
          }`}
      >
        {group?.name || "Anonymous"}
      </div>
      <svg
        className="rounded-full px-2 bg-gray-700 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="#FFFFFF"
      >
        <path d="M51-404q-26-43-38.5-86.5T0-576q0-110 77-187t187-77q63 0 119.5 26t96.5 71q40-45 96.5-71T696-840q110 0 187 77t77 187q0 42-12.5 85T909-405q-10-12-22.5-20.5T860-440q20-35 30-69t10-67q0-85-59.5-144.5T696-780q-55 0-108.5 32.5T480-649q-54-66-107.5-98.5T264-780q-85 0-144.5 59.5T60-576q0 33 10 67t30 69q-14 6-26.5 15T51-404ZM0-80v-53q0-39 42-63t108-24q13 0 24 .5t22 2.5q-8 17-12 34.5t-4 37.5v65H0Zm240 0v-65q0-65 66.5-105T480-290q108 0 174 40t66 105v65H240Zm540 0v-65q0-20-3.5-37.5T765-217q11-2 22-2.5t23-.5q67 0 108.5 24t41.5 63v53H780ZM480-230q-80 0-130 24t-50 61v5h360v-6q0-36-49.5-60T480-230Zm-330-20q-29 0-49.5-20.5T80-320q0-29 20.5-49.5T150-390q29 0 49.5 20.5T220-320q0 29-20.5 49.5T150-250Zm660 0q-29 0-49.5-20.5T740-320q0-29 20.5-49.5T810-390q29 0 49.5 20.5T880-320q0 29-20.5 49.5T810-250Zm-330-70q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-440q0 50-34.5 85T480-320Zm0-180q-25 0-42.5 17T420-440q0 25 17.5 42.5T480-380q26 0 43-17.5t17-42.5q0-26-17-43t-43-17Zm0 60Zm0 300Z" />
      </svg>
    </div>
  );
};

export default InfoBox_GroupChat;
