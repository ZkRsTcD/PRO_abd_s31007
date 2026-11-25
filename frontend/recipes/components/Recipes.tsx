import React from "react";
import { useRecipes } from '../useRecipes'
import RecipeTable from './RecipeTable'
import RecipeDetailsPanel from './RecipeDetailsPanel'
import RecipeSearchFilterPanel from './RecipeSearchFilterPanel'
import { useLanguage } from "../../i18n/LanguageContext"; 

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
  } = useRecipes();

  const { t } = useLanguage();

  return (
    <div className="recipeList">
      <h1>
        Receptury
      </h1>
      <div className="SearchFilterRecipePanel">
        <RecipeSearchFilterPanel
          fromDate={fromDate} 
          toDate={toDate} 
          searchedTerm={searchedTerm}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setSearchedTerm={setSearchedTerm}
          loadRecipes={() => {setPage(1); loadRecipes(0, pageSize)}}
          formatDateToString={formatDateToString}/>
      </div>
      <div className="PaginationPanel">
        <button name="GoBack" onClick={() => handlePagination(false)} disabled={page === 1 || loading}>{'<<'}</button>
        <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); loadRecipes(0, Number(e.target.value))}}>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
        </select>
        <button name="GoForward" onClick={() => handlePagination(true)} disabled={!hasMore || loading}>{'>>'}</button>
      </div>
      <div className="RecipeTable">
        {loading && <p>{t.common.loading}</p>}
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
