import React from "react";
import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import {useLocalStorage} from "./hooks/use-localstorage.hooks.js";

function mapItems(items) {
    if (!items) {
        return [];
    }

    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}

function App() {
    const [items, setItems] = useLocalStorage('data');

    const addItemHandler = item => {
        setItems([...mapItems(items), {
            text: item.text,
            title: item.title,
            date: new Date(item.date),
            // Добавляем уникальный айдишник для избежания перерендера
            id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
        }]);
    };

    return (
        <div className='app'>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={mapItems(items)} />
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItemHandler} />
            </Body>
        </div>
    );
}

export default App;


// [{
//     "id": 1,
//     "title": "Подготовка к обновлению курсов",
//     "text": "Горное походы открывают красивые виды",
//     "date": "2024/03/01"
// },
// {
//     "id": 2,
//     "title": "Поход в горы",
//     "text": "Думал что очень много времени",
//     "date": "2024/03/01"
// }]
