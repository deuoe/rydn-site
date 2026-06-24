# RYDN Wallet Pass Generator

Generates one `.pkpass` file per advisor — drag onto an iPhone (or open from email)
and it adds to Apple Wallet.

## Prerequisites (one-time setup)

1. **`RYDN_Pass.p12`** — your signing certificate from Apple Developer.
   *(Should already be in this folder. If not, see Phase A in the chat history.)*

2. **`AppleWWDRCAG4.cer`** — Apple's intermediate Worldwide Developer Relations
   certificate. Download:

   ```
   curl -o AppleWWDRCAG4.cer https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer
   ```

3. **`.env`** — your environment variables. Copy from the example and edit:

   ```
   cp .env.example .env
   ```

   Then open `.env` in a text editor and set:
   - `PASS_CERT_PASSWORD` to the password you set when exporting `.p12`
   - `APPLE_TEAM_ID` to your 10-character Apple team ID

4. **Node.js dependencies**:

   ```
   npm install
   ```

   This installs `passkit-generator`, `sharp` (for image resizing), and `dotenv`.

## Run

```
node generate-passes.mjs
```

Or:

```
npm run build
```

Output goes to `./output/<advisor-slug>.pkpass`. There are 14 files — one per advisor.

## Distributing

For each advisor:
1. Compose a new email to the advisor
2. Attach their `.pkpass` file from `output/`
3. Send

When they open the email on their iPhone, tapping the attachment opens it in
Apple Wallet with an "Add" button.

## When you add a new advisor

1. Update `src/data/advisors.ts` (the website's data)
2. Mirror the same advisor entry in `generate-passes.mjs` (the `ADVISORS` array)
3. Re-run `node generate-passes.mjs`
4. Email the new advisor their pass

## Files in this folder

| File | Status | Notes |
|---|---|---|
| `RYDN_Pass.p12` | secret | Signing cert. Git-ignored. |
| `.env` | secret | Password + team ID. Git-ignored. |
| `AppleWWDRCAG4.cer` | public | Apple's public cert. Safe to commit. |
| `generate-passes.mjs` | code | The generator. |
| `RYDN_pass_header.png` | asset | Logo for top of pass. |
| `RYDN_pass_background.png` | asset | Gradient strip image. |
| `output/*.pkpass` | output | Generated. Git-ignored. |
