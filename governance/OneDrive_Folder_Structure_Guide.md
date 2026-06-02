# RYDN OneDrive — Recommended Folder Structure

A clean, future-proof structure for storing RYDN's organizational documents in OneDrive (Microsoft 365). Funders, auditors, and partners can be granted access to specific folders without exposing everything.

---

## Top-level structure

```
RYDN/
├── 01_Governance/
│   ├── Bylaws/
│   ├── Board/
│   │   ├── Members/                     # Bios, contact info, term dates
│   │   ├── Meeting Minutes/             # One file per meeting (see naming below)
│   │   ├── Agendas/                     # Pre-meeting agendas
│   │   └── Annual Disclosures/          # Signed COI disclosure forms
│   ├── Policies/
│   │   ├── Code of Conduct for Advisors/
│   │   ├── Conflict of Interest Policy/
│   │   ├── Privacy Policy/
│   │   ├── Anti-Harassment Policy/      # (future)
│   │   └── Whistleblower Policy/        # (future)
│   └── Incorporation/
│       ├── Articles of Incorporation/
│       ├── CRA correspondence/          # If/when registered charity status applies
│       └── Annual filings/              # Ontario Corp annual returns
│
├── 02_Finance/
│   ├── Bank statements/                 # Monthly downloads
│   ├── Tax filings/                     # Annual T2/T3010 if charity
│   ├── Receipts/                        # All expense receipts
│   ├── Budgets/                         # Annual budget + variance reports
│   └── Donations/                       # Donation records, receipts issued
│
├── 03_Programs/
│   ├── Advisors/
│   │   ├── Signed Code of Conduct/      # Each advisor's signed copy
│   │   ├── Background Checks/           # Vulnerable sector record renewals
│   │   └── Onboarding/                  # Onboarding decks, scripts
│   ├── Workshops/
│   │   ├── Past events/
│   │   └── Upcoming/
│   ├── 1-on-1 Sessions/
│   │   └── Session logs/                # Aggregated, anonymized
│   └── Partnerships/
│       ├── TDSB/
│       ├── YRDSB/
│       └── Universities/
│
├── 04_Grants & Funding/
│   ├── Applications/
│   │   ├── In progress/
│   │   ├── Submitted/
│   │   └── Awarded/
│   ├── Reporting/                       # Progress reports for awarded grants
│   └── Boilerplate/                     # Reusable org descriptions, SDG one-pager
│
├── 05_Branding & Communications/
│   ├── Logos/
│   ├── Brand guidelines/
│   ├── Photos/                          # Advisor & student photos (with consent)
│   ├── Social media content/
│   ├── Press kit/
│   └── Templates/                       # PowerPoint, letterhead, email signatures
│
├── 06_Legal/
│   ├── Contracts/                       # Vendor + partner contracts
│   ├── Insurance/                       # Liability insurance certificates
│   └── MOUs/                            # Memoranda of understanding
│
├── 07_HR & People/                      # When you start having staff
│   ├── Job descriptions/
│   ├── Employment agreements/
│   └── Volunteer agreements/
│
└── 08_Technology/
    ├── Website/                         # Website credentials, deploy notes (not source code — that's GitHub)
    ├── App Store/                       # iOS App Store Connect credentials
    ├── Cloudflare/                      # Worker credentials
    └── Domain/                          # IONOS domain credentials
```

---

## File naming conventions

Use consistent names so files sort chronologically and are searchable.

### Board meeting minutes

```
YYYY-MM-DD_Board_Minutes_TYPE.docx

Examples:
2026-06-15_Board_Minutes_Regular.docx
2026-09-02_Board_Minutes_Special.docx
2026-11-20_Board_Minutes_AGM.docx
```

### Policies (when revised)

```
RYDN_PolicyName_vN.N_YYYY-MM.docx

Examples:
RYDN_Code_of_Conduct_v1.0_2026-06.docx
RYDN_Code_of_Conduct_v1.1_2026-12.docx
```

### Grants

```
YYYY_FunderName_GrantName_STATUS.pdf

Examples:
2026_Trillium_Seed_Grant_Submitted.pdf
2026_Trillium_Seed_Grant_Awarded.pdf
2026_GoC_CSJ_Application_Submitted.pdf
```

### Receipts & expenses

```
YYYY-MM-DD_Vendor_Description_$Amount.pdf

Examples:
2026-06-15_Cloudflare_WorkerSubscription_$10.pdf
2026-07-02_AppStore_DeveloperFee_$0.pdf
```

---

## Permission tiers

Set OneDrive sharing permissions by folder:

| Folder | Who has access |
|---|---|
| **01_Governance** | Board members only |
| **02_Finance** | Board + Treasurer + accountant |
| **03_Programs** | Core team + advisor coordinators (no PII outside their scope) |
| **04_Grants & Funding** | Board + grant writers |
| **05_Branding & Communications** | Core team |
| **06_Legal** | Board + Executive Director |
| **07_HR & People** | Board + Executive Director only |
| **08_Technology** | Core team (tech roles only) |

Use OneDrive's "Specific people" sharing — never "Anyone with the link" for governance files.

---

## Recommended Microsoft 365 add-ons (free for nonprofits)

**Microsoft 365 Nonprofit** — Apply at https://nonprofit.microsoft.com. Includes:
- Up to 10 free Business Standard licenses
- OneDrive storage (1 TB per user)
- Teams for meetings
- SharePoint for org-wide shared sites

Registered Canadian charities and nonprofits qualify. Application is free and usually approved in 1-2 weeks.

---

## Retention guidelines

| Document type | Keep for |
|---|---|
| Board meeting minutes | Permanent |
| Annual COI disclosures | 7 years |
| Tax filings | 7 years (CRA requirement) |
| Bank statements | 7 years |
| Receipts | 7 years |
| Signed Codes of Conduct | While advisor is active + 3 years |
| Background checks | Renewed every 3 years; keep the most recent |
| Grant applications & reports | 7 years after grant close |
| Email correspondence about decisions | 3 years |

When in doubt: keep it. OneDrive storage is cheap relative to losing important records.

---

## Quick setup checklist

1. ☐ Create the top-level `RYDN` folder in OneDrive
2. ☐ Create the 8 numbered subfolders inside it
3. ☐ Upload the 3 governance Word docs from this project to `01_Governance/Policies/`
4. ☐ Apply for Microsoft 365 Nonprofit if not already done
5. ☐ Share `01_Governance` with all board members (Edit permission)
6. ☐ Save this guide to `01_Governance/Reference/` for new team members
