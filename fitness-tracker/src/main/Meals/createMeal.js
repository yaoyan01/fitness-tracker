import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"

const CreateMealPage = () => {
    const [meal, setMeal] = useState()

    const [allFoods, setAllFoods] = useState();

    const fetchAllFoods = async () => {
        try {
            const {data, error} = await supabase.from('food').select()
            setAllFoods(data)
        } catch (error) {
            console.log('Error Fetching All Foods')
        }
    }

    useEffect(()=>{fetchAllFoods();}, [])

    const handleCreateMeal = async () => {

        const {data, error} = await supabase.from().insert() 

    }

    return (<>
    <div>
        <div>
            
        </div>
    </div>
    </>
    );
}

export default CreateMealPage