# Recipe Bot

A comprehensive framework for evaluating and generating recipe recommendations using AI language models.

## Overview

Recipe Bot is a Python-based tool that leverages AI models to analyze, generate, and evaluate recipe recommendations. The project provides systematic evaluation methods for recipe quality, dietary preferences, and nutritional accuracy.

## Features

- Recipe generation using multiple AI models via OpenRouter API
- Systematic evaluation of recipe quality and accuracy
- Dietary preference and restriction handling
- Nutritional analysis and validation
- Interactive web interface for recipe exploration
- Statistical analysis of recipe recommendations

## Project Structure

```
recipe-bot/
├── docs/           # Documentation and guides
├── examples/       # Example usage and sample recipes
├── notebooks/      # Jupyter notebooks for analysis
├── src/           # Source code
│   └── recipe_bot/ # Main package
├── tests/         # Unit tests
├── website/       # Web interface
└── README.md      # This file
```

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```python
from recipe_bot import RecipeBot

bot = RecipeBot()
recipe = bot.generate_recipe("pasta with vegetables", dietary_preferences=["vegetarian"])
print(recipe)
```

## Requirements

- Python 3.8+
- OpenRouter API key
- See `requirements.txt` for full dependencies

## License

MIT License - see LICENSE file for details.

## Citation

```bibtex
@software{recipe_bot_2025,
  title={Recipe Bot: AI-Powered Recipe Generation and Evaluation},
  author={Your Name},
  year={2025},
  url={https://github.com/yourusername/recipe-bot}
}
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.