import react, {useState} from 'react';

const Setting = () => {
 const [vibrationEnable,setVibrationEnable] = useState(0);
 const handleVibrationClick=()=>{
  localstorage.setItem(!vibrationEnable);
  setVibrationEnable(! vibrationEnable);
 }
 return (<div>
   <p>Global</p>
   <hr />
   <ul className="flex flex-col gap-2 p-4">
    <li className="flex gap-4 justify-between">
      <p>Vibration</p>
      <p className=" cursor-pointer text-blue-400" onClick={handleVibrationClick}>{vibrationEnable}</p>
    </li>
   </ul>
 </div>)
}

export default Setting;