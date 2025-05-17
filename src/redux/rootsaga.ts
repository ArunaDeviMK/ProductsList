import countSaga from "./saga.ts";
import {all} from 'redux-saga/effects'
export default function* rootSagaCount(){
    yield all([countSaga()])
}