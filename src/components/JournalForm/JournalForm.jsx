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
            <input type='text' name='title' className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`} />
            <input type='date' name='date' className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`} />
            <input type='text' name='tag' />
            <textarea name='text' className={`${styles['input']} ${formValidState.text ? '' : styles['invalid']}`}></textarea>
            <Button text='Сохранить' />
        </form>
    );
};

export default JournalForm;