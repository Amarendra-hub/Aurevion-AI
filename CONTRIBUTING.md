# Contributing to Aurevion AI

We love your input! We want to make contributing to Aurevion AI as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Getting Started

1. **Fork the repo** and clone it locally
```bash
git clone https://github.com/yourusername/Aurevion-AI.git
cd Aurevion-AI
```

2. **Create a branch** for your feature or fix
```bash
git checkout -b feature/your-feature-name
```

3. **Set up development environment**
   - Follow setup instructions in README.md
   - Install all dependencies
   - Create `.env` files from examples

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic

5. **Test your changes**
   - Test on different browsers/devices
   - Verify no console errors
   - Test API endpoints if changed

6. **Commit your changes**
```bash
git add .
git commit -m "feat: Add amazing new feature"
```

Use conventional commits:
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect code logic
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests

7. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

8. **Create a Pull Request**
   - Provide clear title and description
   - Link related issues
   - Include screenshots for UI changes
   - Explain your changes

## Code Style Guide

### Frontend (React/JavaScript)

```javascript
// Use functional components
export default function MyComponent() {
  return <div>Hello</div>
}

// Use const for variables
const myVariable = 'value'

// Use arrow functions
const handleClick = () => {
  // Handle click
}

// Use descriptive names
const getUserData = async () => {
  // ...
}
```

### Backend (Python/FastAPI)

```python
# Use type hints
from typing import Optional, List
from pydantic import BaseModel

# Define models clearly
class UserRequest(BaseModel):
    name: str
    email: str

# Use descriptive function names
async def create_user(user: UserRequest) -> dict:
    # Implementation
    pass

# Add docstrings
def process_data(data: str) -> str:
    """Process input data and return result."""
    return data
```

## Frontend Guidelines

- Use **functional components** with hooks
- Implement **responsive design** first
- Use **Tailwind CSS** for styling
- Add **loading states** for async operations
- Use **React Query** for data fetching
- Follow **component composition** patterns
- Keep components **small and focused**
- Use **descriptive prop names**

### Component Structure

```jsx
import { motion } from 'framer-motion'
import { useMutation } from 'react-query'

export default function MyComponent() {
  const [state, setState] = useState(null)
  const mutation = useMutation(apiCall)

  const handleAction = async () => {
    mutation.mutate(data)
  }

  return (
    <motion.div initial={{...}} animate={{...}}>
      {/* Component content */}
    </motion.div>
  )
}
```

## Backend Guidelines

- Use **async/await** for asynchronous operations
- Implement **error handling** properly
- Use **Pydantic models** for validation
- Add **API documentation** with docstrings
- Keep **routes clean and organized**
- Use **dependency injection** where appropriate
- Validate **user input** thoroughly
- Log **important actions**

### Router Structure

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ItemRequest(BaseModel):
    name: str

@router.post("/items")
async def create_item(item: ItemRequest):
    """Create a new item."""
    try:
        # Implementation
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Testing

### Frontend
- Test UI components visually
- Verify responsive layouts
- Test API integrations
- Check error states

### Backend
- Write unit tests for business logic
- Test API endpoints
- Verify error handling
- Test with edge cases

```bash
# Run backend tests
cd backend
pytest

# Run frontend tests (when added)
cd frontend
npm test
```

## Documentation

- Update README.md for major changes
- Add comments for complex code
- Document API endpoints
- Keep CHANGELOG.md updated

## Reporting Bugs

Use GitHub Issues with:
- **Clear title** describing the bug
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots/logs** if applicable
- **Environment** (OS, browser, version)

## Requesting Features

Use GitHub Issues with:
- **Feature description**
- **Use case/benefit**
- **Proposed solution** (optional)
- **Alternatives considered** (optional)

## Review Process

- Code reviews are collaborative
- Will request changes if needed
- Must pass all checks
- Requires approval from maintainers
- Squash commits before merging

## Community

- Be respectful and constructive
- Help others with issues
- Share knowledge and learnings
- Celebrate contributions

## License

By contributing, you agree your code will be licensed under the MIT License.

## Questions?

- Open a GitHub Issue for questions
- Check existing documentation
- Review closed issues for solutions

---

Thank you for contributing to Aurevion AI! 🚀
