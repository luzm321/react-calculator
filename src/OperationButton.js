import { ACTIONS } from "./App";

// Passing dispatch (to call reducer) and operation as props:
const OperationButton = ({ dispatch, operation }) => {
    return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
                {operation}
           </button>
};

export default OperationButton;