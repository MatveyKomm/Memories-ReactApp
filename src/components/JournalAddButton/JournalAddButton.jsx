import './JournalAddButton.css';
import CardButton from "../CardButton/CardButton.jsx";

function JournalAddButton() {

    return (
        <CardButton className='journal-add'>
            <img src='/addPicture.png' alt='Иконка добавления воспоминания' />
            Новое воспоминание
        </CardButton>
    );
};

export default JournalAddButton;