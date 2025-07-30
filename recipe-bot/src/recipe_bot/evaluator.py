"""Recipe evaluation module."""

from typing import Dict, List


class RecipeEvaluator:
    """Evaluates recipes for quality, accuracy, and safety."""
    
    def evaluate(self, recipe: Dict) -> Dict:
        """Evaluate a recipe comprehensively.
        
        Args:
            recipe: Recipe dictionary to evaluate
            
        Returns:
            Evaluation results with scores and feedback
        """
        results = {
            "overall_score": 0.0,
            "nutrition_score": 0.0,
            "safety_score": 0.0,
            "completeness_score": 0.0,
            "dietary_compliance_score": 0.0,
            "feedback": []
        }
        
        # Evaluate completeness
        completeness = self._evaluate_completeness(recipe)
        results["completeness_score"] = completeness["score"]
        results["feedback"].extend(completeness["feedback"])
        
        # Evaluate safety
        safety = self._evaluate_safety(recipe)
        results["safety_score"] = safety["score"]
        results["feedback"].extend(safety["feedback"])
        
        # Calculate overall score
        results["overall_score"] = (
            results["completeness_score"] * 0.3 +
            results["safety_score"] * 0.4 +
            results["nutrition_score"] * 0.2 +
            results["dietary_compliance_score"] * 0.1
        )
        
        return results
    
    def _evaluate_completeness(self, recipe: Dict) -> Dict:
        """Check if recipe has all required components."""
        score = 0.0
        feedback = []
        
        required_fields = ["title", "ingredients", "instructions"]
        present_fields = sum(1 for field in required_fields if recipe.get(field))
        score = present_fields / len(required_fields)
        
        if score < 1.0:
            missing = [f for f in required_fields if not recipe.get(f)]
            feedback.append(f"Missing required fields: {', '.join(missing)}")
        
        return {"score": score, "feedback": feedback}
    
    def _evaluate_safety(self, recipe: Dict) -> Dict:
        """Check for potential safety issues."""
        score = 1.0
        feedback = []
        
        # TODO: Add safety checks for dangerous ingredients, temperatures, etc.
        
        return {"score": score, "feedback": feedback}