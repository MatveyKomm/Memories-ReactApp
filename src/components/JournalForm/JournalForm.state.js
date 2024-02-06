export const INITIAL_STATE = {
    isValid: {
        text: true,
        title: true,
        date: true
    },
    values: {
        text: undefined,
        title: undefined,
        date: undefined
    },
    isFormReadyForSubmit: false
};

export function formReducer(oldState, action) {
    switch(action.type) {
        case 'RESET_VALIDITY':
            return { ...oldState, isValid: INITIAL_STATE.isValid };
        case 'SUBMIT': {
            const textValidity = action.payload.text?.trim().length;
            const dateValidity = action.payload.date;
            const titleValidity = action.payload.title?.trim().length;
            return {
                values: action.payload,
                isValid: {
                    text: textValidity,
                    title: titleValidity,
                    date: dateValidity
                },
                isFormReadyForSubmit: titleValidity && dateValidity && textValidity
            };
        }
    };
};
