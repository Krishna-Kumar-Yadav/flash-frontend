import { useSelector } from 'react-redux';

const FileMsgBox = ({ message }) => {
  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const isDarker = useSelector((state) => state.isDarker);
  const image = "";

  return (
    <div className={` border absolute right-2 p-2 rounded-lg shadow-2xl cursor-pointer active:scale-95 hover:bg-slate-500  font-extrabold overflow-hidden ${isDarker ? "isLightMode" : "isDarkMode"}`}>
      <iframe className="h-11 w-28 mt-1  rounded-lg shadow-lg  m-auto overflow-hidden" src={image} ></iframe>
      <div className="float-right text-xs py-1">{timestamp}</div>
    </div>
  );
}

export default FileMsgBox;