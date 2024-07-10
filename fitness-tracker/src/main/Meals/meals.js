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
                .select()

            setAllMeals(data)
        } catch (error) {
            console.log('ERROR')
        }

    }

    useEffect(() => { fetchAllMeals() }, [])


    return (<>
        <p>MEAL PAGE</p>
        <Link to='/meal-log/create'>Add Meal</Link>
        <table>
            <thead>
                <tr>
                    <td>Date</td>
                    <td>View</td>
                </tr>
            </thead>
            <tbody>
                {allMeals.map((meal, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <Link to={`/meal-log/view/${meal.id}/`}>
                                    {dayjs(meal.created_at).format('MMM/DD/YYYY')}
                                </Link>
                            </td>
                        </tr>

                    )
                })}

            </tbody>
        </table>
    </>)
}


export default MealLogPage