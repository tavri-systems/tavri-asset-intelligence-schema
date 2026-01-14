# TAIS — IT & Security FAQ (Non-Normative)

**Audience:** IT, Security, Compliance, Architecture, and Risk Teams  
**Applies to:** Tavri Asset Intelligence Schema (TAIS) v0.1.1+  
**Status:** Informational, non-normative

This document answers common questions raised by IT and security teams evaluating the Tavri Asset Intelligence Schema (TAIS).  
It does **not** define requirements, controls, or mandated implementations.

---

## What is TAIS, from an IT/Security perspective?

TAIS is a **vendor-neutral data schema** for packaging asset-related evidence, recorded outputs, and traceability metadata in a structured, machine-readable form.

TAIS does **not** introduce new systems, services, agents, or runtime components.  
It defines **data structure only**.

---

## Does TAIS perform calculations, decisions, or automation?

No.

TAIS does **not**:
- perform engineering calculations
- determine ratings or limits
- make compliance decisions
- automate approvals or rejections
- trigger control actions or workflows

TAIS represents **recorded data and references only**, as produced by existing organizational processes.

---

## Is TAIS a control system or safety system?

No.

TAIS is **not**:
- a control system
- a protection system
- a safety-critical runtime component
- a decision-support engine

TAIS is an **offline / at-rest data representation model**.

---

## Does TAIS require network connectivity or cloud services?

No.

TAIS:
- does not require network access
- does not require cloud connectivity
- does not define transport mechanisms
- does not mandate APIs or services

TAIS packages may be stored, transferred, or archived using **existing approved mechanisms** (file shares, document systems, removable media, etc.).

---

## Does TAIS store sensitive data?

TAIS itself stores **references**, not raw artifacts.

Best practice is to:
- store sensitive artifacts (PDFs, images, memos) in existing controlled systems
- reference them via URIs and identifiers in TAIS
- apply access control **outside the schema**

TAIS does not mandate what content may or may not be referenced.

---

## How does TAIS support data integrity?

TAIS supports integrity through:
- immutable evidence references
- optional cryptographic hashes (e.g., SHA-256)
- explicit supersession chains
- append-only review and change events

TAIS **does not enforce** cryptographic controls; it enables them.

---

## Does TAIS introduce new compliance obligations?

No.

TAIS:
- does not change regulatory scope
- does not redefine compliance requirements
- does not replace mandated systems or records
- does not imply compliance by structure alone

Compliance determinations remain external to TAIS.

---

## Who has authority over TAIS data?

Authority remains entirely with the **asset owner or responsible organization**.

TAIS does not:
- assign authority
- infer approval
- delegate responsibility
- encode decision rights

A TAIS package is **descriptive**, not authoritative.

---

## Is TAIS opinionated about security architecture?

No.

TAIS intentionally avoids prescribing:
- authentication models
- authorization models
- encryption standards
- key management
- audit tooling
- retention policies

These remain organizational decisions.

---

## How is TAIS validated?

TAIS schemas may be validated using standard JSON Schema tooling.

Validation confirms:
- structural correctness
- required fields
- allowed formats
- prohibited extra fields

Validation does **not** confirm:
- correctness of values
- engineering validity
- regulatory compliance
- approval status

Schema validation is the **floor, not the ceiling**.

---

## Is TAIS vendor-neutral?

Yes.

TAIS:
- is implementation-agnostic
- does not require Tavri software
- does not mandate specific tools
- does not embed proprietary logic

Any organization may implement TAIS using internal or third-party tooling.

---

## Why would an organization adopt TAIS?

Common drivers include:
- improved audit traceability
- consistent evidence packaging
- reduced ambiguity in asset documentation
- easier data exchange between teams or vendors
- long-term preservation of engineering context

TAIS acts as a **digital bridge** between physical assets, documentation, and downstream processes.

---

## Summary

TAIS is a **high-integrity data interchange format**, not an operational system.

It is designed to:
- preserve authority boundaries
- minimize integration risk
- support auditability
- coexist with existing security controls

Adoption is optional, incremental, and fully under organizational control.

---

*This document is informational only and does not impose requirements, controls, or obligations.*
