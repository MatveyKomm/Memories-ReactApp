import styles from './JournalForm.module.css';
import React, {useContext, useEffect, useReducer, useRef} from "react";
import Button from '../Button/Button.jsx';
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from "../../context/user.context.jsx";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyForSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();
    const { userId } = useContext(UserContext);

    const focusError = (isValid) => {
        switch(true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { ...data }
        });
    }, [data]);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            focusError(isValid);
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
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({
                type: 'SET_VALUE',
                payload: { userId }
            });
        }
    }, [isFormReadyForSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { userId }
        });
    }, [userId]);

    const onChangeHandler = (event) => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: {
                [event.target.name]: event.target.value
            }
        });
    };

    const addJournalItem = (event) => {
        event.preventDefault()
        dispatchForm({ type: 'SUBMIT' });
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({
            type: 'SET_VALUE',
            payload: { userId }
        });
    };

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['form-row']}>
                <Input type='text' ref={titleRef} onChange={onChangeHandler} value={values.title} name='title'
                       isValid={isValid.title} appearance='title'/>
                {data.id &&<button className={styles['delete']} type='button' onClick={deleteJournalItem}>
                    <img src='/deleteIcon.svg' alt='Иконка удаления' />
                </button>}
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='date' className={styles['form-label']}>
                    <img src='/calendarIcon.png' alt='Иконка календаря'/>
                    <span>Дата</span>
                </label>
                <Input type='date' ref={dateRef} onChange={onChangeHandler} value={values.date ? new Date(values.date).toISOString().slice(1, 10) : ''} name='date' id='date'
                       isValid={isValid.date}/>
            </div>
            <div className={styles['form-row']}>
                <label htmlFor='tag' className={styles['form-label']}>
                    <img src='/folderIcon.png' alt='Иконка метки'/>
                    <span>Метки</span>
                </label>
                <input type='text' onChange={onChangeHandler} value={values.tag} id='tag' name='tag'
                       className={styles['input']}/>
            </div>
            <textarea name='text' ref={textRef} onChange={onChangeHandler} value={values.text} isValid={isValid.text}
                      className={`${styles['input']} ${isValid.text ? '' : styles['invalid']}`}>
            </textarea>
            <Button text='Сохранить'/>
        </form>
    );
};

export default JournalForm;