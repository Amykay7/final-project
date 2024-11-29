const express = require('express');
const router = express.Router();

// Importing the controller functions
const plannerController = require('../controllers/plannerController');

// Route for adding a meal to the weekly planner
router.post('/add-meal', plannerController.addMeal);

// Route for retrieving the entire weekly plan
router.get('/weekly-plan', plannerController.getWeeklyPlan);

// Route for adding an item to the shopping list
router.post('/add-item', plannerController.addItem);

// Route for retrieving the shopping list
router.get('/shopping-list', plannerController.getShoppingList);

// Route for deleting an item from the shopping list
router.delete('/delete-item/:itemName', plannerController.deleteItem);

// Route for deleting a meal from the weekly planner
router.delete('/delete-meal/:day', plannerController.deleteMeal);

module.exports = router;
