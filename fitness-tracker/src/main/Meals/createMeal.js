import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

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
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-3">
                <button
                    onClick={handleOpenModal}
                    className="bg-[#881700]  text-white hover:bg-[#642113] py-2 px-4 rounded mr-3"
                >
                    Add Food
                </button>

                <Link
                    onClick={handleSaveMeal}
                    to='/'
                    className="  border border-gray-300 text-[#881700] hover:bg-gray-50 py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed mr-3"
                >
                    Save Meal
                </Link>

                <Link
                    to='/'
                    className=" bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </Link>
            </div>
            <Modal open={openModal} closeModal={handleCloseModal} data={allFoods} selectFood={handleSelectFood} />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Calories</th>
                            <th className="py-3 px-4 text-left">Protein</th>
                            <th className="py-3 px-4 text-left">Carbs</th>
                            <th className="py-3 px-4 text-left">Fat</th>
                            <th className="py-3 px-4 text-left">Sugar</th>
                            <th className="py-3 pl-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {allMealFoods.map((mealFood, index) => {
                            const food = mealFood.food;
                            const quantity = mealFood.quantity;
                            return (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-4">{food.name}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => changeQuantity(index, 'subtract')}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-l"
                                            >
                                                -
                                            </button>
                                            <span className="px-2">{quantity}{food.unit}</span>
                                            <button
                                                onClick={() => changeQuantity(index, 'add')}
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{food.calories * quantity}</td>
                                    <td className="py-3 px-4">{food.protein * quantity}</td>
                                    <td className="py-3 px-4">{food.carbs * quantity}</td>
                                    <td className="py-3 px-4">{food.fats * quantity}</td>
                                    <td className="py-3 px-4">{food.sugar * quantity}</td>
                                    <td className="py-3 text-center">
                                        <button
                                            onClick={() => handleRemoveFood(index)}
                                            className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default CreateMealPage;