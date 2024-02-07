export const INITIAL_STATE = {
    isValid: {
        text: true,
        title: true,
        date: true
    },
    values: {
        text: '',
        title: '',
        date: '',
        tag: ''
    },
    isFormReadyForSubmit: false
};

export function formReducer(oldState, action) {
    switch(action.type) {
        case 'RESET_VALIDITY':
            return { ...oldState, isValid: INITIAL_STATE.isValid };
        case 'SUBMIT': {
            const textValidity = oldState.values.text?.trim().length;
            const dateValidity = oldState.values.date;
            const titleValidity = oldState.values.title?.trim().length;
            return {
                ...oldState,
                isValid: {
                    text: textValidity,
                    title: titleValidity,
                    date: dateValidity
                },
                isFormReadyForSubmit: titleValidity && dateValidity && textValidity
            };
        }
        case 'CLEAR':
            return { ...oldState, values: INITIAL_STATE.values, isFormReadyForSubmit: false };
        case 'SET_VALUE':
            return { ...oldState, values: { ...oldState.values, ...action.payload }};
    };
};
