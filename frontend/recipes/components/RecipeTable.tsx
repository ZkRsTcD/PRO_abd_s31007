import React from "react";
import type { Recipe } from '../types'

interface RecipeTableProps {
    recipes: Recipe[];
    onSelect: (recipeId: number) => void
}

const RecipeTable: React.FC<RecipeTableProps> = ({ recipes, onSelect }) => {

    return (
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
                        <td><button onClick={() => onSelect(recipe.id)}>Szczegóły</button></td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default RecipeTable;
