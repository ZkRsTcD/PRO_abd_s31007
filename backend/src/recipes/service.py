import datetime

from recipes.repository import RecipeRepository
from recipes.models import RecipeDetails


#ignored_keys = {'id', 'Source', 'Machine_id', 'timestart', 'User_id', 'name'}


class RecipeService:

    def __init__(self, repository: RecipeRepository):
        self.repository = repository

    def get_all_recipes(self) -> list[dict]:
        return self.repository.get_all()
    
    def get_recipe_details(self, recipe_id: int) -> dict:
        recipe = self.repository.get_by_id(recipe_id)
        if recipe is None:
            raise ValueError(f"Receptura z id {recipe_id} nie istnieje")
        return recipe

    def update_recipe(self, recipe_id: int, data: RecipeDetails) -> None:
        self.get_recipe_details(recipe_id)
        #fields_to_update = {k: v for k, v in data.items() if k not in ignored_keys}
        fields_to_update = data.model_dump()
        if not fields_to_update:
            raise ValueError("Brak danych do zaktualizowania")
        self.repository.update(recipe_id, fields_to_update)

    def delete_recipe(self, recipe_id: int) -> None:
        deleted = self.repository.delete(recipe_id)
        if not deleted:
            raise ValueError(f"Receptura z id {recipe_id} nie istnieje")

    def create_recipe(self, data: RecipeDetails) -> int:
        #fields_to_insert = {k: v for k, v in data.items() if k not in ignored_keys}
        fields_to_insert = data.model_dump()

        fields_to_insert['timestart'] = datetime.datetime.now()     #PO STRONIE BAZY?
        fields_to_insert['Source'] = 2                              #TEMPORARY
        fields_to_insert['Machine_id'] = 1                          #TEMPORARY
        fields_to_insert['User_id'] = 1                             #TEMPORARY
        fields_to_insert['name'] = 'InsertedSAMPLE'                 #TEMPORARY

        return self.repository.create(fields_to_insert)
    
    