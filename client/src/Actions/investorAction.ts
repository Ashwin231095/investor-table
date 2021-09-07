const investorAction = {
    getInvestors: (data: any) => {
        return {
            type: 'INVESTORS',
            payload: {
                investorsList: data
            }
        }
    },
}

export default investorAction;
