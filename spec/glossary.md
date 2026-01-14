# TAIS Glossary

**Asset**  
A physical or logical component being **represented within a TAIS package** (e.g., transformer, breaker, relay, line segment, or similar component).

**Evidence**  
A referenced artifact that supports a claim or record (e.g., photo, PDF, OCR extract, engineering memo). Evidence is ideally immutable and integrity-checkable (for example, via a cryptographic hash), though TAIS does not mandate specific storage, retention, or immutability mechanisms.

**EvidenceRef**  
A lightweight pointer to an Evidence object used by other TAIS objects to reference supporting artifacts **without duplication**, optionally indicating purpose (e.g., `nameplate_photo`, `study_input`).

**Traceability**  
The ability to follow explicit links between assets, evidence, review events, and recorded outputs to support auditability, lineage, and historical context.

**Recorded Output**  
A value captured **as recorded** from an external source (e.g., a rating table PDF, spreadsheet, or engineering memo). TAIS does not compute, derive, validate, or determine outputs; it represents values exactly as recorded by the asset owner or responsible organization.

**Assumption Set**  
A declared set of inputs or assumptions used by an asset owner’s internal method or study (e.g., ambient conditions, loading assumptions, environmental parameters).

**Supersession**  
A logical chain indicating that a newer record replaces an older one for traceability purposes, while preserving historical records and auditability.

**Deliverable**  
A formal artifact produced by an engineering or operational process (e.g., rating sheet, signed memo, table PDF, spreadsheet).

**FAC-008**  
A NERC reliability standard associated with facility ratings. TAIS may support organization of evidence and provenance related to FAC-008 workflows, but **does not determine ratings, compliance status, or regulatory outcomes**.
