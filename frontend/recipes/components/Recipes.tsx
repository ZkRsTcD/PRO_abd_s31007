import React, { useEffect, useState } from 'react'
import type { Recipe, RecipeDetails } from '../types'


const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const [openedDetails, setOpenedDetails] = useState<number|null>(null);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails|null>(null);
  //const 

  const selectedRecipe = recipes.find(r => r.id === openedDetails);

  const recipeFields = [
    { key: "moves", label: "Moves", type: "number" },
    { key: "distance", label: "Distance", type: "number" },
    { key: "airFlow", label: "Air flow", type: "number" },
    { key: "airTemp", label: "Air temp.", type: "number" },
    { key: "screwSpeed", label: "Screw Speed", type: "number" },
    { key: "rollerPress", label: "Roller Press", type: "number" },
    { key: "water", label: "Water Flow", type: "number" },
    { key: "carrSpeed", label: "Carr. Speed", type: "number" },
    { key: "rotatSpeed", label: "Rotat. Speed", type: "number" },
    { key: "tempZone1", label: "Temp. Zone 1", type: "number" },
    { key: "tempZone2", label: "Temp. Zone 2", type: "number" },
    { key: "tempZone3", label: "Temp. Zone 3", type: "number" },
    { key: "tempZone4", label: "Temp. Zone 4", type: "number" },
    { key: "tempDie", label: "Temp. Die", type: "number" },
    { key: "stbExtrSpeed", label: "Stb. Extr. Speed", type: "number" },
    { key: "stbScrwSpeed", label: "Stb. Scrw. Speed", type: "number" },
    { key: "stbAirFlow", label: "Stb. Air Flow", type: "number" },
    { key: "stbAirTemp", label: "Stb. Air Temp", type: "number" },
    { key: "carrRetDelBott", label: "Carr. Ret. Del. Bott.", type: "number" },
    { key: "carrRetDelTop", label: "Carr. Ret. Del. Top", type: "number" },
    { key: "carrAccDcc", label: "Carr. Acc./Dec.", type: "number" },
    { key: "diameterEmpt", label: "Diameter Empty", type: "number" },
    { key: "diameterLoad", label: "Diameter Load", type: "number" },
    { key: "cuttBladeSpeed", label: "Cutt. Blade Speed", type: "number" },
    { key: "cuttRotatSpeed", label: "Cutt. Rotat. Speed", type: "number" },
    { key: "cuttFinishTime", label: "Cutt. Finish Time", type: "number" },
    { key: "cabAirTempSett", label: "Cab. Air Temp Sett.", type: "number" },
    { key: "cabAirTempAlm", label: "Cab. Air Temp Alm.", type: "number" },
    { key: "optCarbon", label: "Opt. Carbon", type: "number" },
    { key: "optCoreless", label: "Opt. Coreless", type: "number" },
  ]

  const handleChange = (key: string, value: string) => {
    setRecipeDetails((prev: any) => ({ ...prev, [key]: value}));
  }

  const handleSave = () => {
    if (openedDetails === null || !recipeDetails) return;
    fetch(`http://localhost:8080/recipe/details/${openedDetails}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(recipeDetails),
    }).then(response => {
      if(!response.ok) throw new Error('Błąd zapisu danych');
      return response.json();
    }).then(data => {
      alert('Zmiany zostały zapisane w bazie');
      fetch('http://localhost:8080/recipes').then(res => res.json()).then(data => setRecipes(data));
    }).catch(err => {
      alert('Wystąpił błąd podczas zapisu danych do bazy');
    })
  }

  const handleDelete = () => {
    if (openedDetails === null || !recipeDetails) return;
    const confirm = window.confirm('Czy na pewno chcesz usunąć tę recepturę?')
    if (!confirm){
      return;
    }
    fetch(`http://localhost:8080/recipe/${openedDetails}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => alert(data.message))
    setRecipes(prev => prev.filter(r => r.id !== openedDetails));
    setOpenedDetails(null);
    setRecipeDetails(null);
  }

  const handleInsert = () => {
    if (openedDetails === null || !recipeDetails) return;
    const confirm = window.confirm('Czy na pewno chcesz utworzyć nową recepturę na bazie wybranej?')
    if (!confirm){
      return;
    }
    fetch('http://localhost:8080/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeDetails)
    }).then(res => res.json())
    setRecipes(prev => prev.filter(r => r.id !== openedDetails));
    setOpenedDetails(null);
    setRecipeDetails(null);
  }

  useEffect(() => {
    fetch('http://localhost:8080/recipes').then(response => {
      if(!response.ok){
        throw new Error('Błąd: ' + response.status);
      }
      return response.json();
    }).then((data: Recipe[]) => {
      setRecipes(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if(openedDetails === null){
      setRecipeDetails(null);
      return;
    }
    fetch(`http://localhost:8080/recipe/details/${openedDetails}`).then(response => {
      if(!response.ok) throw new Error('Nie udało się pobrać danych receptury');
      return response.json();
    }).then(recipeData => {
      setRecipeDetails(recipeData);
    }).catch(err => {
      console.error(err);
    })
  }, [openedDetails])

  return ( <div className = "recipeList">
    <h1>
      Receptury
    </h1>
    {loading && <p>Trwa pobieranie danych z bazy...</p>}
    {error && <p>Błąd połączenia: {error}</p>}
    {!loading && !error && (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Numer Maszyny</th>
            <th>Data modyfikacji</th>
            <th>Operator</th>
            <th>Nazwa Receptury</th>
            <th>Szczegóły</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length === 0 ? (
            <tr>
              <td>Brak rekordów w tabeli Recipes</td>
            </tr>
          ) : (
            recipes.map(recipe => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.Machine_id}</td>
                <td>{new Date(recipe.timestart).toLocaleString('pl-PL')}</td>
                <td>{recipe.fname} {recipe.sname}</td>
                <td>{recipe.name}</td>
                <td><button onClick={() => setOpenedDetails(recipe.id)}>Szczegóły</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
    {openedDetails !== null && selectedRecipe && (
      <div className='recipeDetails'>
        <div className='detailsHeader'>
          <label>{selectedRecipe.id}</label>
          <label>{selectedRecipe.Machine_id}</label>
          <label>{selectedRecipe.name}</label>
          <button onClick={handleSave} style={{backgroundColor: '#295338'}}>Zapisz zmiany</button>

          {/* WAY OF INSERTING NEW RECIPE PROBABLY TO BE CHANGED */}
          <button onClick={handleInsert} style={{backgroundColor: '#293f53'}}>Skopiuj recepturę</button>

          <button onClick={handleDelete} style={{backgroundColor: '#5c2727'}}>Usuń recepturę</button>
          <button onClick={() => setOpenedDetails(null)}>Zamknij</button>
        </div>
        <div className='detailsContent'>
          {!recipeDetails ? (
            <p>Ładowanie danych receptury...</p>
          ) : (recipeFields.map((field) => (
            <div key={field.key} className='formFieldBox'>
              <label>{field.label}</label>
              <input type={field.type} value={(recipeDetails as any)?.[field.key] ?? ''} onChange={(e) => handleChange(field.key, e.target.value)}/>
            </div>)))}
        </div>
        <div className='detailsLastMod'>
          <label>ZMODYFIKOWANE PRZEZ: {selectedRecipe.fname} {selectedRecipe.sname}</label>
          <label>{new Date(selectedRecipe.timestart).toLocaleString('pl-PL')}</label>
        </div>
      </div>
    )}
  </div>);

}

export default Recipes;
