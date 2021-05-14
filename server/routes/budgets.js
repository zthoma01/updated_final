const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Budget = require('../models/Budget');

// @route   GET api/budgets
// @desc    Get all users budgets/subs
// @access  Private
router.get('/', auth, async (req, res)=>{
    // res.send('Get all followed budgets');
    try {
        const budgets = await Budget.find({ user: req.user.id }).sort({ date: -1 });
        res.json(budgets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/budgets
// @desc    Add new budget/follow
// @access  Private
router.post('/',
[
    auth, 
    [
        body('name', 'Name is required').not().isEmpty()
    ]
],
async (req, res)=>{
    // res.send('Add new budget to follow');
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, website} = req.body;

    try {
        const newBudget = new Budget({
            name,
            email,
            website,
            user: req.user.id
        });

        const budget = await newBudget.save();
        res.json(budget);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/budgets/:id
// @desc    Update a budget
// @access  Private
router.put('/:id', auth, async (req, res)=>{
    // res.send('Update a budget');
    const {name, email, website} = req.body;

    // Build budget object
    const budgetFields = {};
    if(name) budgetFields.name = name;
    if(email) budgetFields.email = email;
    if(website) budgetFields.website = website;

    try {
        let budget = await Budget.findById(req.params.id);

        if(!budget) return res.status(404).json({msg: 'budget not found'});

        // Make sure user owns budget
        if (budget.user.toString()  !== req.user.id){
            return res.status(401).json({ msg: 'Not Authorized'});
        }

        budget = await Budget.findByIdAndUpdate(req.params.id,
            { $set: budgetFields },
            { new: true}
        );

        res.json(budget)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Delete api/budgets/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', auth, async (req, res)=>{
    // res.send('Delete a followed budget');
    try {
        let budget = await Budget.findById(req.params.id);

        if(!budget) return res.status(404).json({msg: 'budget not found'});

        // Make sure user owns budget
        if (budget.user.toString()  !== req.user.id){
            return res.status(401).json({ msg: 'Not Authorized'});
        }

        await Budget.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Budget Removed'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;