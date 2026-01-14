# TAIS Adoption Guide (Illustrative)

**Status:** Non-normative, example-only  
**Applies to:** Tavri Asset Intelligence Schema (TAIS) v0.1.1

## Purpose

This document provides **illustrative guidance** for organizations interested in adopting the Tavri Asset Intelligence Schema (TAIS).  
It is intended to reduce initial friction and demonstrate one possible way TAIS packages may be used alongside existing systems.

This guide does **not** prescribe workflows, compliance approaches, approval criteria, or system architectures.

---

## What TAIS Adoption Looks Like in Practice

TAIS is an **interchange and evidence-packaging format**.  
Organizations may use it to structure and exchange asset evidence and recorded artifacts without replacing existing tools.

TAIS may be viewed as a **digital bridge** between physical field evidence (e.g., photos, OCR artifacts) and downstream engineering or planning representations (e.g., rating tables, studies, models), without altering or replacing either side.

TAIS adoption may involve:
- storing TAIS JSON packages alongside existing documents
- transforming TAIS fields into spreadsheets or databases
- mapping TAIS records into existing asset, engineering, or planning systems

No specific software platform is required.

---

## Minimal Starting Point (Recommended)

Organizations may start small. A minimal TAIS package may include:

1. **One asset**
   - e.g., a transformer, breaker, line segment, device, or comparable physical component

2. **One or more evidence artifacts**
   - nameplate photo
   - OEM datasheet
   - engineering memo, test report, or rating table

3. **One recorded RatingRecord**
   - values copied from an existing engineering table or memo
   - represented as recorded outputs (not calculated)

4. **Optional human review metadata**
   - who reviewed the record
   - when it was reviewed
   - what artifact was reviewed

This minimal approach supports audit traceability without changing existing processes.

TAIS packages may be validated using schema-based validation tools; such validation confirms **structural conformance only**.

Passing schema validation represents a **minimum interoperability threshold** (“the floor, not the ceiling”).  
It confirms that a package is readable and well-formed, not that the contents are complete, correct, approved, or suitable for operational use.

---

## Storing TAIS Packages

Common approaches include:
- storing TAIS JSON files in document repositories (e.g., SharePoint, network drives)
- associating TAIS packages with asset folders
- storing TAIS packages in internal data platforms or repositories

TAIS packages may reference artifacts (PDFs, images, spreadsheets) without embedding them.

---

## Using TAIS with Regulated Engineering Workflows (FAC-008 Example)

While FAC-008 provides a concrete example, the same TAIS patterns apply to other regulated, audited, or safety-critical engineering workflows across industries.

TAIS supports such workflows by organizing:
- asset identity
- evidence references
- recorded outputs
- study and deliverable provenance
- effective dates and supersession chains

TAIS does not perform engineering determination or calculations.  
All authority, judgment, and approval remain with the asset owner or responsible organization.

TAIS RatingRecords may be:
- copied from existing engineering tables
- exported to spreadsheets
- included in audit or compliance binders

---

## Incremental Expansion

Over time, organizations may:
- add historical records
- link additional evidence artifacts
- record supersession events
- include additional assets, facilities, or systems

TAIS does not require full backfill or immediate completeness.

---

## Typical TAIS Package Lifecycle (Illustrative)

A TAIS package may pass through a simple lifecycle:

1. **Create** — assemble recorded assets, evidence references, and outputs  
2. **Validate** — confirm structural conformance to the schema  
3. **Store** — retain packages alongside existing records  
4. **Exchange** — share packages across systems or organizations as needed  

These steps are **illustrative only**.  
TAIS does not mandate order, tooling, ownership, or lifecycle management.

---

## Appendix A — Quick Start: 5-Minute Validation (Illustrative)

TAIS packages may be validated using standard JSON Schema validators to confirm
structural conformance to the published schemas.

A complete, working reference validator (Node.js / Ajv) is provided in the
TAIS repository under:

    tools/tais-validator/

That directory includes:
- a reference validation script
- example commands
- example output (pass and fail)
- validation of both Core and FAC-008 schemas

Validation confirms **structural conformance only** and does not imply correctness,
approval, or compliance.

