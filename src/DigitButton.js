import { ACTIONS } from "./App";

// Passing dispatch (to call reducer) and digit as props:
const DigitButton = ({ dispatch, digit }) => {
    return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
                {digit}
           </button>
};

export default DigitButton;