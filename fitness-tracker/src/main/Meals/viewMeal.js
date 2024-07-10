import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import dayjs from 'dayjs';

const ViewMealPage = () => {
    const { mealId } = useParams();
    const [allMealFoods, setAllMealFoods] = useState([])


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

    useEffect(() => { fetchMealFoods() }, [])
    console.log(allMealFoods)

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Calories</td>
                            <td>Protein</td>
                            <td>Carbs</td>
                            <td>Fats</td>
                            <td>Sugar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allMealFoods.map((mealFood, index) => {
                            const food = mealFood.food
                            const quantity = mealFood.quantity
                            return (
                                <tr key={index}>
                                    <td>{food.name}</td>
                                    <td>{quantity}</td>
                                    <td>{food.calories}</td>
                                    <td>{food.protein}</td>
                                    <td>{food.carbs}</td>
                                    <td>{food.fats}</td>
                                    <td>{food.sugar}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )

}

export default ViewMealPage