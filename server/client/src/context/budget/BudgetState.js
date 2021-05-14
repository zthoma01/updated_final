import React, { useReducer } from 'react';
import uuid from 'uuid';
import BudgetContext from './budgetContext';
import budgetReducer from './budgetReducer';
import {
    ADD_BUDGET,
    DELETE_BUDGET,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BUDGET,
    FILTER_BUDGETS,
    CLEAR_FILTER
} from '../types';

const BudgetState = props => {
    const initialState = {
        budgets: [
            {
                id: 1,
                name: 'Housing',
                email: 'house@yahoo.com',
                website: 'massHousing.com'
            },
            {
                id: 2,
                name: 'Canibis',
                email: 'ccb@mass.gov',
                website: 'stoned.com'
            },
            {
                id: 3,
                name: 'Food',
                email: 'nomnomnom@eat.com',
                website: 'snickers.com'
            }
        ]
    };

    const [state, dispatch] = useReducer(budgetReducer, initialState);

    // Add Budget
    
    // Delete Budget

    // Set Current Budget

    // Clear Current Budget

    // Update Budget

    // Filter Budgets

    // Clear Filter

    return (
        <BudgetContext.Provider
            value= {{
                budgets : state.budgets
            }}
        >
            { props.children}
        </BudgetContext.Provider>
    )
};

export default BudgetState;