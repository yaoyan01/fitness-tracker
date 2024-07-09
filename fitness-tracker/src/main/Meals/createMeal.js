import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Modal from "../../components/Modal";

const CreateMealPage = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [allMealFoods, setAllMealFoods] = useState([]);
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchUser();
        fetchAllFoods();
    }, []);

    const fetchUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchAllFoods = async () => {
        try {
            const { data, error } = await supabase.from('food').select();
            if (error) throw error;
            setAllFoods(data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const handleSaveMeal = async () => {
        if (!user || allMealFoods.length === 0) return;

        try {
            // Create the meal
            const { data: mealData, error: mealError } = await supabase
                .from('meal')
                .insert({ user: user.id })
                .select()
                .single();

            if (mealError) throw mealError;

            // Add selected foods to the meal
            const mealFoods = allMealFoods.map(sf => ({
                mealID: mealData.id,
                foodID: sf.food.id,
                quantity: sf.quantity
            }));

            const errors = await insertMealFoods(mealFoods);
            if (errors) {
                console.error('Some inserts failed:', errors);
            } else {
                console.log('All meal foods inserted successfully');
            }

            // Reset selected foods or navigate away
            setAllMealFoods([]);
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    const insertMealFoods = async (mealFoods) => {
        const errors = [];

        for (const mealFood of mealFoods) {
            const { error } = await supabase
                .from('mealFood')
                .insert(mealFood);

            if (error) errors.push(error);
        }

        return errors.length ? errors : null;
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleSelectFood = (e) => {
        setAllMealFoods([...allMealFoods, { food: e, quantity: 1 }])
    }

    const handleRemoveFood = (indexToRemove) => {
        setAllMealFoods(prevFoods =>
            prevFoods.filter((_, index) => index !== indexToRemove)
        );
    }

    const changeQuantity = (indexOfChange, operation) => {
        setAllMealFoods(prevFood =>
            prevFood.map((food, index) => {
                if (index !== indexOfChange) {
                    return food
                } else {
                    const changeQuantityBy = operation === 'add' ? 1 : -1
                    return { ...food, quantity: Math.max(0, food.quantity + changeQuantityBy) };
                }
            })
        )
    }

    return (
        <div>
            <button onClick={handleOpenModal}>Add modal</button>
            <Modal open={openModal} closeModal={handleCloseModal} data={allFoods} selectFood={handleSelectFood}>
            </Modal>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allMealFoods.map((mealFood, index) => {
                        const food = mealFood.food
                        const quantity = mealFood.quantity

                        return (
                            <tr key={index}>
                                <td>{food.name}</td>
                                <td>
                                    <div>
                                        <button onClick={() => (changeQuantity(index, 'subtract'))}>-</button>
                                        {quantity}
                                        <button onClick={() => (changeQuantity(index, 'add'))}>+</button>
                                    </div>
                                </td>
                                <td>{food.calories * quantity}</td>
                                <td>{food.protein * quantity}</td>
                                <td>{food.carbs * quantity}</td>
                                <td>{food.fats * quantity}</td>
                                <td>{food.sugar * quantity}</td>
                                <td>
                                    <button onClick={() => handleRemoveFood(index)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={handleSaveMeal} disabled={allMealFoods.length === 0}>
                Save Meal
            </button>
        </div>
    );
};

export default CreateMealPage;