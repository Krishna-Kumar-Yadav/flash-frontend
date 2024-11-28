import logo from '../assets/images/bg-logo.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setColorMode } from '../redux/slices/isDarker';

const InfoBox_Nav = ({ search }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isDarker = useSelector((state) => state.isDarker);
    const sender = useSelector((state) => state.currentUser?.data)
    const senderName = sender?.fullName[0].toUpperCase()

    const [mode, setMode] = useState(true);

    useEffect(() => {
        dispatch(setColorMode(mode));
    }, [dispatch]);

    const toggleMode = () => {
        setMode(prevMode => !prevMode); // Toggle mode
        dispatch(setColorMode(!mode));  // Dispatch toggle to Redux
    };


    function onChangeSearch(e) {
        const searchVal = e.target.value.trim();
        search(searchVal)
    }

    return (
        <div className={`infoBox-nav grid-70-30 ${isDarker ? 'bg-slate-600' : 'bg-slate-300'}`}>
            <div className="infoBox-body_search flex-center flex-row pl-2">
                <input
                    onChange={onChangeSearch}
                    type="text"
                    placeholder="Search For Chats"
                    className={`infoBox-body--search--input p-3 size-10 w-full outline-none rounded-tl-lg rounded-bl-lg ${isDarker ? 'isLightMode' : 'bg-slate-800 text-white'}`}
                />
                <svg className={`infoBox-body_search_btn rounded-tr-lg rounded-br-lg p-2 cursor-pointer active:scale-[0.95] ${isDarker ? 'bg-slate-700' : 'bg-slate-400'}`} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                    <path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z" />
                </svg>
            </div>
            <div className="infoBox-nav_setting h-full flex-center px-3 gap-3">

                {!isDarker && <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleMode} className="cursor-pointer active:scale-[0.85]" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q10 0 20.5.67 10.5.66 24.17 2-37.67 31-59.17 77.83T444-660q0 90 63 153t153 63q53 0 99.67-20.5 46.66-20.5 77.66-56.17 1.34 12.34 2 21.84.67 9.5.67 18.83 0 150-105 255T480-120Zm0-66.67q102 0 179.33-61.16Q736.67-309 760.67-395.67q-23.34 9-49.11 13.67-25.78 4.67-51.56 4.67-117.46 0-200.06-82.61-82.61-82.6-82.61-200.06 0-22.67 4.34-47.67 4.33-25 14.66-55-91.33 28.67-150.5 107-59.16 78.34-59.16 175.67 0 122 85.66 207.67Q358-186.67 480-186.67Zm-6-288Z" /></svg>}
                {isDarker && <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleMode} className="cursor-pointer active:scale-[0.85]" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M480-346.67q55.33 0 94.33-39t39-94.33q0-55.33-39-94.33t-94.33-39q-55.33 0-94.33 39t-39 94.33q0 55.33 39 94.33t94.33 39Zm0 66.67q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-446.67H40v-66.66h160v66.66Zm720 0H760v-66.66h160v66.66ZM446.67-760v-160h66.66v160h-66.66Zm0 720v-160h66.66v160h-66.66ZM260-655.33l-100.33-97 47.66-49 96 100-43.33 46Zm493.33 496-97.66-100.34 45-45.66 99.66 97.66-47 48.34Zm-98.66-541.34 97.66-99.66 49 47L702-656l-47.33-44.67ZM159.33-207.33 259-305l46.33 45.67-97.66 99.66-48.34-47.66ZM480-480Z" /></svg>}
                <div className={`infoBox-nav_admin w-12 h-12 text-[2rem] text-center select-none font-bold  rounded-full cursor-pointer active:scale-[0.85] ${isDarker ? 'bg-slate-200 text-blue-600' : 'bg-slate-800 text-white'}`} onClick={() => navigate("/info")}> {senderName}</div>

            </div>
        </div>
    );

}

export default InfoBox_Nav;