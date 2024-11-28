import InfoBox_Nav from './InfoBox_Nav';
import InfoBox_Body from './InfoBox_Body';
import { useState } from 'react';




const InfoBox = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="infoBox bg-zinc-300 grid-15-85">
            <InfoBox_Nav search={setSearch} />
            <InfoBox_Body searchValue={search} />

        </div>
    );
}

export default InfoBox;