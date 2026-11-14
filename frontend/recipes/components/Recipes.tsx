import React from "react";
import { useRecipes } from '../useRecipes'
import RecipeTable from './RecipeTable'
import RecipeDetailsPanel from './RecipeDetailsPanel'
import RecipeSearchFilterPanel from './RecipeSearchFilterPanel'

const Recipes: React.FC = () => {
  const {
    recipes,
    loading,
    error,
    selectedRecipe,
    openedDetailsId,
    recipeDetails,
    fromDate,
    toDate,
    searchedTerm,
    openDetails,
    closeDetails,
    updateField,
    saveRecipe,
    deleteRecipe,
    duplicateRecipe,
    setFromDate,
    setToDate,
    setSearchedTerm,
    handleSearchAndFilter,
    formatDateToString
  } = useRecipes();

  return (
    <div className="recipeList">
      <h1>
        Receptury
      </h1>
      <div className="SearchFilterRecipePanel">
        {!loading && !error && (
          <RecipeSearchFilterPanel
            fromDate={fromDate} 
            toDate={toDate} 
            searchedTerm={searchedTerm}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setSearchedTerm={setSearchedTerm}
            handleSearchAndFilter={handleSearchAndFilter}
            formatDateToString={formatDateToString}/>
        )}
      </div>
      <div className="RecipeTable">
        {loading && <p>Trwa pobieranie danych z bazy...</p>}
        {error && <p>Błąd połączenia: {error}</p>}
        {!loading && !error && (
          <RecipeTable recipes={recipes} onSelect={openDetails}/>
        )}
      </div>
      <div className="RecipeDetails">
        {openedDetailsId !== null && selectedRecipe && (
          <RecipeDetailsPanel recipe={selectedRecipe} details={recipeDetails} onFieldChange={updateField} onSave={saveRecipe} onDuplicate={duplicateRecipe} onDelete={deleteRecipe} onClose={closeDetails}/>
        )}
      </div>
    </div>
  )

}

export default Recipes;
