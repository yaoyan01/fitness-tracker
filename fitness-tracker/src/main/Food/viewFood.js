import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"
import dayjs from "dayjs"
import { Link } from "react-router-dom"


const FoodPage = () => {
    const [loading, setLoading] = useState(false)
    const [allFoods, setAllFoods] = useState([])

    const fetchAllFoods = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('food').select()
            setAllFoods(data)
        } catch (error) {
            console.log('error with fetching foods', error)
        }
        setLoading(false)
    }

    const deleteFood = async (foodId) => {
        try {
            const { data, error } = await supabase.from('food').delete().eq('id', foodId)
            setAllFoods(
                prevFoods => prevFoods.filter(food => food.id !== foodId)
            )
        } catch (error) {
            console.log('error deleting')
        }
    }

    useEffect(() => { fetchAllFoods() }, [])


    return (
        <>
            {!loading ?
                <div>
                    <Link to='/food/create'>Add Food</Link>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Created At</td>
                                <td>Calories</td>
                                <td>Protein</td>
                                <td>Carbs</td>
                                <td>Fats</td>
                                <td>Sugar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allFoods.map((food, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{food.name}</td>
                                        <td>{dayjs(food.created_at).format('MM/DD/YYYY')}</td>
                                        <td>{food.calories}</td>
                                        <td>{food.protein}</td>
                                        <td>{food.carbs}</td>
                                        <td>{food.fats}</td>
                                        <td>{food.sugar}</td>
                                        <button onClick={() => deleteFood(food.id)}>Remove</button>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                : <div>
                    Loading Right Now
                </div>}
        </>
    )
}

export default FoodPage