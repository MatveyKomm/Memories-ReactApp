import "./Button.css";
import { useState } from "react";

function Button() {
    const [text, setText] = useState('Сохранить');

    const onClickHandler = () => {
        setText('Закрыть');
    };

    return (
        <button onClick={onClickHandler} className="button accent">{text}</button>
    )
};

export default Button;