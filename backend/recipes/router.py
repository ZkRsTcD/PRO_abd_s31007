from fastapi import APIRouter, HTTPException, Body

from recipes.service import RecipeService
from recipes.repository import RecipeRepository


router = APIRouter()

service = RecipeService(RecipeRepository())


@router.get("/recipes")
def get_recipes():
    return service.get_all_recipes()

@router.get("/recipe/details/{recipe_id}")
def get_recipe_details(recipe_id: int):
    return

@router.put("/recipe/details/{recipe_id}")
def update_recipe_details(recipe_id: int, details: dict = Body(...)):
    return

@router.delete("/recipe/{recipe_id}")
def delete_recipe(recipe_id: int):
    return

@router.post("/recipes")
def create_recipe(details: dict = Body(...)):
    return
