// In-memory storage (Replace with DB in production)
let weeklyPlan = {};  // Stores weekly meals
let shoppingList = [];  // Stores shopping list items

// Controller for adding a meal to the weekly planner
exports.addMeal = (req, res) => {
    const { day, meal } = req.body;

    if (!day || !meal) {
        return res.status(400).json({ message: 'Day and meal are required' });
    }

    weeklyPlan[day] = meal;

    return res.status(201).json({
        message: 'Meal added successfully',
        weeklyPlan,
    });
};

// Controller for getting the weekly meal plan
exports.getWeeklyPlan = (req, res) => {
    if (Object.keys(weeklyPlan).length === 0) {
        return res.status(404).json({ message: 'No meals planned for the week' });
    }
    return res.status(200).json({ weeklyPlan });
};

// Controller for adding an item to the shopping list
exports.addItem = (req, res) => {
    const { itemName, category, organic } = req.body;

    if (!itemName || !category) {
        return res.status(400).json({ message: 'Item name and category are required' });
    }

    const item = {
        name: itemName,
        category,
        organic: organic || false,
    };

    shoppingList.push(item);

    return res.status(201).json({
        message: 'Item added successfully',
        shoppingList,
    });
};

// Controller for getting the shopping list
exports.getShoppingList = (req, res) => {
    if (shoppingList.length === 0) {
        return res.status(404).json({ message: 'Shopping list is empty' });
    }
    return res.status(200).json({ shoppingList });
};

// Controller for deleting an item from the shopping list
exports.deleteItem = (req, res) => {
    const { itemName } = req.params;

    if (!itemName) {
        return res.status(400).json({ message: 'Item name is required' });
    }

    const index = shoppingList.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found in the shopping list' });
    }

    shoppingList.splice(index, 1);

    return res.status(200).json({
        message: 'Item deleted successfully',
        shoppingList,
    });
};

// Controller for deleting a meal from the weekly planner
exports.deleteMeal = (req, res) => {
    const { day } = req.params;

    if (!day) {
        return res.status(400).json({ message: 'Day is required to delete a meal' });
    }

    if (!weeklyPlan[day]) {
        return res.status(404).json({ message: `No meal planned for ${day}` });
    }

    delete weeklyPlan[day];

    return res.status(200).json({
        message: `${day.charAt(0).toUpperCase() + day.slice(1)} meal deleted successfully`,
        weeklyPlan,
    });
};
