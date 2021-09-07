const initialState = {
    investorsList: [],
}

const investorReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'INVESTORS':
            return {
                ...state,
                ...action.payload
            }
            default:
                return state
    }
}

export default investorReducer;
