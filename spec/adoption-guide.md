# TAIS Adoption Guide (Illustrative)

**Status:** Non-normative, example-only  
**Applies to:** Tavri Asset Intelligence Schema (TAIS) v0.1

## Purpose

This document provides **illustrative guidance** for organizations interested in adopting the Tavri Asset Intelligence Schema (TAIS).  
It is intended to reduce initial friction and demonstrate one possible way TAIS packages may be used alongside existing systems.

This guide does **not** prescribe workflows, compliance approaches, approval criteria, or system architectures.

---

## What TAIS Adoption Looks Like in Practice

TAIS is an **interchange and evidence-packaging format**.  
Organizations may use it to structure and exchange asset evidence and recorded artifacts without replacing existing tools.

TAIS adoption may involve:
- storing TAIS JSON packages alongside existing documents
- transforming TAIS fields into spreadsheets or databases
- mapping TAIS records into existing asset or engineering systems

No specific software platform is required.

---

## Minimal Starting Point (Recommended)

Organizations may start small. A minimal TAIS package may include:

1. **One asset**
   - e.g., a transformer, breaker, or line segment

2. **One or more evidence artifacts**
   - nameplate photo
   - OEM datasheet
   - engineering memo or rating table

3. **One recorded RatingRecord**
   - values copied from an existing FAC-008 rating table or memo
   - represented as recorded outputs (not calculated)

4. **Optional human review metadata**
   - who reviewed the record
   - when it was reviewed
   - what artifact was reviewed

This minimal approach supports audit traceability without changing existing processes.

---

## Storing TAIS Packages

Common approaches include:
- storing TAIS JSON files in document repositories (e.g., SharePoint, network drives)
- associating TAIS packages with asset folders
- storing TAIS packages in data platforms or internal repositories

TAIS packages may reference artifacts (PDFs, images) without embedding them.

---

## Using TAIS with FAC-008 Workflows

TAIS supports FAC-008 workflows by organizing:
- asset identity
- evidence references
- recorded rating outputs
- study and deliverable provenance
- effective dates and supersession chains

TAIS does not perform rating determination.  
All rating authority remains with the asset owner.

TAIS RatingRecords may be:
- copied from existing rating tables
- exported to spreadsheets
- included in FAC-008 binders or audit packages

---

## Incremental Expansion

Over time, organizations may:
- add historical rating records
- link additional evidence artifacts
- record supersession events
- include additional assets or facilities

TAIS does not require full backfill or immediate completeness.

---

## Important Note

This document is provided for **illustrative purposes only**.  
Organizations may adapt, modify, or ignore these examples as appropriate.

TAIS does not prescribe:
- compliance methods
- approval processes
- system integrations
- data storage architectures
