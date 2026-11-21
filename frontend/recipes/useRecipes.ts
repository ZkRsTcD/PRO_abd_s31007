import { useCallback, useEffect, useState } from "react";
import { recipesApi } from "./recipesApi";
import type { Recipe, RecipeDetails } from './types'
import { formatDateToString } from '../shared/formatters'

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

    const [fromDate, setFromDate] = useState<Date|null>(new Date(2000, 1, 1, 1, 1));
    const [toDate, setToDate] = useState<Date|null>(new Date());
    const [searchedTerm, setSearchedTerm] = useState<string>("");

    const [pageSize, setPageSize] = useState<number>(50);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadRecipes = useCallback(async (customOffset?: number, customLimit?: number) => {
        try {
            setLoading(true);

            const currentOffset = customOffset !== undefined ? customOffset : (page - 1) * pageSize;
            
            const limitToUse = customLimit !== undefined ? customLimit : pageSize;

            const data = await recipesApi.getFilteredRecipes({
                fromDate: formatDateToString(fromDate), 
                toDate: formatDateToString(toDate),
                search: searchedTerm ? searchedTerm : undefined,
                offset: currentOffset,
                limit: limitToUse + 1
            })
            if (data.length > limitToUse) {
                setHasMore(true);
                setRecipes(data.slice(0, limitToUse));
            }else {
                setHasMore(false);
                setRecipes(data)
            }
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, [fromDate, toDate, searchedTerm, page, pageSize]);

    useEffect(() => {
        loadRecipes();
    }, []);
    
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

    // const handleSearchAndFilter = async () => {
    //     try{
    //         const data = await recipesApi.getFilteredRecipes({
    //             fromDate: formatDateToString(fromDate), 
    //             toDate: formatDateToString(toDate),
    //             search: searchedTerm ? searchedTerm : undefined
    //         })
    //         setRecipes(data);
    //         setOpenedDetailsId(null);
    //         setError(null)
    //     } catch (err) {
    //         setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const handlePagination = async (forward: boolean) => {
        const newPage = forward ? page + 1 : Math.max(page - 1, 1);
        if (!forward && page === 1) return;
        setPage(newPage);
        const offset = (newPage - 1) * pageSize;
        await loadRecipes(offset);
    };

    
    return {
        recipes,
        loading,
        error,
        selectedRecipe,
        openedDetailsId,
        recipeDetails,
        fromDate,
        toDate,
        searchedTerm,
        pageSize,
        page,
        hasMore,
        openDetails,
        closeDetails,
        updateField,
        saveRecipe,
        deleteRecipe,
        duplicateRecipe,
        setFromDate,
        setToDate,
        setSearchedTerm,
        loadRecipes,
        formatDateToString,
        handlePagination,
        setPage,
        setPageSize
    }

}
