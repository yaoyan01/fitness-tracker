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
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl text-gray-800">Foods List</h1>
                    <Link
                        to='/food/create'
                        className="bg-[#881700]  text-white hover:bg-[#642113] py-2 px-4 rounded transition duration-300"
                    >
                        Add Food
                    </Link>
                </div>
                {!loading ? (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Created At</th>
                                    <th className="px-4 py-2 text-right">Calories</th>
                                    <th className="px-4 py-2 text-right">Protein</th>
                                    <th className="px-4 py-2 text-right">Carbs</th>
                                    <th className="px-4 py-2 text-right">Fats</th>
                                    <th className="px-4 py-2 text-right">Sugar</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {allFoods.map((food, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-left">{food.name}</td>
                                        <td className="px-4 py-2 text-left">{dayjs(food.created_at).format('MM/DD/YYYY')}</td>
                                        <td className="px-4 py-2 text-right">{food.calories}</td>
                                        <td className="px-4 py-2 text-right">{food.protein}</td>
                                        <td className="px-4 py-2 text-right">{food.carbs}</td>
                                        <td className="px-4 py-2 text-right">{food.fats}</td>
                                        <td className="px-4 py-2 text-right">{food.sugar}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => deleteFood(food.id)}
                                                className="text-red-500 py-1 px-3 rounded text-sm transition duration-300"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-gray-600">Loading...</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default FoodPage