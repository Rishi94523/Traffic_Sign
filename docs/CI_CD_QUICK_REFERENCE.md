# CI/CD Quick Reference

## Workflow Files

### 1. Backend CI (`.github/workflows/backend-ci.yml`)
- **Name**: Backend CI
- **Triggers**: Push/PR to main/develop (backend changes only)
- **Actions**: Install deps → Run tests with coverage → Upload coverage artifacts
- **Artifacts**: `backend-coverage` (HTML + XML reports)

### 2. Frontend CI (`.github/workflows/frontend-ci.yml`)
- **Name**: Frontend CI
- **Triggers**: Push/PR to main/develop (frontend changes only)
- **Actions**: Install deps → Lint → Test with coverage → Build → Upload artifacts
- **Artifacts**: `frontend-coverage`, `frontend-build`

### 3. Deployment Pipeline (`.github/workflows/deploy.yml`)
- **Name**: Deployment Pipeline
- **Triggers**: Push to main OR after Backend CI/Frontend CI complete
- **Actions**: Download artifacts → Create ZIP package → Upload deploy-package
- **Artifacts**: `deploy-package` (ZIP file)

## Branch Protection Checklist

Copy this checklist when configuring branch protection:

```
☐ Branch name pattern: main
☐ Require pull request: ✓ (1 approval minimum)
☐ Require status checks: ✓
  ☐ Backend CI / test
  ☐ Frontend CI / test
  ☐ Require branches to be up to date: ✓
☐ Block force pushes: ✓
☐ Block deletions: ✓
☐ Include administrators: ✓ (recommended)
```

## Status Check Names

When configuring branch protection, use these exact names:
- `Backend CI / test`
- `Frontend CI / test`

## Quick Commands

### View Coverage Locally

**Backend:**
```bash
cd backend
pytest --cov=. --cov-report=html tests/
open htmlcov/index.html  # macOS
start htmlcov/index.html  # Windows
```

**Frontend:**
```bash
cd frontend
npm run test:ci
# Check coverage/ folder
```

