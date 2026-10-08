import axios from 'axios';
import type { Recipe, RecipeDetails } from './types'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const recipesApi = {
    getAll: async (): Promise<Recipe[]> => {
        const { data } = await httpClient.get<Recipe[]>('/recipes');
        return data;
    },

    getDetails: async (recipeId: number): Promise<RecipeDetails> => {
        const { data } = await httpClient.get<RecipeDetails>(`/recipe/details/${recipeId}`);
        return data;
    },

    update: async (recipeId: number, data: RecipeDetails): Promise<void> => {
        await httpClient.put(`/recipe/details/${recipeId}`, data);
    },

    remove: async (recipeId: number): Promise<void> => {
        await httpClient.delete(`/recipe/${recipeId}`);
    },

    create: async (data: RecipeDetails): Promise<void> => {
        await httpClient.post('/recipes', data);
    }
};
