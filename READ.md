# Associate Error Portal

This is a Google Apps Script–based portal where associates can:
- View their weekly audit errors
- Accept or contest errors
- Data is filtered by Google login and week number

## Structure
- `Code.gs`: Backend logic
- `index.html`: UI with dropdown and action buttons
- `appsscript.json`: Project manifest

## How to Deploy
1. Clone this repo
2. Install clasp: `npm install -g @google/clasp`
3. Run `clasp login`
4. Run `clasp push`
5. Deploy as web app:
   - Execute as: User accessing
   - Access: Anyone in your org
