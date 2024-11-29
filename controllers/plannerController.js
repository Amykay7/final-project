// In-memory storage (replace with database logic if needed)
let weeklyPlan = {};  // Stores weekly meals
let shoppingList = [];  // Stores shopping list items

// Controller for adding a meal to the weekly planner
exports.addMeal = (req, res) => {
    const { day, meal } = req.body;

    // Check if the input is valid
    if (!day || !meal) {
        return res.status(400).json({ message: 'Day and Meal are required' });
    }

    // Add or update the meal for the given day
    weeklyPlan[day] = meal;

    return res.status(201).json({ message: 'Meal added successfully', weeklyPlan });
};

// Controller for retrieving the weekly plan
exports.getWeeklyPlan = (req, res) => {
    if (Object.keys(weeklyPlan).length === 0) {
        return res.status(404).json({ message: 'No meals planned for the week' });
    }
    return res.status(200).json({ weeklyPlan });
};

// Controller for adding an item to the shopping list
exports.addItem = (req, res) => {
    const { itemName, category, organic } = req.body;

    // Validate the input data
    if (!itemName || !category) {
        return res.status(400).json({ message: 'Item name and category are required' });
    }

    // Create a new item and add it to the shopping list
    const item = {
        name: itemName,
        category,
        organic: organic || false,  // Default to false if not provided
    };

    shoppingList.push(item);

    return res.status(201).json({ message: 'Item added successfully', shoppingList });
};

// Controller for retrieving the shopping list
exports.getShoppingList = (req, res) => {
    if (shoppingList.length === 0) {
        return res.status(404).json({ message: 'Shopping list is empty' });
    }
    return res.status(200).json({ shoppingList });
};

// Controller for deleting an item from the shopping list (Optional)
exports.deleteItem = (req, res) => {
    const { itemName } = req.params;

    // Find and remove the item from the shopping list
    const index = shoppingList.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found in the shopping list' });
    }

    shoppingList.splice(index, 1);
    return res.status(200).json({ message: 'Item deleted successfully', shoppingList });
};

// Controller for deleting a meal from the weekly planner (Optional)
exports.deleteMeal = (req, res) => {
    const { day } = req.params;

    // Check if the day exists in the weekly plan
    if (!weeklyPlan[day]) {
        return res.status(404).json({ message: `No meal planned for ${day}` });
    }

    delete weeklyPlan[day];  // Remove the meal for the given day
    return res.status(200).json({ message: `${day.charAt(0).toUpperCase() + day.slice(1)} meal deleted`, weeklyPlan });
};
