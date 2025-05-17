import { PayloadAction } from '@reduxjs/toolkit';
import {add,dec,clr,increment,decrement,clear} from './slice.ts'
import {put,takeEvery} from 'redux-saga/effects'

function* handleAdd(action: PayloadAction<number>){
    yield put(increment(action.payload))
}

function* handleDecrement(action: PayloadAction<number>){
    yield put(decrement(action.payload))
}

function* handleClear(){
    yield put(clear());
}

export default function* countSaga(){
    yield takeEvery(add.type,handleAdd);
    yield takeEvery(dec.type,handleDecrement);
    yield takeEvery(clr.type,handleClear)
}