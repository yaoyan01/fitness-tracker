import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const CreateMealPage = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
        fetchAllFoods();
    }, []);

    const fetchUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchAllFoods = async () => {
        try {
            const { data, error } = await supabase.from('food').select();
            if (error) throw error;
            setAllFoods(data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const handleSaveMeal = async () => {
        if (!user || selectedFoods.length === 0) return;

        try {
            // Create the meal
            const { data: mealData, error: mealError } = await supabase
                .from('meal')
                .insert({ user: user.id })
                .select()
                .single();

            if (mealError) throw mealError;

            // Add selected foods to the meal
            const mealFoods = selectedFoods.map(sf => ({
                mealId: mealData.id,
                foodId: sf.foodId,
                quantity: sf.quantity
            }));

            const { error: mealFoodError } = await supabase
                .from('mealfood')
                .insert(mealFoods);

            if (mealFoodError) throw mealFoodError;

            console.log('Meal saved successfully');
            // Reset selected foods or navigate away
            setSelectedFoods([]);
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    return (
        <div>
            <button onClick={handleSaveMeal} disabled={selectedFoods.length === 0}>
                Save Meal
            </button>
        </div>
    );
};

export default CreateMealPage;