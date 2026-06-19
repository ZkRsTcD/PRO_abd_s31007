

from recipes.repository import RecipeRepository


class RecipeService:

    def __init__(self, repository: RecipeRepository):
        self.repository = repository

    def get_all_recipes(self) -> list[dict]:
        return self.repository.get_all()
    
    def get_recipe_details():
        return
    
    