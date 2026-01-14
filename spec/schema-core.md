# Tavri Asset Intelligence Schema (TAIS) — Core

**Version:** v0.1.1
**Scope:** Neutral data model for assets, evidence, and traceability.

---

## 1. Purpose

TAIS Core defines a consistent, neutral way to represent:

- **Assets** (identity and contextual metadata)
- **Evidence** (referenced artifacts and provenance)
- **Traceability** (relationships between assets, evidence, and records)
- **Human review and change events** (who, when, what)

TAIS Core is **implementation-agnostic** and does not prescribe storage mechanisms, transport protocols, execution environments, or security controls beyond high-level informational guidance.

---

## 2. Non-Goals (Important)

TAIS Core does **not** define, perform, or imply:

- compliance determinations
- equipment rating determinations
- automated approvals or rejections
- algorithmic validation thresholds or decision criteria
- control logic, authority transfer, or runtime switching
- safety-system or operational decision-making behavior

TAIS Core is a **data representation model only**.  
It is not intended to be interpreted as a control system, safety system, or operational decision-support system.

---

## 3. Core Objects Overview

TAIS Core defines the following conceptual object types:

- **Asset** — The thing being described (e.g., transformer, breaker, relay, line segment)
- **Evidence** — A reference to a captured or imported artifact (image, PDF, OCR output, memo)
- **EvidenceRef** — A lightweight pointer to an Evidence item, used by other objects
- **TraceLink** — A typed relationship connecting objects
- **ReviewEvent** — A human-performed review action and its references
- **ChangeEvent** — Versioning and supersession metadata describing record evolution
- **Package** — A portable bundle of related objects for exchange (optional but recommended)

---

## 4. Object Definitions (Conceptual)

### 4.1 Asset

Represents a uniquely identifiable asset.

**Typical fields**
- `assetId` — stable identifier
- `assetClass` — e.g., transformer, breaker, relay
- `manufacturer`, `model`, `serialNumber` — as available
- `nameplate` — optional structured fields if captured; extension schemas may define additional domain-specific structures
- `location` — facility or station context; may reference an external or extension-defined facility object

---

### 4.2 Evidence

Represents a reference to an artifact, not necessarily the artifact itself.

Evidence **should be treated as immutable** at the modeling level; updates create new Evidence entries.  
Immutability is a **convention**, not an enforcement requirement.

**Typical fields**
- `evidenceId`
- `type` — image, pdf, ocr_extract, drawing, memo, etc.
- `capturedAt` — timestamp
- `source` — capture device/system and uploader role
- `uri` — where the artifact is stored
- `hash` — recommended for integrity
- `hashAlg` — e.g., sha256
- `notes` — optional descriptive text

---

### 4.3 EvidenceRef

A lightweight reference pointer used from other objects.

**Typical fields**
- `evidenceId`
- `purpose` — e.g., `nameplate_photo`, `oem_datasheet`, `study_output`

---

### 4.4 TraceLink

A typed link connecting two objects.

Examples (illustrative, not exhaustive):
- `asset_has_evidence`
- `record_supported_by_evidence`
- `record_superseded_by_record`
- `review_applies_to_record`

---

### 4.5 ReviewEvent

Represents a **human-performed** review action (not an automated decision).

**Typical fields**
- `reviewEventId`
- `performedBy` — human or organization reference
- `performedAt`
- `scope` — objects reviewed, referenced by ID
- `outcome` — neutral states such as `reviewed`, `needs_more_info`
- `evidenceRefs` — supporting references

---

### 4.6 ChangeEvent

Describes a change to a record and its relationship to prior records.

**Typical fields**
- `changeEventId`
- `changedAt`
- `changedBy`
- `changeType` — created, corrected, superseded
- `supersedes` — reference to prior record
- `reason` — free-text explanation

---

### 4.7 Package (Recommended)

A portable bundle containing related TAIS objects.

**Typical fields**
- `packageId`
- `schemaVersion`
- `generatedAt` — timestamp of package assembly
- collections of objects (assets, evidence, records, events)
- optional integrity summary (e.g., manifest hash)

Packages are recommended for exchange and archival, but not required for all use cases.

---

## 5. Immutability and Versioning Rules

- Evidence items **SHOULD** be treated as immutable; updates **SHOULD** create new Evidence entries.
- Records (including those defined by extension schemas) **SHOULD** be versioned using explicit supersession links.
- Review events **SHOULD NOT** be overwritten; new review events should be appended.

---

## 6. Security & Privacy Notes (High Level)

- Avoid embedding sensitive content directly; reference artifacts using `uri` and enforce access control outside the schema.
- Hashing evidence artifacts is recommended to support integrity verification.
- TAIS does not mandate access control, authentication, encryption, or key-management models.
- Security, privacy, and regulatory compliance responsibilities remain with the adopting organization.
