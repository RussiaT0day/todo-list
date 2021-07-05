import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { deleteTodo } from "../actions/todoAC";
import { ADD_TODO, DELETE_TODO, DOWNLOAD_TODO, EDIT_TODO } from "../types/todoType";

const todoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            if (Array.isArray(action.payload)) return [...state, ...action.payload];
            else return [...state, action.payload];
        case DOWNLOAD_TODO:
            return action.payload;
        case EDIT_TODO:
            // if (action.payload.position && typeof action.payload.position ==='number') {
            //     console.log(action.payload.position);
            //     let temp = state[action.payload.position]
            // }
            // console.log(action.payload);
            // delete action.payload['position']

            let record = state.filter(el => el.id === action.payload.id)[0];
            console.log(record);
            for (const key in action.payload) {
                if (action.payload[key] !== undefined && action.payload[key] !== '' ){ 
                    record[key] = action.payload[key];
                }
                
            }
            console.log('record',record);
            return state.map(el =>{ 
                if (el.id === record.id) {
                    el = record
                    return el
                }
                el.edit = false
            return el
        })
        case DELETE_TODO:
            return state.filter(el => el.id !== action.payload);
        default:
            return state;
    }
}
export default todoReducer;


