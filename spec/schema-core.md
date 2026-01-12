# Tavri Asset Intelligence Schema (TAIS) — Core
**Version:** v0.1 (Draft)  
**Scope:** Neutral data model for assets, evidence, and traceability.

## 1. Purpose
TAIS Core defines a consistent way to represent:
- **Assets** (identity and context)
- **Evidence** (immutable references + provenance)
- **Traceability** (relationships between assets and evidence)
- **Human review/change events** (who/when/what)

TAIS Core is implementation-agnostic and does not prescribe storage, transport, or security controls beyond high-level recommendations.

## 2. Non-Goals (Important)
TAIS Core does **not** define or perform:
- compliance determinations
- equipment rating determinations
- automated approvals/rejections
- algorithmic validation thresholds or decision criteria
- control logic, authority transfer, or runtime switching

TAIS Core is a data representation model only.

## 3. Core Objects Overview
- **Asset** — The thing being described (e.g., transformer, breaker, relay, line segment)
- **Evidence** — A reference to a captured or imported artifact (image, PDF, OCR output, memo)
- **EvidenceRef** — A pointer to an Evidence item, used by other objects
- **TraceLink** — A typed relationship connecting objects (e.g., “asset_has_evidence”)
- **ReviewEvent** — A human-performed review action and its references
- **ChangeEvent** — Versioning/supersession metadata describing changes to records
- **Package** — A bundle of related objects for exchange (optional but recommended)

## 4. Object Definitions (Conceptual)

### 4.1 Asset
Represents a uniquely identifiable asset.
**Typical fields**
- `assetId` (stable identifier)
- `assetClass` (e.g., transformer, breaker, relay)
- `manufacturer`, `model`, `serialNumber` (as available)
- `nameplate` (optional structured fields if captured; see FAC-008 extension for rating-relevant structures)
- `location` (facility/station context; can be a reference to FAC-008 Facility)

### 4.2 Evidence
Represents a reference to an artifact, not necessarily the artifact itself.
Evidence should be treated as immutable; updates create new Evidence entries.
**Typical fields**
- `evidenceId`
- `type` (image, pdf, ocr_extract, drawing, memo)
- `capturedAt` (timestamp)
- `source` (capture device/system, uploader role)
- `uri` (where the artifact lives)
- `hash` (recommended) and `hashAlg` (e.g., sha256)
- `notes` (optional)

### 4.3 EvidenceRef
A lightweight reference pointer used from other objects.
**Typical fields**
- `evidenceId`
- `purpose` (e.g., “nameplate_photo”, “oem_datasheet”, “study_output”)

### 4.4 TraceLink
A typed link connecting two objects.
Examples:
- asset_has_evidence
- record_supported_by_evidence
- record_superseded_by_record
- review_applies_to_record

### 4.5 ReviewEvent
Represents a human review action (not an automated decision).
**Typical fields**
- `reviewEventId`
- `performedBy` (human or organization reference)
- `performedAt`
- `scope` (what objects were reviewed, via refs)
- `outcome` (neutral states such as “reviewed”, “needs_more_info”)
- `evidenceRefs` (supporting references)

### 4.6 ChangeEvent
Describes a change in a record and how it relates to previous records.
**Typical fields**
- `changeEventId`
- `changedAt`
- `changedBy`
- `changeType` (created, corrected, superseded)
- `supersedes` (reference)
- `reason` (free text)

### 4.7 Package (Recommended)
A portable bundle containing:
- `packageId`
- `schemaVersion`
- lists of objects (assets, evidence, records, events)
- optional integrity summary (manifest hash)

## 5. Immutability and Versioning Rules
- Evidence items SHOULD be immutable; updates SHOULD create new Evidence entries.
- Records (including FAC-008 RatingRecords) SHOULD be versioned using explicit supersession links.
- Review events SHOULD never be overwritten; append new events.

## 6. Security & Privacy Notes (High Level)
- Avoid embedding sensitive content directly; reference it using `uri` + access control outside the schema.
- Hashing evidence artifacts is recommended to support integrity checks.
- TAIS does not mandate access control models.
