import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import dayjs from 'dayjs';

const ViewMealPage = () => {
    const { mealId } = useParams();
    const [allMealFoods, setAllMealFoods] = useState([])
    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        sugar: 0
    });


    const fetchMealFoods = async () => {
        const { data, error } = await supabase.from('mealFood').select(`*, food(*), meal(*)`).eq('mealID', mealId)
        console.log('running')
        if (error) {
            console.log('error fetching the meal food with meal ID ')
        } else {
            setAllMealFoods(data)
        }
        // need to fetch all the meal foods with corresponding meal ID 
        // then display all of the foods there, we can do this through the nested returns in supabase 

    }

    const calculateTotals = (mealFoods) => {
        const newTotals = mealFoods.reduce((acc, mealFood) => {
            const { food, quantity } = mealFood;
            acc.calories += food.calories * quantity;
            acc.protein += food.protein * quantity;
            acc.carbs += food.carbs * quantity;
            acc.fats += food.fats * quantity;
            acc.sugar += food.sugar * quantity;
            return acc;
        }, {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            sugar: 0
        });
        setTotals(newTotals);
    };

    useEffect(() => { fetchMealFoods();}, [])
    useEffect(() => { calculateTotals(allMealFoods);}, [allMealFoods])



    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Meal Details</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-right">Quantity</th>
                                <th className="px-4 py-2 text-right">Calories</th>
                                <th className="px-4 py-2 text-right">Protein</th>
                                <th className="px-4 py-2 text-right">Carbs</th>
                                <th className="px-4 py-2 text-right">Fats</th>
                                <th className="px-4 py-2 text-right">Sugar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {allMealFoods.map((mealFood, index) => {
                                const food = mealFood.food;
                                const quantity = mealFood.quantity;
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-left">{food.name}</td>
                                        <td className="px-4 py-2 text-right">{quantity}</td>
                                        <td className="px-4 py-2 text-right">{(food.calories * quantity).toFixed(1)}</td>
                                        <td className="px-4 py-2 text-right">{(food.protein * quantity).toFixed(1)}</td>
                                        <td className="px-4 py-2 text-right">{(food.carbs * quantity).toFixed(1)}</td>
                                        <td className="px-4 py-2 text-right">{(food.fats * quantity).toFixed(1)}</td>
                                        <td className="px-4 py-2 text-right">{(food.sugar * quantity).toFixed(1)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-gray-100 font-semibold text-gray-800">
                            <tr>
                                <td className="px-4 py-2 text-left" colSpan="2">Total</td>
                                <td className="px-4 py-2 text-right">{totals.calories.toFixed(1)}</td>
                                <td className="px-4 py-2 text-right">{totals.protein.toFixed(1)}</td>
                                <td className="px-4 py-2 text-right">{totals.carbs.toFixed(1)}</td>
                                <td className="px-4 py-2 text-right">{totals.fats.toFixed(1)}</td>
                                <td className="px-4 py-2 text-right">{totals.sugar.toFixed(1)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )

}

export default ViewMealPage