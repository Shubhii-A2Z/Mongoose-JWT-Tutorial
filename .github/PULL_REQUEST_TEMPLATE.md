## 🔍 What does this PR do?
<!-- Briefly describe the change -->

---

## 🧩 Related Issue(s)
<!-- Link issues this PR addresses -->
Fixes #ISSUE_NUMBER  

---

## 🧪 How to Test (Steps to Verify)
<!-- Clear steps reviewers can follow locally or via API -->
1. Checkout this branch
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start the app: `npm run dev`
5. Test API:
   - `POST /person` with valid payload
   - Verify status `201` and token is returned
6. (Optional) Try invalid payload and verify `400` response

---

## 🔄 Type of Change
<!-- Select one -->
- [ ] ✨ New feature
- [ ] 🐛 Bug fix
- [ ] ♻️ Refactor (no functional change)
- [ ] 🧹 Chore (CI, tooling, deps)
- [ ] ⚠️ Breaking change

---

## ✅ Quality Checklist
<!-- Must be checked before requesting review -->
- [ ] Self-reviewed the code
- [ ] Added/updated unit tests
- [ ] All tests passing locally
- [ ] No console logs / debug code left
- [ ] Error handling added where needed
- [ ] API contract updated (if applicable)
- [ ] Docs/README updated (if needed)
- [ ] No secrets committed

---

## 🚨 Breaking Changes
<!-- If yes, describe impact and migration steps -->
- [ ] Yes
- [ ] No

If yes, describe:
- Impact:
- Migration steps:

---

## 📸 Screenshots / Logs (if applicable)
<!-- Add screenshots, logs, or curl responses -->

---

## 📝 Additional Notes
<!-- Anything reviewers should know -->
