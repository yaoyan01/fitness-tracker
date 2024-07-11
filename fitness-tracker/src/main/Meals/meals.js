import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";



const MealLogPage = () => {
    const [allMeals, setAllMeals] = useState([]);

    const fetchAllMeals = async () => {
        try {
            const { data, error } = await supabase
                .from('meal')
                .select(`*, mealFood(*, food(*))`)

            setAllMeals(data)
        } catch (error) {
            console.log('ERROR')
        }

    }

    const handleRemoveMeal = async (mealId) => {
        try {
            const { data, error } = await supabase.from('meal').delete().eq('id', mealId)
            setAllMeals(prevAllMeals => prevAllMeals.filter((meal) => meal.id !== mealId))
        } catch (error) {
            console.log('error removing meal')
        }
    }

    useEffect(() => { fetchAllMeals() }, [])

    return (<>
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl text-gray-800">Meals</h1>
                <Link
                    to='/meal-log/create'
                    className="bg-[#881700] text-white hover:bg-[#642113] py-2 px-4 rounded transition duration-300"
                >
                    Add Meal
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-right">Calories</th>
                            <th className="px-4 py-2 text-right">Protein (g)</th>
                            <th className="px-4 py-2 text-right">Carbs (g)</th>
                            <th className="px-4 py-2 text-right">Fats (g)</th>
                            <th className="px-4 py-2 text-right">Sugar (g)</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allMeals.map((meal, index) => {
                            const allMealFood = meal.mealFood
                            const totals = allMealFood.reduce((total, mealFood) => {
                                const food = mealFood.food;
                                const quantity = mealFood.quantity;
                                return {
                                    calories: total.calories + (food.calories * quantity),
                                    protein: total.protein + (food.protein * quantity),
                                    carbs: total.carbs + (food.carbs * quantity),
                                    fats: total.fats + (food.fats * quantity),
                                    sugar: total.sugar + (food.sugar * quantity)
                                };
                            }, { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 });

                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-left">
                                        {dayjs(meal.created_at).format('MMM/DD/YYYY')}
                                    </td>
                                    <td className="px-4 py-2 text-right">{totals.calories.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-right">{totals.protein.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-right">{totals.carbs.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-right">{totals.fats.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-right">{totals.sugar.toFixed(1)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link
                                            to={`/meal-log/view/${meal.id}/`}
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            View
                                        </Link>
                                        <button onClick={() => handleRemoveMeal(meal.id)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}


export default MealLogPage