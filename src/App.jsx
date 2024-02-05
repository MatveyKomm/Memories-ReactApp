import React from "react";
import { useState } from "react";
import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";

const INITIAL_DATA = [
    // {
    //     id: 1,
    //     title: 'Подготовка к обновлению курсов',
    //     text: 'Горное походы открывают красивые виды',
    //     date: new Date()
    // },
    // {
    //     id: 2,
    //     title: 'Поход в горы',
    //     text: 'Думал что очень много времени',
    //     date: new Date()
    // },
];

function App() {

    const [items, setItems] = useState(INITIAL_DATA);

    const addItemHandler = item => {
        setItems(oldItems => [...oldItems, {
            text: item.text,
            title: item.title,
            date: new Date(item.date),
            // Добавляем уникальный айдишник для избежания перерендера
            id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
        }]);
    };

    return (
        <div className='app'>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={items} />
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItemHandler} />
            </Body>
        </div>
    );
}

export default App;
