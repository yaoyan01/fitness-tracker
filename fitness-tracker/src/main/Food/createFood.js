import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../supabaseClient"

const AddFoodPage = () => {
    const navigate = useNavigate();
    const [foodInformation, setFoodInformation] = useState({
        name: '',
        unit: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        sugar: '',
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFoodInformation(prev => ({
            ...prev,
            [name]: name === 'name' || name === 'unit' ? value : (value === '' ? '' : Number(value))
        }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        let newErrors = {}
        if (!foodInformation.name.trim()) newErrors.name = "Name is required"
        if (!foodInformation.unit.trim()) newErrors.unit = "Unit is required"
        if (foodInformation.calories === '') newErrors.calories = "Calories is required"
        if (foodInformation.protein === '') newErrors.protein = "Protein is required"
        if (foodInformation.carbs === '') newErrors.carbs = "Carbs is required"
        if (foodInformation.fats === '') newErrors.fats = "Fats is required"
        if (foodInformation.sugar === '') newErrors.sugar = "Sugar is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        if (validateForm()) {
            try {
                const { data, error } = await supabase.from('food').insert([foodInformation])
                if (error) throw error

                // If save is successful, navigate to the food page
                navigate('/food');

            } catch (error) {
                console.log('Error saving food:', error.message)
                setErrors(prev => ({ ...prev, submit: "Failed to save food. Please try again." }))
            }
        } else {
            console.log('Please fill out all required fields')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl text-gray-800">Add New Food</h1>
                <button
                    onClick={handleSave}
                    className="inline-block px-6 py-2 bg-[#881700] text-white hover:bg-[#642113] rounded transition duration-300"
                >
                    Save Food
                </button>
            </div>
            {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Nutrient</th>
                            <th className="px-4 py-2 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Object.entries(foodInformation).map(([key, value]) => (
                            <tr key={key} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-left capitalize">{key}</td>
                                <td className="px-4 py-2">
                                    <input
                                        type={key === 'name' || key === 'unit' ? 'text' : 'number'}
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        placeholder={`Enter ${key}`}
                                        className={`w-full px-3 py-2 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddFoodPage