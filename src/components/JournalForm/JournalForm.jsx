import styles from './JournalForm.module.css';
import React, {useEffect, useReducer} from "react";
import Button from "../Button/Button.jsx";
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyForSubmit, values } = formState;

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            timerId = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALIDITY' });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyForSubmit) {
            onSubmit(values);
        }
    }, [isFormReadyForSubmit]);

    const addJournalItem = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

        dispatchForm({ type: 'SUBMIT', payload: formProps });
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div>
                <input type='text' name='title' className={`${styles['input-title']} ${isValid.title ? '' : styles['invalid']}`} />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='date' className={styles['form-label']}>
                    <img src='/calendarIcon.png' alt='Иконка календаря' />
                    <span>Дата</span>
                </label>
                <input type='date' name='date' id='date' className={`${styles['input']} ${isValid.date ? '' : styles['invalid']}`} />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='tag' className={styles['form-label']}>
                    <img src='/folderIcon.png' alt='Иконка метки' />
                    <span>Метки</span>
                </label>
                <input type='text' id='tag' name='tag' className={styles['input']} />
            </div>
            <textarea name='text' className={`${styles['input']} ${isValid.text ? '' : styles['invalid']}`}></textarea>
            <Button text='Сохранить' />
        </form>
    );
};

export default JournalForm;