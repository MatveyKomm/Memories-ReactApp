import {UserContext} from "../../context/user.context.jsx";
import {useContext} from "react";

function SelectUser() {
    const { userId, setUserId } = useContext(UserContext);
    const changeUser = (event) => {
        setUserId(Number(event.target.value));
    };

    return (
        <select name='user' id='user' value={userId} onChange={changeUser}>
            <option value='1'>Anton</option>
            <option value='2'>Vasya</option>
        </select>
    );
}

export default SelectUser;