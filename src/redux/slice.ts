import {createSlice, PayloadAction} from '@reduxjs/toolkit'
const countSlice=createSlice({
    name:"counting",
    initialState:{
        cnt:0,
        verified:[] as number[],
    },
    reducers:{
        add: (state, _action: PayloadAction<number>) => state,
dec: (state, _action: PayloadAction<number>) => state,
clr: (state, _action: PayloadAction<number>) => state,

        increment:(state, action: PayloadAction<number>)=>{
            state.cnt+=1;
            state.verified.push(action.payload)
        },
        decrement:(state,action: PayloadAction<number>)=>{
            state.cnt-=1;
            let filterred=state.verified.filter(id=>id!==action.payload)
            state.verified=filterred;
        },
        clear:(state)=>{
            state.cnt=0
            state.verified=[]
        }
    }
})

export const {add,dec,clr,increment,decrement,clear}=countSlice.actions;
export default countSlice.reducer