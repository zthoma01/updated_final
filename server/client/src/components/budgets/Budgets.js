import React, { Fragment, useContext } from 'react';
import BudgetContext from '../../context/budget/budgetContext';

const Budgets = () => {
    const budgetContext = useContext(BudgetContext);

    const { budgets } = budgetContext;
    return (
        <Fragment>
            {budgets.map(budget => (
                <h3 key={budget.id}>{budget.name}</h3>
            ))}
        </Fragment>
    )
};

export default Budgets;