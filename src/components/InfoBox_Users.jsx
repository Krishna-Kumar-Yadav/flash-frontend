import { useDispatch, useSelector } from "react-redux";
import { setAddUser } from "../redux/slices/addUser";


const InfoBox_Users = ({ user, setClick }) => {
  const dispatch = useDispatch();
  const isDarker = useSelector((state) => state.isDarker);

  function handleAddNewUser() {

    if (user) {
      dispatch(setAddUser({ id: user.id, fullName: user.fullName }));
      setClick('chats')
    } else {
      console.log("User not found");

    }
  }


  return (
    <div className="infoBox_users   rounded-lg m-6 flex-center  select-none ">
      <div className={`infoBox_users_name w-[90%] h-full p-3 bg-slate-700 font-bold size-8 rounded-lg mr-2 shadow-2xl ${isDarker ? 'isLightMode' : 'isDarkMode'}`}>{user?.fullName}</div>
      <button onClick={handleAddNewUser} className="InfoBox_Users_addNew bg-green-800 text-center rounded-lg h-full px-4 py-2 cursor-pointer active:scale-95 text-white"> Add </button>
    </div>
  );
}

export default InfoBox_Users;