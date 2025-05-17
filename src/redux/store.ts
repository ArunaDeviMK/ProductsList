import { configureStore } from "@reduxjs/toolkit";
import countSlice from './slice.ts';
import createSagaMiddleware from 'redux-saga';
import rootSagaCount from './rootsaga.ts';
const sagaMiddleware=createSagaMiddleware()
const store=configureStore({
    reducer:{
        counting:countSlice,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSagaCount);
export default store;