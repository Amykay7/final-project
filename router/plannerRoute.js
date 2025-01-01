const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Route to add a meal to the weekly planner
router.post('/api/planner/meal', plannerController.addMeal);

// Route to get the weekly planner
router.get('/api/planner/weeklymeal', plannerController.getWeeklyPlan);

// Route to add an item to the shopping list
router.post('/api/planner/item', plannerController.addItem);

// Route to get the shopping list
router.get('/api/planner/item', plannerController.getShoppingList);

// Route to delete an item from the shopping list
router.delete('/api/planner/item/:itemName', plannerController.deleteItem);

// Route to delete a meal from the weekly planner
router.delete('/api/planner/meal/:day', plannerController.deleteMeal);

module.exports = router;
