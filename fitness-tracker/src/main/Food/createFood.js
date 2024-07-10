import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { Link } from "react-router-dom"

const AddFoodPage = () => {
    const [foodInformation, setFoodInformation] = useState(
        {
            name: '',
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            sugar: 0,
        }
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFoodInformation(prev => ({
            ...prev,
            [name]: name === 'name' ? value : (value === '' ? '' : Number(value))
        }))
    }

    const handleSave = async () => {
        try {
            const { data, error } = await supabase.from('food').insert(
                [foodInformation]
            )
        } catch (error) {
            console.log('error saving')
        }
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nutrient</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Food Name</td>
                            <td>
                                <input
                                    type='text'
                                    name='name'
                                    value={foodInformation.name}
                                    onChange={handleInputChange}
                                    placeholder='Enter food name'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Calories</td>
                            <td>
                                <input
                                    type='number'
                                    name='calories'
                                    value={foodInformation.calories}
                                    onChange={handleInputChange}
                                    placeholder='Enter calories'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Protein (g)</td>
                            <td>
                                <input
                                    type='number'
                                    name='protein'
                                    value={foodInformation.protein}
                                    onChange={handleInputChange}
                                    placeholder='Enter protein'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Carbs (g)</td>
                            <td>
                                <input
                                    type='number'
                                    name='carbs'
                                    value={foodInformation.carbs}
                                    onChange={handleInputChange}
                                    placeholder='Enter carbs'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Fats (g)</td>
                            <td>
                                <input
                                    type='number'
                                    name='fats'
                                    value={foodInformation.fats}
                                    onChange={handleInputChange}
                                    placeholder='Enter fats'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sugar (g)</td>
                            <td>
                                <input
                                    type='number'
                                    name='sugar'
                                    value={foodInformation.sugar}
                                    onChange={handleInputChange}
                                    placeholder='Enter sugar'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link to='/food' onClick={handleSave}>Save Food</Link>
            </div>
        </>
    )
}

export default AddFoodPage