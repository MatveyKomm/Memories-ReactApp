import styles from './JournalForm.module.css';
import React, {useState} from "react";
import Button from "../Button/Button.jsx";

function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        text: true,
        date: true
    });

    const addJournalItem = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

        let isFormValid = true;
        if (!formProps.title?.trim().length) {
            setFormValidState(oldState => ({...oldState, title: false}));
            isFormValid = false;
        } else {
            setFormValidState(oldState => ({...oldState, title: true}));
            isFormValid = true;
        }
        if (!formProps.text?.trim().length) {
            setFormValidState(oldState => ({...oldState, text: false}));
            isFormValid = false;
        } else {
            setFormValidState(oldState => ({...oldState, text: true}));
            isFormValid = true;
        }
        if (!formProps.date) {
            setFormValidState(oldState => ({...oldState, date: false}));
            isFormValid = false;
        } else {
            setFormValidState(oldState => ({...oldState, date: true}));
            isFormValid = true;
        }

        if (!isFormValid) {
            return
        }

        onSubmit(formProps);
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div>
                <input type='text' name='title' className={`${styles['input-title']} ${formValidState.title ? '' : styles['invalid']}`} />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='date' className={styles['form-label']}>
                    <img src='/calendarIcon.png' alt='Иконка календаря' />
                    <span>Дата</span>
                </label>
                <input type='date' name='date' id='date' className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`} />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='tag' className={styles['form-label']}>
                    <img src='/folderIcon.png' alt='Иконка метки' />
                    <span>Метки</span>
                </label>
                <input type='text' id='tag' name='tag' className={styles['input']} />
            </div>
            <textarea name='text' className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}></textarea>
            <Button text='Сохранить' />
        </form>
    );
};

export default JournalForm;