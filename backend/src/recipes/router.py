from fastapi import APIRouter, HTTPException, Body

from recipes.service import RecipeService
from recipes.repository import RecipeRepository
from recipes.models import RecipeDetails, SuccessResponse


router = APIRouter()

service = RecipeService(RecipeRepository())


@router.get("/recipes")
def get_recipes():
    return service.get_all_recipes()

@router.get("/recipe/details/{recipe_id}")
def get_recipe_details(recipe_id: int):
    try:
        return service.get_recipe_details(recipe_id)
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))

@router.put("/recipe/details/{recipe_id}", response_model=SuccessResponse)
def update_recipe_details(recipe_id: int, details: RecipeDetails):
    try:
        service.update_recipe(recipe_id, details)
        return SuccessResponse(message="Receptura została zaktualizowana")
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err))
    except Exception:
        raise HTTPException(status_code=500, detail="Błąd zapisu w bazie danych")

@router.delete("/recipe/{recipe_id}", response_model=SuccessResponse)
def delete_recipe(recipe_id: int):
    try:
        service.delete_recipe(recipe_id)
        return SuccessResponse(message="Receptura została usunięta")
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))
    except Exception:
        raise HTTPException(status_code=500, detail="Błąd usuwania rekordu w bazie danych")

@router.post("/recipes")                #Nowa receptura się pojawia dopiero po odświeżeniu. Oryginał też na chwilę znika
def create_recipe(details: RecipeDetails):
    try:
        service.create_recipe(details)
        return SuccessResponse(message="Receptura została dodana")
    except Exception:
            raise HTTPException(status_code=500, detail="Błąd dodawania rekordu do bazy")
