# Contributing Guide

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types without justification
- Proper error handling
- Type exports for public APIs

### Git Workflow
1. Create feature branch: `git checkout -b feature/description`
2. Make changes with meaningful commits
3. Create pull request with description
4. Code review required before merge
5. CI/CD pipeline must pass

### Pull Request Requirements
- Descriptive title and description
- Tests for new features
- Documentation updates
- No breaking changes without discussion
- Squash commits before merge

## Testing

```bash
# Run tests
yarn test

# Watch mode
yarn test:watch

# Coverage
yarn test:coverage
```

## Coding Guidelines

### Backend
- Use async/await
- Implement proper error handling
- Add request logging
- Validate all inputs
- Document complex logic

### Frontend
- Use functional components
- Implement proper state management
- Add loading and error states
- Optimize performance
- Mobile-first responsive design

## Commit Messages

Format: `type(scope): description`

Types: feat, fix, docs, style, refactor, test, chore

Example: `feat(quiz): add auto-grading feature`

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Tag release: `git tag v1.0.0`
5. Push to main
6. GitHub Actions creates release

## License

MIT License - See LICENSE file
