# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). The pipeline automatically runs tests, generates coverage reports, builds the application, and creates deployment artifacts.

## Workflow Structure

The CI/CD setup consists of three main workflows:

1. **Backend CI** (`.github/workflows/backend-ci.yml`)
2. **Frontend CI** (`.github/workflows/frontend-ci.yml`)
3. **Deployment Pipeline** (`.github/workflows/deploy.yml`)

## Workflow Details

### 1. Backend CI

**Triggers:**
- Push to `main` or `develop` branches (when backend files change)
- Pull requests to `main` or `develop` (when backend files change)

**What it does:**
- Installs Python dependencies
- Runs pytest with coverage reporting
- Generates HTML and XML coverage reports
- Uploads coverage reports as artifact: `backend-coverage`

**Commands:**
```bash
pytest --cov=. --cov-report=xml --cov-report=html --cov-report=term
```

**Artifacts:**
- `backend-coverage`: Contains HTML coverage report (`htmlcov/`) and XML report (`coverage.xml`)

### 2. Frontend CI

**Triggers:**
- Push to `main` or `develop` branches (when frontend files change)
- Pull requests to `main` or `develop` (when frontend files change)

**What it does:**
- Installs Node.js dependencies
- Runs ESLint (continues on errors)
- Runs Vitest tests with coverage
- Builds the frontend application
- Uploads coverage and build artifacts

**Artifacts:**
- `frontend-coverage`: Test coverage reports
- `frontend-build`: Built frontend application (`dist/` folder)

### 3. Deployment Pipeline

**Triggers:**
- Push to `main` branch (when backend or frontend files change)
- After successful completion of Backend CI and Frontend CI workflows

**What it does:**
- Downloads backend and frontend artifacts
- Creates a deployment package (ZIP file)
- Includes backend code and frontend build
- Uploads deployment package as artifact: `deploy-package`

**Artifacts:**
- `deploy-package`: ZIP file containing backend and frontend ready for deployment

**Deployment Options:**

#### Option A: Manual Deployment
1. Download `deploy-package.zip` from GitHub Actions artifacts
2. Extract the package
3. Deploy `backend/` to your hosting service (Render.com, Railway, etc.)
4. Deploy `frontend-dist/` to static hosting (Netlify, Vercel, etc.)

#### Option B: Automated Deployment (Future)
- Configure Render.com webhook for backend deployment
- Configure Netlify/Vercel build hooks for frontend deployment
- Add deployment steps to the workflow

## Artifacts

### Backend Coverage
- **Name**: `backend-coverage`
- **Contents**: 
  - `htmlcov/` - HTML coverage report (view in browser)
  - `coverage.xml` - XML coverage report (for tools like Codecov)
- **Retention**: 30 days

### Frontend Coverage
- **Name**: `frontend-coverage`
- **Contents**: 
  - `coverage/` - Vitest coverage reports
- **Retention**: 30 days

### Frontend Build
- **Name**: `frontend-build`
- **Contents**: 
  - `dist/` - Production-ready frontend build
- **Retention**: 7 days

### Deployment Package
- **Name**: `deploy-package`
- **Contents**: 
  - `backend/` - Backend application code
  - `frontend-dist/` - Built frontend application
  - `DEPLOYMENT_INFO.txt` - Deployment metadata
- **Retention**: 90 days

## Running Tests Locally

### Backend Tests

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/ -v

# Run tests with coverage
pytest --cov=. --cov-report=html --cov-report=term tests/

# View HTML coverage report
# Open htmlcov/index.html in your browser
```

### Frontend Tests

```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:ci

# View coverage report
# Check coverage/ folder
```

## Branch Protection Configuration

To enable branch protection for `main` branch in GitHub:

1. Go to **Settings** → **Branches**
2. Click **Add rule** or edit existing rule for `main`
3. Configure the following:

### Required Settings:

✅ **Require a pull request before merging**
   - Check: "Require pull request reviews before merging"
   - Required approving reviews: `1`
   - Dismiss stale pull request approvals when new commits are pushed: `Enabled`

✅ **Require status checks to pass before merging**
   - Check: "Require status checks to pass before merging"
   - Required status checks:
     - `Backend CI / test`
     - `Frontend CI / test`
   - Check: "Require branches to be up to date before merging"

✅ **Restrict who can push to matching branches**
   - Check: "Restrict pushes that create files larger than 100 MB"

✅ **Block force pushes**
   - Check: "Block force pushes"

✅ **Block deletions**
   - Check: "Block deletion of protected branches"

### Recommended Additional Settings:

- **Require linear history**: Optional (prevents merge commits)
- **Include administrators**: Check this to apply rules to admins too
- **Allow force pushes**: Leave unchecked
- **Allow deletions**: Leave unchecked

## Workflow Status Checks

The following status checks must pass before merging:

- `Backend CI / test` - Backend tests and coverage
- `Frontend CI / test` - Frontend tests, lint, and build

## Viewing Coverage Reports

### Backend Coverage

1. Go to the GitHub Actions run
2. Click on the `Backend CI` workflow
3. Download the `backend-coverage` artifact
4. Extract and open `htmlcov/index.html` in your browser

### Frontend Coverage

1. Go to the GitHub Actions run
2. Click on the `Frontend CI` workflow
3. Download the `frontend-coverage` artifact
4. Extract and view coverage reports in the `coverage/` folder

## Troubleshooting

### Tests Failing

- Check the workflow logs in GitHub Actions
- Run tests locally to reproduce issues
- Ensure all dependencies are installed correctly

### Coverage Not Generating

- Verify `pytest-cov` is in `backend/requirements.txt`
- Verify `@vitest/coverage-v8` is in `frontend/package.json`
- Check that test files are being discovered

### Deployment Package Not Created

- Ensure both Backend CI and Frontend CI workflows completed successfully
- Check that artifacts were uploaded successfully
- Verify the deployment workflow triggered correctly

## CI/CD Best Practices

1. **Always run tests locally before pushing**
2. **Check coverage reports regularly** to maintain code quality
3. **Review workflow logs** if builds fail
4. **Keep dependencies updated** for security
5. **Use meaningful commit messages** for better traceability

## Future Improvements

- [ ] Add Codecov integration for coverage tracking
- [ ] Add automated deployment to Render.com/Netlify
- [ ] Add security scanning (Snyk, Dependabot)
- [ ] Add performance testing
- [ ] Add E2E testing with Playwright/Cypress

