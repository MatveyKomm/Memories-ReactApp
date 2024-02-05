import './CardButton.css';

function CardButton({ children, className }) {
    const cl = 'card-button' + (className ? ' '+className : '');
    const onClickHandler = () => {

    };

    return (
        <button onClick={onClickHandler} className={cl}>{children}</button>
    );
}

export default CardButton;
