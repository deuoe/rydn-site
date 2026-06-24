/**
 * Generate one .pkpass file per RYDN advisor.
 *
 * Inputs (must exist before running):
 *   ./RYDN_Pass.p12              — your Pass Type ID signing certificate
 *   ./.env                       — PASS_CERT_PASSWORD + APPLE_TEAM_ID
 *   ./AppleWWDRCAG4.cer          — Apple WWDR intermediate cert (public download)
 *   ./RYDN_pass_header.png       — branded logo for the top of the pass
 *   ./RYDN_pass_background.png   — gradient strip image
 *   ../src/assets/images/Logo.jpg — circular Rooz logo for the small icon
 *
 * Output:
 *   ./output/<advisor-slug>.pkpass — one per advisor, ready to email
 *
 * Usage:
 *   npm install            # one time
 *   node generate-passes.mjs
 *
 * Distribute by emailing each advisor their file as an attachment.
 */

import { PKPass } from "passkit-generator"
import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"

dotenv.config()

// ============================================================
// Config
// ============================================================
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// passkit-generator needs PEM-formatted certs (text), not the binary .p12 / .cer
// files Apple gives you directly. Run these OpenSSL conversions once:
//
//   openssl x509 -inform DER -in AppleWWDRCAG4.cer -out AppleWWDRCAG4.pem
//   openssl pkcs12 -in RYDN_Pass.p12 -clcerts -nokeys -out signerCert.pem -passin pass:YOURPASS -legacy
//   openssl pkcs12 -in RYDN_Pass.p12 -nocerts -out signerKey.pem -passin pass:YOURPASS -passout pass:YOURPASS -legacy
//
// (See README.md for the full setup.)
const WWDR_PEM = path.join(__dirname, "AppleWWDRCAG4.pem")
const SIGNER_CERT_PEM = path.join(__dirname, "signerCert.pem")
const SIGNER_KEY_PEM = path.join(__dirname, "signerKey.pem")

const OUTPUT_DIR = path.join(__dirname, "output")

const SOURCE_ICON = path.join(__dirname, "../src/assets/images/Logo.jpg")
const SOURCE_LOGO = path.join(__dirname, "RYDN_pass_header.png")
const SOURCE_STRIP = path.join(__dirname, "RYDN_pass_background.png")

const PASS_TYPE_ID = "pass.ca.rydn.advisor"
const TEAM_ID = process.env.APPLE_TEAM_ID
const SIGNER_PASSWORD = process.env.PASS_CERT_PASSWORD

if (!TEAM_ID || !SIGNER_PASSWORD) {
  console.error(
    "✗ Missing environment variables. Copy .env.example to .env and fill in APPLE_TEAM_ID + PASS_CERT_PASSWORD."
  )
  process.exit(1)
}

// ============================================================
// Advisor data
// ============================================================
//
// Mirror of src/data/advisors.ts (the React app's source of truth). Keep these
// two in sync when an advisor is added/edited. We don't import from .ts here
// because it requires extra tooling — for 14 rows, manual sync is fine.

const ADVISORS = [
  { slug: "ilia",            name: "Ilia",            role: "Bachelor of Commerce student",  topics: ["Information Technology", "Soccer", "Business"], universities: ["York U"] },
  { slug: "sahar",           name: "Sahar",           role: "Bachelor of Arts student",      topics: ["Psychology", "Political science", "LSAT prep"], universities: ["York U"] },
  { slug: "sara-roozbahani", name: "Sara Roozbahani", role: "Bachelor of Science student",   topics: ["Pre-med advising", "MCAT", "Research"], universities: ["Seneca", "York U"] },
  { slug: "sam-sina",        name: "Sam Sina",        role: "Co-founder & Advisor",          topics: ["Biomedical Sciences", "Research", "Pharmacy School"], universities: ["U of Guilan", "George Brown", "York U"] },
  { slug: "sadaf",           name: "Sadaf",           role: "Bachelor of Science student",   topics: ["Biomedical Science", "DAT Prep", "Pre-dent Advising"], universities: ["TMU"] },
  { slug: "helia",           name: "Helia",           role: "Bachelor of Science student",   topics: ["Neuroscience", "MCAT", "Pre-med"], universities: ["York U"] },
  { slug: "iliya",           name: "Iliya",           role: "Bachelor of Science student",   topics: ["Biomedical Science", "Pre-med", "Fitness"], universities: ["York U"] },
  { slug: "jennifer",        name: "Jennifer",        role: "Nursing student",               topics: ["Nursing", "Study strategies"], universities: ["Seneca"] },
  { slug: "tina",            name: "Tina",            role: "Bachelor of Science student",   topics: ["Pre-med advising", "Biomedical Science"], universities: ["York U"] },
  { slug: "valentina",       name: "Valentina",       role: "Bachelor of Science student",   topics: ["Psychology", "French", "Biology", "Research"], universities: ["York U"] },
  { slug: "iman",            name: "Iman",            role: "Bachelor of Arts student",      topics: ["Psychology", "Game Development"], universities: ["York U"] },
  { slug: "pardis",          name: "Pardis",          role: "Bachelor of Science student",   topics: ["Health Sciences", "Pre-med", "Uni/life balance"], universities: ["SFU"] },
  { slug: "mahan",           name: "Mahan",           role: "Health Sciences student",       topics: ["Health Sciences", "Uni applications", "Pre-med"], universities: ["U of T"] },
  { slug: "sara-arts",       name: "Sara",            role: "Bachelor of Arts student",      topics: ["History", "English", "Nutrition", "Fitness"], universities: ["George Brown", "York U"] },
]

// ============================================================
// Pre-build all image variants once (they're the same for every advisor)
// ============================================================

async function buildImageMap() {
  console.log("→ Building image assets for Apple Wallet …")

  // ICON — small Rooz circular logo (shows in notifications + pass header).
  // Cropped square from the source Logo.jpg.
  const icon3x = await sharp(SOURCE_ICON).resize(87, 87, { fit: "cover" }).png().toBuffer()
  const icon2x = await sharp(SOURCE_ICON).resize(58, 58, { fit: "cover" }).png().toBuffer()
  const icon   = await sharp(SOURCE_ICON).resize(29, 29, { fit: "cover" }).png().toBuffer()

  // LOGO — clean white "RYDN" wordmark on TRANSPARENT background.
  // Generated from SVG so it stays crisp at every size. The previous version
  // used the pre-rendered RYDN_pass_header.png which had a baked-in gradient,
  // which looked busy when stacked on top of the strip image's gradient.
  // This version is pure typography — lets the strip image carry the color.
  const logoSvg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 480 150">
    <text x="0" y="115"
          font-family="Helvetica, Arial, sans-serif"
          font-size="120"
          font-weight="900"
          letter-spacing="8"
          fill="white">RYDN</text>
  </svg>`
  const logo3x = await sharp(Buffer.from(logoSvg(480, 150))).png().toBuffer()
  const logo2x = await sharp(Buffer.from(logoSvg(320, 100))).png().toBuffer()
  const logo   = await sharp(Buffer.from(logoSvg(160, 50))).png().toBuffer()

  // STRIP — the colored gradient band shown across the middle of the pass.
  // Source is 1125x432; Apple wants 375x123 (1x), 750x246 (2x), 1125x369 (3x).
  const strip3x = await sharp(SOURCE_STRIP).resize(1125, 369, { fit: "cover" }).png().toBuffer()
  const strip2x = await sharp(SOURCE_STRIP).resize(750, 246, { fit: "cover" }).png().toBuffer()
  const strip   = await sharp(SOURCE_STRIP).resize(375, 123, { fit: "cover" }).png().toBuffer()

  return {
    "icon.png": icon, "icon@2x.png": icon2x, "icon@3x.png": icon3x,
    "logo.png": logo, "logo@2x.png": logo2x, "logo@3x.png": logo3x,
    "strip.png": strip, "strip@2x.png": strip2x, "strip@3x.png": strip3x,
  }
}

// ============================================================
// Build one pass for one advisor
// ============================================================

function passJsonFor(advisor) {
  return {
    formatVersion: 1,
    passTypeIdentifier: PASS_TYPE_ID,
    teamIdentifier: TEAM_ID,
    organizationName: "RooZ Youth Development Network",
    description: "RYDN Advisor Pass",
    serialNumber: advisor.slug,

    // RYDN brand colors. Apple uses these for background and text contrast.
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(255, 220, 130)",      // warm amber for field labels
    backgroundColor: "rgb(14, 79, 163)",   // deep RYDN blue (matches the strip)

    // No `logoText` — the logo image itself is now the white "RYDN" wordmark,
    // so adding logoText would duplicate the brand name on the pass.

    // QR code on the back — links to the advisor's RYDN profile.
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: `https://rydn.ca/advisors/${advisor.slug}`,
        messageEncoding: "iso-8859-1",
        altText: `rydn.ca/advisors/${advisor.slug}`,
      },
    ],

    // The actual card layout — using "storeCard" because it allows the strip
    // image which is what gives us the branded gradient feel.
    storeCard: {
      primaryFields: [
        { key: "name", label: "ADVISOR", value: advisor.name },
      ],
      secondaryFields: [
        { key: "role", label: "ROLE", value: advisor.role },
      ],
      auxiliaryFields: [
        { key: "education", label: "EDUCATION", value: advisor.universities.join(" · ") },
      ],
      backFields: [
        { key: "specializations", label: "Specializations", value: advisor.topics.join(", ") },
        { key: "education_full", label: "Education", value: advisor.universities.join(" · ") },
        { key: "issued", label: "Issued", value: new Date().getFullYear().toString() },
        { key: "profile", label: "Profile", value: `https://rydn.ca/advisors/${advisor.slug}` },
        { key: "issuer", label: "Issued by", value: "RooZ Youth Development Network · Réseau de développement de la jeunesse RooZ" },
        { key: "verify", label: "Verify", value: "Scan the QR code on the front to verify this advisor on rydn.ca." },
      ],
    },
  }
}

// ============================================================
// Main
// ============================================================

async function main() {
  // Sanity checks
  for (const f of [WWDR_PEM, SIGNER_CERT_PEM, SIGNER_KEY_PEM, SOURCE_ICON, SOURCE_LOGO, SOURCE_STRIP]) {
    if (!fs.existsSync(f)) {
      console.error(`✗ Missing file: ${f}`)
      console.error("  See ./README.md for how to generate each file.")
      process.exit(1)
    }
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const imageBuffers = await buildImageMap()
  const wwdrBuffer = fs.readFileSync(WWDR_PEM)
  const signerCertBuffer = fs.readFileSync(SIGNER_CERT_PEM)
  const signerKeyBuffer = fs.readFileSync(SIGNER_KEY_PEM)

  console.log(`→ Generating ${ADVISORS.length} passes …\n`)

  for (const advisor of ADVISORS) {
    const passJson = passJsonFor(advisor)

    const pass = new PKPass(
      {
        // Pass.json + all image files, supplied as in-memory buffers
        "pass.json": Buffer.from(JSON.stringify(passJson, null, 2)),
        ...imageBuffers,
      },
      {
        wwdr: wwdrBuffer,
        signerCert: signerCertBuffer,
        signerKey: signerKeyBuffer,
        signerKeyPassphrase: SIGNER_PASSWORD,
      }
    )

    const buffer = pass.getAsBuffer()
    const outPath = path.join(OUTPUT_DIR, `${advisor.slug}.pkpass`)
    fs.writeFileSync(outPath, buffer)
    console.log(`  ✓ ${advisor.slug}.pkpass  (${advisor.name})`)
  }

  console.log(`\n→ Done. ${ADVISORS.length} passes saved to ./output/`)
  console.log("→ Open the folder in Finder, email each advisor their file as an attachment.")
  console.log("→ They tap the attachment on iPhone → Add to Wallet → done.")
}

main().catch((err) => {
  console.error("✗ Pass generation failed:")
  console.error(err)
  process.exit(1)
})
