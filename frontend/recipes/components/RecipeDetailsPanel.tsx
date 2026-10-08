import React from "react";
import type { Recipe, RecipeDetails } from '../types'
import { recipeFields } from '../recipeFieldsConfig'

interface RecipeDetailsPanelProps {
    recipe: Recipe;
    details: RecipeDetails | null;
    onFieldChange: (key: keyof RecipeDetails, value: string) => void;
    onSave: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
    onClose: () => void;
}

const RecipeDetailsPanel: React.FC<RecipeDetailsPanelProps> = ({
    recipe,
    details,
    onFieldChange,
    onSave,
    onDuplicate,
    onDelete,
    onClose
}) => {
    return (
        <div className='recipeDetails'>
            <div className='detailsHeader'>
                <label>{recipe.id}</label>
                <label>{recipe.Machine_id}</label>
                <label>{recipe.name}</label>
                <button onClick={onSave} style={{backgroundColor: '#295338'}}>Zapisz zmiany</button>

                {/* WAY OF INSERTING NEW RECIPE PROBABLY TO BE CHANGED */}
                <button onClick={onDuplicate} style={{backgroundColor: '#293f53'}}>Skopiuj recepturę</button>

                <button onClick={onDelete} style={{backgroundColor: '#5c2727'}}>Usuń recepturę</button>
                <button onClick={onClose}>Zamknij</button>
            </div>
            <div className='detailsContent'>
                {!details ? (
                    <p>Ładowanie danych receptury...</p>
                ) : (recipeFields.map((field) => (
                    <div key={field.key} className='formFieldBox'>
                    <label>{field.label}</label>
                    <input type={field.type} step={field.step} value={details[field.key] ?? ''} onChange={(e) => onFieldChange(field.key, e.target.value)}/>
                    </div>)))}
            </div>
            <div className='detailsLastMod'>
                <label>ZMODYFIKOWANE PRZEZ: {recipe.fname} {recipe.sname}</label>
                <label>{new Date(recipe.timestart).toLocaleString('pl-PL')}</label>
            </div>
        </div>
    )
}

export default RecipeDetailsPanel;
