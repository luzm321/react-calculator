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
      // return current state to not make any changes in this case, thus no extra zeroes are added to calc
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state 
      }
      // ensures no additional period is added to avoid edge case scenario
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      } 
      // update state operation below
      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}` // payload is passed to reducer method
      }
    case ACTIONS.CHOOSE_OPERATION:
      // ensures that when operations are clicked, nothing happens
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      //default action:
      return {
        //take current and previous operands to calculate the operation from the evaluate method, then setting value as the prev
        //operand
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {} // return empty state to clear
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  //if prev or current operands don't exist
  if (isNaN(prev) || isNaN(current)) {
    return ""; // no calculation to perform
  };

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
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
        <button className="span" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
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
