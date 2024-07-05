import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";



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
    </>)
}


export default MealLogPage