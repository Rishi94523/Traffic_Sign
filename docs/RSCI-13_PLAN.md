# Plan of Action: Display Confidence Score (RSCI-13)

## 📋 Task Overview
**Jira Ticket:** RSCI-13  
**Title:** Display Confidence Score  
**Description:** As a user, I want to see how confident the model is about its prediction so that I can gauge reliability.  
**Priority:** Highest  
**Story Points:** 5

## 🔍 Current State Analysis

### Backend (✅ Already Implemented)
- **`classification_service.py`**: Returns confidence score (0-1) in the classification result
  - `confidence`: float value between 0-1
  - `all_classes`: list of all predictions with confidence scores
- **`classification_routes.py`**: `/api/classification/classify` endpoint returns confidence in response
  - Response includes: `classification`, `confidence`, `all_classes`, `filename`

### Frontend (✅ Partially Implemented)
- **`ClassificationResult.jsx`**: Currently displays confidence score
  - Shows confidence as percentage (e.g., "Confidence: 85.5%")
  - Has a visual progress bar
  - Shows all predictions with confidence scores
- **`ClassificationResult.css`**: Basic styling for confidence display

### Data Flow
1. User uploads image → `ImageUpload` component
2. User clicks "Classify Image" → `ImagePreview` component
3. `ImagePreview` calls `classifyImage()` API → `classificationAPI.js`
4. API sends request to `/api/classification/classify` → Backend
5. Backend returns result with `confidence` field
6. Result passed to `ClassificationResult` component → Displays confidence

## 🎯 Enhancement Plan

### Goal
Make the confidence score more prominent, user-friendly, and informative so users can easily gauge the reliability of predictions.

### Enhancements Needed

#### 1. **Visual Prominence** (Frontend)
- Make confidence score more visually prominent
- Add larger, bold confidence percentage display
- Add confidence level indicators (High/Medium/Low)

#### 2. **Color Coding** (Frontend)
- **High Confidence (≥80%)**: Green color scheme
- **Medium Confidence (50-79%)**: Yellow/Orange color scheme
- **Low Confidence (<50%)**: Red color scheme
- Apply color coding to confidence bar and text

#### 3. **User-Friendly Labels** (Frontend)
- Add text labels: "High Confidence", "Medium Confidence", "Low Confidence"
- Add tooltip/help text explaining what confidence means
- Show confidence level badge/icon

#### 4. **Enhanced Visual Design** (Frontend)
- Improve confidence bar design with color gradients
- Add confidence percentage in larger, more readable font
- Add visual indicators (icons) for confidence levels

#### 5. **Backend Verification** (Backend)
- Verify confidence score is always returned (0-1 range)
- Ensure confidence calculation is correct
- Add validation if needed

#### 6. **Testing** (Both)
- Add unit tests for confidence score display
- Test different confidence levels (high, medium, low)
- Test edge cases (0%, 100%, missing confidence)

## 📝 Implementation Steps

### Step 1: Create Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/display-confidence-score
```

### Step 2: Enhance Frontend Component
- **File:** `frontend/src/components/ClassificationResult.jsx`
- **Changes:**
  - Add confidence level calculation (High/Medium/Low)
  - Add color coding based on confidence level
  - Enhance visual display with larger percentage
  - Add confidence level badge/indicator
  - Improve accessibility

### Step 3: Enhance CSS Styling
- **File:** `frontend/src/components/ClassificationResult.css`
- **Changes:**
  - Add color schemes for different confidence levels
  - Enhance confidence bar with gradients
  - Add styling for confidence level badges
  - Improve responsive design

### Step 4: Verify Backend
- **File:** `backend/services/classification_service.py`
- **Action:** Verify confidence is always returned (0-1)
- **File:** `backend/routes/classification_routes.py`
- **Action:** Verify confidence is included in response

### Step 5: Add Tests
- **Frontend:** `frontend/src/__tests__/ClassificationResult.test.jsx`
  - Test confidence display for different levels
  - Test color coding
  - Test edge cases
- **Backend:** Verify existing tests cover confidence

### Step 6: Commit and Push
- Follow conventional commit format
- Push to feature branch
- Create PR to main

## 🎨 Design Specifications

### Confidence Levels
- **High (≥80%)**: 
  - Color: Green (#10b981, #059669)
  - Label: "High Confidence"
  - Icon: ✓ or 🟢
  
- **Medium (50-79%)**: 
  - Color: Yellow/Orange (#f59e0b, #d97706)
  - Label: "Medium Confidence"
  - Icon: ⚠ or 🟡
  
- **Low (<50%)**: 
  - Color: Red (#ef4444, #dc2626)
  - Label: "Low Confidence"
  - Icon: ⚠ or 🔴

### Visual Elements
- Large confidence percentage (e.g., "85.5%")
- Confidence level badge with text
- Color-coded progress bar
- Smooth transitions/animations

## ✅ Acceptance Criteria
- [ ] Confidence score is prominently displayed
- [ ] Confidence level (High/Medium/Low) is clearly shown
- [ ] Color coding is applied based on confidence level
- [ ] Visual design is user-friendly and accessible
- [ ] All confidence levels are tested
- [ ] Backend returns confidence correctly
- [ ] Tests pass in CI/CD
- [ ] PR is created and ready for review

## 📚 Related Files
- `frontend/src/components/ClassificationResult.jsx`
- `frontend/src/components/ClassificationResult.css`
- `backend/services/classification_service.py`
- `backend/routes/classification_routes.py`
- `frontend/src/__tests__/ClassificationResult.test.jsx` (to be created)

## 🔗 Related Tickets
- RSCI-2: Classification & Results (Parent)
- RSCI-10: Send image to API for classification
- RSCI-12: Display predicted sign name prominently

