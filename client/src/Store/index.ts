import { combineReducers } from 'redux';
import investorReducer from './investorReducer';

const rootReducer = combineReducers({
    investors: investorReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;