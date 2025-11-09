# Vercel Deployment Checklist ✅

This checklist will help you successfully deploy your Traffic Sign Recognition app to Vercel.

## ✅ What We Fixed

1. **CORS Configuration** - Updated `backend/app.py` to automatically handle CORS for both local development and Vercel production
2. **Health Endpoint** - Added `/api/health` endpoint to match frontend expectations
3. **vercel.json** - Improved configuration with:
   - Proper API path rewrites (`:path*` instead of `(.*)`)
   - Explicit CORS headers
   - Increased function timeout to 60 seconds for Gemini API calls
4. **Dependencies** - Added `pydantic` to `api/requirements.txt`
5. **Vercel Ignore** - Created `.vercelignore` to exclude unnecessary files

## 📋 Pre-Deployment Steps

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Test Locally (Optional but Recommended)

```bash
# Terminal 1 - Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 and upload a test image to ensure everything works.

## 🚀 Deployment Steps

### Option A: Deploy via Vercel CLI (Recommended)

1. **Navigate to project root:**
   ```bash
   cd f:\Projects\seprojectfinal
   ```

2. **Deploy to Preview (Test First):**
   ```bash
   vercel
   ```
   
   During prompts:
   - Select your Vercel account/team
   - Confirm project name
   - Accept default settings

3. **Test the Preview Deployment:**
   - Visit the preview URL provided (e.g., `https://your-project-xxx.vercel.app`)
   - Test image upload and classification
   - Check browser console for any errors

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "fix: configure for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

## ⚙️ Configure Environment Variables (Optional)

If you want to use Google Gemini for real classification:

### Via CLI:
```bash
vercel env add GEMINI_API
# Then paste your API key when prompted
# Select: Production, Preview, Development (all 3)
```

### Via Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - Name: `GEMINI_API`
   - Value: `your_actual_api_key_here`
   - Scope: Production, Preview, Development

## 🔍 Verification Steps

After deployment, verify:

1. **Frontend Loads:**
   - Visit `https://your-project.vercel.app`
   - Should see the Traffic Sign Recognition interface

2. **API Health Check:**
   - Visit `https://your-project.vercel.app/api/health`
   - Should see: `{"status": "ok", "message": "API is running"}`

3. **Upload & Classify:**
   - Upload a test image (JPG or PNG, < 10MB)
   - Should receive classification results with confidence scores

4. **Check Logs (if issues):**
   ```bash
   vercel logs <your-deployment-url>
   ```

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend server"
- **Solution**: Check that `/api/health` endpoint responds correctly
- Run: `curl https://your-project.vercel.app/api/health`

### Issue: CORS errors in browser console
- **Solution**: Already fixed! CORS is now configured for Vercel
- Verify `vercel.json` has the CORS headers section

### Issue: Function timeout (504 error)
- **Solution**: Already increased timeout to 60s in `vercel.json`
- If using Gemini API, ensure API key is set correctly

### Issue: "Module not found" errors
- **Solution**: Check that `api/requirements.txt` includes all dependencies
- Redeploy: `vercel --prod`

### Issue: Images not uploading
- **Solution**: Check file size (<10MB) and format (JPG/PNG only)
- Check browser console for detailed error messages

### Issue: Classification returns stubbed results
- **Solution**: This is expected if `GEMINI_API` env var is not set
- Set the environment variable to use real Gemini classification

## 📊 Performance Tips

1. **Gemini API Key**: Set for production to use real AI classification
2. **Monitor Usage**: Check Vercel dashboard for function invocations
3. **Logs**: Use `vercel logs` to debug issues in production

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional):
   ```bash
   vercel domains add yourdomain.com
   ```

2. **Monitor Performance**:
   - Check Vercel dashboard for analytics
   - Monitor function execution times
   - Check error rates

3. **Continuous Deployment**:
   - Push to `main` branch → Auto-deploys to production
   - Push to other branches → Auto-creates preview deployments

## 📝 Important Notes

- ✅ **vercel.json is REQUIRED** - It configures both frontend build and backend serverless functions
- ✅ **CORS is automatic** - Configured to work on Vercel out of the box
- ✅ **No separate backend hosting needed** - Everything runs on Vercel
- ✅ **Environment variables** are encrypted and secure in Vercel
- ⚠️ **Free tier limits**: Check Vercel's free tier limits for your usage

## 🔗 Useful Commands

```bash
# List all deployments
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Remove a deployment
vercel rm <deployment-name>

# View environment variables
vercel env ls

# Pull environment variables to local
vercel env pull
```

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Frontend loads without errors
- ✅ `/api/health` returns 200 OK
- ✅ Image upload works
- ✅ Classification returns results (stubbed or real)
- ✅ No CORS errors in browser console
- ✅ All routes work correctly

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- FastAPI on Vercel: https://vercel.com/docs/frameworks/fastapi
- Your Project Docs: `docs/DEPLOYMENT_VERCEL.md`

