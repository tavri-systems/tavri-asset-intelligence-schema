# Tavri Asset Intelligence Schema (TAIS)

**Version:** v0.1.1  
**Status:** Draft (conceptual + implementation-agnostic)

The Tavri Asset Intelligence Schema (TAIS) defines a neutral, evidence-linked data model for representing:
- **Assets** (identity + context)
- **Evidence** (immutable references + provenance)
- **Traceability** (links between assets, evidence, and human review events)
- **Regulated engineering workflow support** (e.g., FAC-008) via extensions that model **recorded** outputs, provenance, and effective-date chains (without performing determinations)

---

## What this is

TAIS is a **data schema** intended to help utilities, OEMs, and engineering teams organize asset evidence and downstream artifacts in an audit-friendly, interoperable way. It functions as an **interchange and evidence-packaging format**, enabling structured exchange of asset-related information without altering existing tools, workflows, or authority structures.

---

## What this is not

TAIS does **not** define or perform:
- Facility or equipment rating determination
- Compliance decisions or regulatory interpretation
- Automated approval or rejection logic
- Model validation criteria or thresholds
- Control logic, authority transfer, failover, or runtime decision-making

TAIS is not a safety system, control system, or operational decision-support system. It is a **data representation model only**.

---

## Repository Layout

- `spec/` — Human-readable specification documents
- `json-schema/` — Machine-readable JSON Schema definitions
- `examples/` — Example payloads demonstrating common patterns
- `validator/` — Reference schema validator (non-normative)

---

## Specifications

- `spec/schema-core.md` — TAIS Core objects (assets, evidence, traceability, review/change events)
- `spec/fac-008-extension.md` — FAC-008 extension objects (facility context, recorded rating outputs, study references, deliverables, effective-date chains)
- `spec/glossary.md` — Shared terminology

---

## JSON Schemas

- `json-schema/core.schema.json` — Core objects
- `json-schema/fac008.schema.json` — FAC-008 extension objects

**Note:** The FAC-008 extension schema references TAIS Core using relative `$ref` paths. For validation, `core.schema.json` must be available alongside `fac008.schema.json`. Validation confirms structural conformance only and does not imply correctness, approval, or suitability for operational use.

---

## How TAIS Is Used by Utilities

TAIS is designed as an **interchange and evidence-packaging format**, not as a replacement for existing utility systems. 



**Illustrative lifecycle:**
`Capture (Field / Engineering) → Package (TAIS JSON) → Validate (Schema Conformance) → Store or Exchange`

This lifecycle represents a common adoption pattern; organizations may omit, reorder, or implement steps differently. TAIS does not mandate order, tooling, ownership, or responsibility for these steps.

---

## Tools and Validation (Illustrative)

TAIS schemas may be validated using standard JSON Schema tooling.

This repository includes a reference validator under validator/ to:

- Demonstrate expected schema behavior

- Validate example packages

- Reduce adoption friction

Use of the reference validator is optional. TAIS does not require Node.js, this validator, or any specific validation implementation.

Validation confirms structural correctness only. It represents the floor, not the ceiling, of data quality or assurance.

---

## Tools Integration (Illustrative)

TAIS packages are JSON for portability. Organizations may integrate TAIS with existing workflows by transforming JSON into formats such as CSV or Excel.

A common starting pattern is:
- Store the TAIS JSON package alongside supporting PDFs and photos.
- Export **recorded RatingRecords** to CSV for spreadsheet-based workflows.

Illustrative examples are provided:
- `examples/json_to_csv_example.py` — Example Python script exporting RatingRecords to CSV.
- `examples/fac008-rating-export.csv` — Example CSV output.

---

## Authority and Responsibility

Use of TAIS does not transfer, delegate, or modify:
- Facility or equipment rating authority
- Compliance responsibility
- Engineering judgment or approval processes

TAIS does not introduce shared authority, delegated authority, or implied approval through data structure alone. All determinations, approvals, and compliance decisions remain solely with the asset owner or responsible organization.

---

## License
See `LICENSE`.

## Changelog
See `CHANGELOG.md`.