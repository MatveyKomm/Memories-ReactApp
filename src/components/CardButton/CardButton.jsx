import './CardButton.css';

function CardButton({ children }) {
    const onClickHandler = () => {

    };

    return (
        <button onClick={onClickHandler} className='card-button'>{children}</button>
    );
};

export default CardButton;
