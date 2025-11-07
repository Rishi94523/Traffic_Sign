# Branch Protection Configuration Guide

This document provides step-by-step instructions for configuring branch protection rules in GitHub.

## Accessing Branch Protection Settings

1. Go to your GitHub repository
2. Click on **Settings** (top navigation bar)
3. Click on **Branches** (left sidebar)
4. Under **Branch protection rules**, click **Add rule** or edit existing rule for `main`

## Required Configuration

### 1. Branch Name Pattern
- **Pattern**: `main`
- This applies the rules to the `main` branch

### 2. Require a Pull Request Before Merging

✅ **Enable**: "Require a pull request before merging"

**Required Settings:**
- ✅ **Require approvals**: `1` (minimum number of reviewers)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**: Enabled
- ✅ **Require review from Code Owners**: Optional (if you have CODEOWNERS file)

### 3. Require Status Checks to Pass Before Merging

✅ **Enable**: "Require status checks to pass before merging"

**Required Status Checks:**
- ✅ `Backend CI / test` - Must pass
- ✅ `Frontend CI / test` - Must pass

**Additional Settings:**
- ✅ **Require branches to be up to date before merging**: Enabled
  - This ensures the branch is up to date with the base branch before merging

### 4. Restrict Who Can Push to Matching Branches

✅ **Enable**: "Restrict pushes that create files larger than 100 MB"

**Note**: This prevents accidental large file uploads

### 5. Block Force Pushes

✅ **Enable**: "Block force pushes"

**Settings:**
- ✅ **Block force pushes**: Enabled
- ✅ **Block force pushes for all users**: Recommended

### 6. Block Deletions

✅ **Enable**: "Block deletion of protected branches"

This prevents accidental deletion of the main branch.

## Recommended Additional Settings

### Include Administrators
✅ **Enable**: "Do not allow bypassing the above settings"

This ensures even repository administrators must follow the rules.

### Allow Force Pushes
❌ **Disable**: Leave unchecked

### Allow Deletions
❌ **Disable**: Leave unchecked

## Summary Checklist

Before saving, verify:

- [ ] Branch name pattern: `main`
- [ ] Require pull request: Enabled (1 approval minimum)
- [ ] Require status checks: Enabled
  - [ ] `Backend CI / test` is checked
  - [ ] `Frontend CI / test` is checked
  - [ ] "Require branches to be up to date" is enabled
- [ ] Block force pushes: Enabled
- [ ] Block deletions: Enabled
- [ ] Include administrators: Enabled (recommended)

## Testing the Configuration

After configuring:

1. Create a test branch
2. Make a change and create a PR to `main`
3. Verify that:
   - PR cannot be merged without approval
   - PR cannot be merged if CI checks fail
   - Force push to `main` is blocked
   - Direct commits to `main` are blocked

## Troubleshooting

### Status Checks Not Appearing

- Ensure workflows are named correctly: "Backend CI" and "Frontend CI"
- Run the workflows at least once to register them
- Check that workflows are in `.github/workflows/` directory

### Cannot Merge PR

- Check that all required status checks have passed
- Ensure at least one approval is given
- Verify branch is up to date with `main`

### Force Push Still Works

- Verify "Block force pushes" is enabled
- Check "Include administrators" is enabled if you're an admin
- Try force pushing to confirm it's blocked

