import React from "react";
import { useRecipes } from '../useRecipes'
import RecipeTable from './RecipeTable'
import RecipeDetailsPanel from './RecipeDetailsPanel'

const Recipes: React.FC = () => {
  const {
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
  } = useRecipes();

  return (
    <div className="recipeList">
      <h1>
        Receptury
      </h1>
      {loading && <p>Trwa pobieranie danych z bazy...</p>}
      {error && <p>Błąd połączenia: {error}</p>}
      {!loading && !error && (
        <RecipeTable recipes={recipes} onSelect={openDetails}/>
      )}
      {openedDetailsId !== null && selectedRecipe && (
        <RecipeDetailsPanel recipe={selectedRecipe} details={recipeDetails} onFieldChange={updateField} onSave={saveRecipe} onDuplicate={duplicateRecipe} onDelete={deleteRecipe} onClose={closeDetails}/>
      )}
    </div>
  )

}

export default Recipes;
