import axios from 'axios';

export const fetchAPI = async () => {
    const API_URL = 'https://dummyjson.com/recipes';
    try {
        const response = await axios.get(API_URL);
        const dishes = response.data.recipes
        return dishes;
    } catch (error) {
        console.error('Error fetching dishes:', error);
        return [];
    }
};
