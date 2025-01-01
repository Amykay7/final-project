const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Route to add a meal to the weekly planner
router.post('/meal', plannerController.addMeal);

// Route to get the weekly planner
router.get('/meal', plannerController.getWeeklyPlan);

// Route to add an item to the shopping list
router.post('/item', plannerController.addItem);

// Route to get the shopping list
router.get('/item', plannerController.getShoppingList);

// Route to delete an item from the shopping list
router.delete('/item/:itemName', plannerController.deleteItem);

// Route to delete a meal from the weekly planner
router.delete('/meal/:day', plannerController.deleteMeal);

module.exports = router;
