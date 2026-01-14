# Changelog

## v0.1.1 — Clarifications, Validation Tightening, and Adoption Guidance

- Refined TAIS positioning as an **interchange and evidence-packaging format**, not a system, workflow, or platform.
- Strengthened non-normative language across all specifications to clearly separate:
  - data representation
  - engineering judgment
  - regulatory compliance
  - operational authority
- Clarified that all regulated-workflow extensions (e.g., FAC-008) represent **recorded outputs only**, not determinations, calculations, or approvals.
- Added explicit language that schema validation confirms **structural conformance only** (“the floor, not the ceiling”).
- Introduced an **illustrative lifecycle** to clarify intended usage patterns:
  - Capture → Package → Validate → Store / Exchange
- Added guidance on **incremental adoption** and minimal starting packages to reduce implementation friction.
- Clarified JSON Schema `$ref` expectations:
  - FAC-008 extension schemas require TAIS Core to be resolvable during validation.
- Added a **reference schema validator** (non-normative) to demonstrate expected schema behavior and reduce adoption friction.
- Expanded reference validator behavior to support:
  - recursive example validation
  - automatic routing between Core and FAC-008 schemas
- Added **intentionally invalid example payloads** to demonstrate strict schema enforcement and validator failure modes.
- Enforced **strict property validation** (`additionalProperties: false`) across Core and extension schemas to ensure high-integrity, predictable data exchange.
- Introduced stricter **regex constraints** for identifiers and hashes to improve consistency and tooling reliability.
- Added **numerical range constraints** for applicable numeric fields to prevent structurally valid but nonsensical data.
- Updated project README with clearer scope boundaries, validator context, lifecycle illustration, and authority disclaimers.
- Updated glossary with clearer, industry-neutral definitions and explicit authority boundaries.
- Improved consistency of terminology across Core, FAC-008 extension, validator tooling, and examples.
- Clarified versioning expectations and backward-compatibility posture for pre-1.0 (`v0.x`) releases.

> These changes establish a **baseline interoperability and data hygiene floor**.  
> They do **not** imply correctness, approval, fitness for use, or regulatory compliance.

### Validation & Schema Integrity Enhancements

- Enforced **strict property validation** across core and extension schemas using  
  `additionalProperties: false` to ensure high-integrity, predictable data exchange.
- Introduced stricter **regex constraints** for identifiers and hashes to improve consistency and tooling reliability.
- Added **numerical range constraints** for applicable numeric fields (e.g., coordinates, telemetry-like values) to prevent structurally valid but nonsensical data.
- Confirmed schema behavior using intentionally invalid example payloads to demonstrate enforcement boundaries.

> These constraints establish a **baseline interoperability and data hygiene floor**.  
> They do **not** imply correctness, approval, fitness for use, or regulatory compliance.

---

## v0.1 — Initial Draft
- Added TAIS Core Spec:
  - Assets, Evidence, EvidenceRef
  - Trace links
  - Review and change events
  - Packaging conventions
- Added FAC-008 Extension Spec:
  - Facility and element context
  - RatingRecord as **recorded** outputs
  - AssumptionSet as **declared** inputs
  - StudyReference and Deliverable
  - Effective-date + supersession model
- Added glossary
- Added JSON Schemas (core + fac008)
- Added examples (evidence, rating record, full transformer package)
