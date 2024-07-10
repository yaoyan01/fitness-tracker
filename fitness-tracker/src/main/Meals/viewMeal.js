import { useParams } from 'react-router-dom';

const ViewMealPage = () => {
    const { mealId } = useParams();

    const fetchMealFoods = async () => {

        // need to fetch all the meal foods with corresponding meal ID 
        // then display all of the foods there, we can do this through the nested returns in supabase 

    }

}

export default ViewMealPage