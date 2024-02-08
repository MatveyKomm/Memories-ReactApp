import './JournalList.css';
import JournalItem from "../JournalItem/JournalItem.jsx";
import CardButton from "../CardButton/CardButton.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/user.context.jsx";

function JournalList({ items }) {
    const { userId } = useContext(UserContext);

    if (items.length === 0) {
        return <p>Записей пока нет, создайте новую</p>;
    }

    const sortItems = (a, b) => {
        return b.date - a.date;
    };

    return <>
        {items.filter(el => el.userId === userId).sort(sortItems).map(el => (
            <CardButton key={el.id}>
                <JournalItem
                    title={el.title}
                    text={el.text}
                    date={el.date}
                />
            </CardButton>
        ))}
    </>;
};

export default JournalList;