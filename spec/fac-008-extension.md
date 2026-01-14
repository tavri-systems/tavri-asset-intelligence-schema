# TAIS — FAC-008 Extension (Evidence & Rating Records)
**Version:** v0.1.1 
**Scope:** Represent FAC-008-relevant context, recorded rating outputs, provenance, and effective-date chains.

## 1. Purpose
This extension adds objects that help asset owners organize the evidence and artifacts typically used in FAC-008 workflows, including:
- facility and element context
- **recorded** equipment rating outputs
- study/method provenance references
- declared assumption sets
- effective date and supersession chains

## 2. FAC-008 Disclaimer (Important)
This extension does **not** perform facility rating determination and does not make compliance decisions.  
All rating authority and compliance responsibility remain solely with the asset owner.

This extension represents **recorded outputs** and **referenced artifacts** produced by the asset owner’s processes.

## 3. Extension Objects

### 3.1 Facility
Represents a facility context where assets are located or referenced.
Fields commonly include:
- `facilityId`, `name`
- `operator` (asset owner / utility)
- `region` (optional)
- `evidenceRefs` (optional supporting references)

### 3.2 Element
Represents an engineering element association (e.g., “Transformer Bank T1”, “Line L-203”, “Bus A”).
- `elementId`
- `facilityId` (reference)
- `elementType` (transformer_bank, line, breaker, bus, etc.)
- `displayName`
- `assetRefs` (assets participating)
- `notes` (optional)

### 3.3 RatingRecord (Recorded Output)
Represents a **recorded** rating set (not computed by TAIS).
Key rules:
- represent values as recorded
- link to evidence and deliverables
- include effective dates and supersession pointers

Suggested fields:
- `ratingRecordId`
- `assetId` and/or `elementId`
- `ratingType` (e.g., nameplate, study_output, manufacturer_curve)
- `values` (structured list of rating items)
- `effective` (date range)
- `supersedes` (optional pointer)
- `studyRefIds` (optional)
- `deliverableIds` (optional)
- `evidenceRefs` (supporting references)

### 3.4 AssumptionSet (Declared Inputs)
Represents declared assumptions used in a study or internal method, such as ambient conditions.
- `assumptionSetId`
- `labels` (e.g., “summer_normal”, “winter_emergency”)
- `declaredAssumptions` (key/value with units)
- `evidenceRefs` (supporting references)

### 3.5 StudyReference (Provenance)
Represents a study or method artifact reference (not the study itself).
- `studyRefId`
- `methodType` (thermal_model, oem_curve, field_test, engineering_memo)
- `title`
- `version`
- `performedBy` (human/org)
- `performedAt`
- `assumptionSetIds` (optional)
- `deliverableIds` (optional)
- `evidenceRefs` (inputs)

### 3.6 Deliverable
Represents an output artifact (PDF table, signed memo, rating sheet).
- `deliverableId`
- `type` (rating_table_pdf, memo_pdf, spreadsheet, etc.)
- `title`
- `evidenceRef` (the Evidence that points to it)

## 4. Effective Date + Supersession Model
- Every RatingRecord SHOULD define an effective start date; end date may be omitted if current.
- Supersession SHOULD be explicit: `supersedes: <ratingRecordId>`
- Corrections SHOULD create a new RatingRecord.

## 5. Minimum Adoptable Fields (Suggested)
For immediate utility adoption:
- Facility: `facilityId`, `name`
- Element: `elementId`, `facilityId`, `elementType`, `displayName`
- RatingRecord: `ratingRecordId`, `assetId/elementId`, `values`, `effective.start`, `evidenceRefs`
- StudyReference: `studyRefId`, `methodType`, `title`, `deliverableIds` (if any)
