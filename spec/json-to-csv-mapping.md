# TAIS JSON → CSV Mapping (Illustrative)

**Status:** Non-normative, example-only  
**Applies to:** TAIS v0.1 FAC-008 RatingRecord examples

## Purpose

This document provides an **example mapping** from TAIS JSON fields to a flat CSV format commonly used in spreadsheet-based FAC-008 workflows.

This mapping is illustrative only.  
Organizations may define their own mappings, column names, or export formats.

---

## Example Use Case

- Export TAIS RatingRecords to Excel
- Populate FAC-008 rating tables
- Share recorded rating values with internal engineering teams
- Prepare audit binders

---

## Example CSV Columns and JSON Paths

| CSV Column Name             | JSON Source Path                                                       | Notes |
|-----------------------------|------------------------------------------------------------------------|-------|
| facility_id                 | `package.facilities[].facilityId`                                      | One per row or duplicated |
| facility_name               | `package.facilities[].name`                                            | Optional |
| element_id                  | `package.elements[].elementId`                                         | |
| element_name                | `package.elements[].displayName`                                       | |
| asset_id                    | `package.assets[].assetId`                                             | |
| asset_class                 | `package.assets[].assetClass`                                          | |
| manufacturer                | `package.assets[].manufacturer`                                        | |
| model                       | `package.assets[].model`                                               | |
| serial_number               | `package.assets[].serialNumber`                                        | |
| rating_record_id            | `package.ratingRecords[].ratingRecordId`                               | |
| rating_type                 | `package.ratingRecords[].ratingType`                                   | Recorded only |
| rating_quantity             | `package.ratingRecords[].values[].quantity`                            | e.g., power_mva |
| rating_value                | `package.ratingRecords[].values[].value`                               | |
| rating_unit                 | `package.ratingRecords[].values[].unit`                                | |
| basis_label                 | `package.ratingRecords[].values[].basisLabel`                          | normal/emergency |
| cooling_mode                | `package.ratingRecords[].values[].coolingMode`                         | Text only |
| effective_start_date        | `package.ratingRecords[].effective.start`                              | |
| effective_end_date          | `package.ratingRecords[].effective.end`                                | Optional |
| study_reference_ids         | `package.ratingRecords[].studyRefIds[]`                                | Joined if multiple |
| deliverable_ids             | `package.ratingRecords[].deliverableIds[]`                             | Joined if multiple |
| evidence_reference_ids      | `package.ratingRecords[].evidenceRefs[].evidenceId`                    | Joined |
| notes                       | `package.ratingRecords[].notes`                                        | |

---

## Mapping Notes

- Arrays may be flattened using one row per rating value.
- Repeated facility/asset metadata may be duplicated per row for simplicity.
- No calculated or derived fields are required.
- All values should reflect **recorded outputs**, not computed results.

---

## Important Note

This mapping is provided for **illustrative purposes only**.  
It does not represent a required format, recommended workflow, or compliance approach.
