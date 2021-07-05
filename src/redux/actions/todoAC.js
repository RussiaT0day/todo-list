import {ADD_TODO,  DELETE_TODO, DOWNLOAD_TODO,EDIT_TODO } from "../types/todoType";
// import axios from 'axios';


export const downloadTodo = (data) => {
    return {
        type: DOWNLOAD_TODO,
        payload: data
    }
};


export const editToto = (data) => {
    return {
        type: EDIT_TODO,
        payload: data
    }
};


export const addTodo  = (data) =>{
    return {
        type: ADD_TODO,
        payload: data
    }
}




export const deleteTodo = (data) => {
    console.log('data', data);
    return {
        type: DELETE_TODO,
        payload: data,
    }
};


// const getDataMoneyThunk = () => async (dispatch) => {
//     const money = await axios("https://www.cbr-xml-daily.ru/daily_json.js");
//     let data = money.data.Valute
//     dispatch(getDataMoney(data))
// }


// export {getTodo, addTodo , removeTodo, deleteTodo }