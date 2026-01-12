# Tavri Asset Intelligence Schema (TAIS)

**Version:** v0.1  
**Status:** Draft (conceptual + implementation-agnostic)

The Tavri Asset Intelligence Schema (TAIS) defines a neutral, evidence-linked data model for representing:
- Assets (identity + context)
- Evidence (immutable references + provenance)
- Traceability (links between assets, evidence, and human review events)
- FAC-008 workflow support via an extension that models **recorded** rating outputs, provenance, and effective-date chains (without performing rating determination)

## What this is
TAIS is a **data schema** intended to help utilities, OEMs, and engineering teams organize asset evidence and downstream artifacts in an audit-friendly way.

## What this is not
TAIS does **not** define or perform:
- facility rating determination
- compliance decisions
- automated approval/rejection logic
- model validation criteria or thresholds
- control logic, authority transfer, or failover mechanisms

## Repository Layout
- `spec/` — human-readable spec documents
- `json-schema/` — machine-readable JSON Schema definitions
- `examples/` — example payloads demonstrating common patterns

## Specs
- `spec/schema-core.md` — TAIS core objects (assets, evidence, traceability, review/change events)
- `spec/fac-008-extension.md` — FAC-008 extension objects (facility context, rating records as recorded outputs, study references, deliverables, effective-date chains)
- `spec/glossary.md` — shared terminology

## JSON Schemas
- `json-schema/core.schema.json` — core objects
- `json-schema/fac008.schema.json` — FAC-008 extension objects

## Examples
- `examples/evidence-example.json` — Evidence object example
- `examples/rating-record-example.json` — FAC-008 RatingRecord example
- `examples/fac008-transformer-example.json` — end-to-end package tying asset, evidence, rating record, and provenance
- `examples/fac008-starter-package.json` — minimal starter package (asset + evidence + recorded rating record)

---

## How TAIS Is Used by Utilities

TAIS is designed as an **interchange and evidence-packaging format**, not as a replacement for existing utility systems.

Utilities may use TAIS to:
- structure asset evidence and rating artifacts in a consistent, auditable format
- exchange asset evidence packages between teams, vendors, or tools
- support FAC-008 workflows without altering existing rating authority or approval processes

TAIS packages are expressed in JSON for portability. Utilities may:
- store TAIS packages directly as JSON files
- transform TAIS packages into spreadsheets, databases, or internal schemas
- ingest TAIS fields into existing asset, document, or engineering systems

TAIS does not require adoption of any specific software platform.

---

## Integration with Existing Utility Systems (Illustrative)

TAIS is compatible with common utility environments through straightforward transformation or ingestion steps:

- **CMMS / Asset Systems (e.g., Maximo, SAP, Ellipse)**  
  TAIS fields may be mapped into existing asset records via CSV import, API integration, or middleware tools.

- **Document Management (e.g., SharePoint, network repositories)**  
  TAIS packages may be stored alongside PDFs, photos, and engineering memos as structured metadata files.

- **Engineering Workflows (spreadsheets, studies, memos)**  
  TAIS RatingRecords represent *recorded outputs* that may be exported to or derived from existing FAC-008 rating tables.

- **Data Platforms / Data Lakes**  
  TAIS JSON packages may be ingested directly for search, analytics, or audit preparation.

TAIS intentionally avoids prescribing storage models, databases, or workflows. Each organization retains full control over how TAIS data is ingested, transformed, or persisted.

---

## Adoption Guidance (Minimal Start)

Organizations may adopt TAIS incrementally. A minimal starting point may include:
1. One asset (e.g., a transformer)
2. One or more evidence artifacts (nameplate photo, OEM datasheet)
3. One recorded RatingRecord linked to an existing rating table or memo
4. Optional human review metadata

TAIS packages may expand over time as additional assets, evidence, or historical records are added.

---

## Tools Integration (Illustrative)

TAIS packages are JSON for portability. Organizations may integrate TAIS with existing workflows by transforming JSON into formats such as CSV or Excel.

A common starting pattern is:
- Store the TAIS JSON package alongside supporting PDFs and photos
- Export RatingRecords to CSV for spreadsheet-based workflows

Illustrative examples are provided:
- `examples/json_to_csv_example.py` — example Python script exporting RatingRecords to CSV
- `examples/fac008-rating-export.csv` — example CSV output

These examples are non-normative and provided for convenience only.

---

## Authority and Responsibility

Use of TAIS does not transfer, delegate, or modify:
- facility rating authority
- compliance responsibility
- engineering approval processes

All determinations, approvals, and compliance decisions remain solely with the asset owner.

---

## Contributing (Optional)

Feedback and suggestions are welcome via GitHub Issues or Pull Requests.

- Use Issues for questions, adoption feedback, edge cases, or proposed enhancements.
- Use Pull Requests for clarifications, examples, typo fixes, or schema improvements.

Contributions are reviewed at the discretion of the maintainers. This repository does not commit to a governance model, roadmap, or acceptance of proposed changes.

---

## License
See `LICENSE`.

## Changelog
See `CHANGELOG.md`.
