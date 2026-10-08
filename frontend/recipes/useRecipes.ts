import { useCallback, useEffect, useState } from "react";
import { recipesApi } from "./recipesApi";
import type { Recipe, RecipeDetails } from './types'

function toFormData(details: RecipeDetails): RecipeDetails {
    const copy: any = { ...details };
    return copy as RecipeDetails
}

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [openedDetailsId, setOpenedDetailsId] = useState<number|null>(null);
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails|null>(null);

    const selectedRecipe = recipes.find(r => r.id === openedDetailsId) ?? null;

    const loadRecipes = useCallback(async () => {
        try {
            setLoading(true);
            const data = await recipesApi.getAll();
            setRecipes(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);
    
    useEffect(() => {
        if(openedDetailsId === null) {
            setRecipeDetails(null);
            return;
        }
        recipesApi.getDetails(openedDetailsId).then(setRecipeDetails)
        .catch((err) => console.error('Nie udało się pobrać danych receptury', err)); 
    }, [openedDetailsId])
    
    const openDetails = (recipeId: number) => setOpenedDetailsId(recipeId);
    const closeDetails = () => setOpenedDetailsId(null);

    const updateField = (key: keyof RecipeDetails, value: string) => {
        setRecipeDetails((prev) => (prev ? { ...prev, [key]: value } : prev))
    };

    const saveRecipe = async () => {
        if (openedDetailsId === null || !recipeDetails) return;
        try {
            await recipesApi.update(openedDetailsId, toFormData(recipeDetails));
            alert('Zmiany zostały zapisane w bazie')
            await loadRecipes();
        } catch {
            alert('Wystąpił błąd podczas zapisu danych do bazy');
        }
    }

    const deleteRecipe = async () => {
        if (openedDetailsId === null) return;
        const confirm = window.confirm('Czy na pewno chcesz usunąć tę recepturę?')
        if (!confirm){
            return;
        }
        try {
            await recipesApi.remove(openedDetailsId);
            setRecipes(prev => prev.filter(r => r.id !== openedDetailsId));
            closeDetails();
        } catch {
            alert('Wystąpił błąd podczas usuwania receptury');
        }
    }

    const duplicateRecipe = async () => {
        if (openedDetailsId === null || !recipeDetails) return;
        const confirm = window.confirm('Czy na pewno chcesz utworzyć nową recepturę na bazie wybranej?')
        if (!confirm){
            return;
        }
        try {
            await recipesApi.create(toFormData(recipeDetails));
            await loadRecipes();
            closeDetails();
        } catch {
            alert('Wystąpił błąd podczas tworzenia receptury')
        }
    }
    
    return {
        recipes,
        loading,
        error,
        selectedRecipe,
        openedDetailsId,
        recipeDetails,
        openDetails,
        closeDetails,
        updateField,
        saveRecipe,
        deleteRecipe,
        duplicateRecipe
    }

}
