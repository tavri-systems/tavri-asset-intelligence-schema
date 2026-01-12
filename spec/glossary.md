# TAIS Glossary

**Asset**  
A physical or logical component being represented (transformer, breaker, relay, line segment, etc.).

**Evidence**  
A referenced artifact that supports a claim or record (photo, PDF, OCR extract, memo). Evidence is ideally immutable and integrity-checkable (hash).

**EvidenceRef**  
A lightweight pointer to Evidence used by other objects, optionally indicating purpose (e.g., nameplate_photo).

**Traceability**  
The ability to follow links between assets, evidence, review events, and recorded outputs.

**Recorded Output**  
A value captured from a source (e.g., a rating table PDF or engineering memo). TAIS does not compute or determine outputs; it represents them as recorded.

**Assumption Set**  
A declared set of inputs/assumptions used by an asset owner’s method or study (e.g., ambient conditions).

**Supersession**  
A chain indicating a newer record replaces an older one, preserving history and auditability.

**Deliverable**  
A formal artifact produced by a utility or engineering process (rating sheet, signed memo, table PDF).

**FAC-008**  
A NERC standard associated with facility ratings. TAIS can support evidence/provenance organization but does not determine compliance.
