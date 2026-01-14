# TAIS Schema Validator (Reference Tooling)

**Status:** Non-normative, reference implementation  
**Applies to:** Tavri Asset Intelligence Schema (TAIS) v0.1.1+

This folder contains a **reference validator** for the Tavri Asset Intelligence Schema (TAIS), implemented using Node.js and JSON Schema (Draft 2020-12).

The validator is provided to:
- Reduce adoption friction
- Demonstrate expected schema behavior
- Validate example TAIS packages during development

Use of this validator is **optional**. TAIS does **not** require Node.js, this tool, or any specific validation implementation.

---

## What This Validator Does

The validator checks **structural conformance only**, including:
- Required fields
- Data types
- Allowed values (Enums)
- Identifier formats (Regex)
- Forbidden additional properties

Validation confirms that a TAIS package is **well-formed and readable**, not that it is correct, complete, approved, or suitable for operational use. Passing validation represents the **minimum interoperability threshold** (“the floor, not the ceiling”).

---

## What This Validator Does *Not* Do

This tool does **not**:
- Perform engineering calculations
- Determine equipment ratings
- Evaluate engineering correctness
- Enforce compliance or regulatory rules
- Replace organizational review or approval processes

All authority, judgment, and responsibility remain with the data owner.

---

## Folder Structure (Expected)

This validator assumes a repository layout similar to the following:

```text
tavri-asset-intelligence-schema/
├── json-schema/
│   ├── core.schema.json
│   └── fac008.schema.json
├── examples/
│   ├── evidence-example.json
│   ├── fac008-starter-package.json
│   └── ...
└── validator/
    ├── validate.js
    └── README.md
```

The validator automatically:

- Loads the Core and FAC-008 schemas.

- Discovers JSON files recursively under an examples folder.

- Routes files to the appropriate schema based on content.

---

## Usage (Illustrative)

From the validator directory:
```text
# Validate all files in the examples directory
node validate.js ../examples


# Validate specific files or folders against a specific schema
node validate.js ../json-schema/fac008.schema.json ../examples
```
---

### Output Format

Validation output includes:

- File Name: The path of the file being tested.

- Schema Context: Whether it was tested against core or fac008.

- Failures: Specific constraint failures (path, message, and value).

- Summary: A final tally of passed and failed files.

---

### Technical Requirements

    Node.js: v18.0.0 or higher

    Dependencies: ajv, ajv-formats (install via npm install)