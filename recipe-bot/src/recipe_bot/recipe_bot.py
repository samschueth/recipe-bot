"""Main Recipe Bot class."""

from typing import List, Dict, Optional
from .generator import RecipeGenerator
from .evaluator import RecipeEvaluator


class RecipeBot:
    """Main interface for recipe generation and evaluation."""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize Recipe Bot.
        
        Args:
            api_key: OpenRouter API key. If None, will look for OPENROUTER_API_KEY env var.
        """
        self.generator = RecipeGenerator(api_key)
        self.evaluator = RecipeEvaluator()
    
    def generate_recipe(
        self, 
        query: str, 
        dietary_preferences: Optional[List[str]] = None,
        cuisine: Optional[str] = None,
        servings: int = 4
    ) -> Dict:
        """Generate a recipe based on query and preferences.
        
        Args:
            query: Recipe description or ingredients
            dietary_preferences: List of dietary restrictions/preferences
            cuisine: Cuisine type (e.g., "Italian", "Asian")
            servings: Number of servings
            
        Returns:
            Generated recipe dictionary
        """
        return self.generator.generate(
            query=query,
            dietary_preferences=dietary_preferences or [],
            cuisine=cuisine,
            servings=servings
        )
    
    def evaluate_recipe(self, recipe: Dict) -> Dict:
        """Evaluate a recipe for quality and accuracy.
        
        Args:
            recipe: Recipe dictionary to evaluate
            
        Returns:
            Evaluation results dictionary
        """
        return self.evaluator.evaluate(recipe)