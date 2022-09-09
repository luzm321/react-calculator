import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';

// Global variable:
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

//function manages all states in component, accepts state and actions
const reducer = (state, { type, payload }) => {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}` // payload is passed to reducer method
      }
  }
};

const App = () => {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  //dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})
  return (
    <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span">AC</button>
        <button>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span">=</button>
    </div>
  );
};

export default App;
