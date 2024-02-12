import React from "react";
import { useState } from "react";
import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import {useLocalStorage} from "./hooks/use-localstorage.hooks.js";
import {UserContextProvider} from "./context/user.context.jsx";

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
    const [selectedItem, setSelectedItem] = useState({});

    const addItemHandler = item => {
        if (!item.id) {
            setItems([...mapItems(items), {
                ...item,
                date: new Date(item.date),
                // Добавляем уникальный айдишник для избежания перерендера
                id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
            }]);
        } else {
            setItems([...mapItems(items).map(el => {
                if (el.id === item.id) {
                    return {
                        ... item
                    }
                } else {
                    return el;
                }
            })])
        }
    };

    const deleteItem = (id) => {
        setItems([...items.filter(i => i.id !== id)]);
    };

    return (
        <UserContextProvider>
            <div className='app'>
                <LeftPanel>
                    <Header/>
                    <JournalAddButton/>
                    <JournalList items={mapItems(items)} setItem={setSelectedItem}/>
                </LeftPanel>
                <Body>
                    <JournalForm onSubmit={addItemHandler} onDelete={deleteItem} data={selectedItem}/>
                </Body>
            </div>
        </UserContextProvider>
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
