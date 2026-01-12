#!/usr/bin/env python3
"""
TAIS JSON → CSV Export (Illustrative)

- Non-normative example only.
- Exports FAC-008 RatingRecords into a flat CSV (one row per rating value).
- No calculations or compliance logic are performed.

Usage:
  python3 json_to_csv_example.py examples/fac008-transformer-example.json out.csv
  python3 json_to_csv_example.py examples/fac008-starter-package.json out.csv
"""

import csv
import json
import sys
from typing import Any, Dict, List, Optional


def first_or_blank(items: List[Dict[str, Any]], key: str) -> str:
    if not items:
        return ""
    val = items[0].get(key)
    return "" if val is None else str(val)


def join_ids(ids: Optional[List[str]]) -> str:
    if not ids:
        return ""
    return "|".join(str(x) for x in ids)


def join_evidence_refs(evidence_refs: Optional[List[Dict[str, Any]]]) -> str:
    if not evidence_refs:
        return ""
    ids = [ref.get("evidenceId", "") for ref in evidence_refs if ref.get("evidenceId")]
    return "|".join(ids)


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: python3 json_to_csv_example.py <input.json> <output.csv>", file=sys.stderr)
        return 2

    in_path, out_path = sys.argv[1], sys.argv[2]

    with open(in_path, "r", encoding="utf-8") as f:
        doc = json.load(f)

    pkg = doc.get("package", {})

    facilities = pkg.get("facilities", []) or []
    elements = pkg.get("elements", []) or []
    assets = pkg.get("assets", []) or []
    rating_records = pkg.get("ratingRecords", []) or []

    # Simple lookups (optional)
    element_by_id = {e.get("elementId"): e for e in elements if e.get("elementId")}
    asset_by_id = {a.get("assetId"): a for a in assets if a.get("assetId")}

    facility_id = first_or_blank(facilities, "facilityId")
    facility_name = first_or_blank(facilities, "name")

    fieldnames = [
        "facility_id",
        "facility_name",
        "element_id",
        "element_name",
        "asset_id",
        "asset_class",
        "manufacturer",
        "model",
        "serial_number",
        "rating_record_id",
        "rating_type",
        "rating_quantity",
        "rating_value",
        "rating_unit",
        "basis_label",
        "cooling_mode",
        "effective_start_date",
        "effective_end_date",
        "study_reference_ids",
        "deliverable_ids",
        "evidence_reference_ids",
        "notes",
    ]

    rows: List[Dict[str, str]] = []

    for rr in rating_records:
        rr_id = str(rr.get("ratingRecordId", ""))
        rr_type = str(rr.get("ratingType", ""))
        asset_id = str(rr.get("assetId", ""))
        element_id = str(rr.get("elementId", ""))

        asset = asset_by_id.get(asset_id, {})
        element = element_by_id.get(element_id, {})

        effective = rr.get("effective", {}) or {}
        eff_start = str(effective.get("start", ""))
        eff_end = str(effective.get("end", ""))

        values = rr.get("values", []) or []
        for v in values:
            row = {
                "facility_id": facility_id,
                "facility_name": facility_name,
                "element_id": element_id,
                "element_name": str(element.get("displayName", "")),
                "asset_id": asset_id,
                "asset_class": str(asset.get("assetClass", "")),
                "manufacturer": str(asset.get("manufacturer", "")),
                "model": str(asset.get("model", "")),
                "serial_number": str(asset.get("serialNumber", "")),
                "rating_record_id": rr_id,
                "rating_type": rr_type,
                "rating_quantity": str(v.get("quantity", "")),
                "rating_value": "" if v.get("value") is None else str(v.get("value")),
                "rating_unit": str(v.get("unit", "")),
                "basis_label": str(v.get("basisLabel", "")),
                "cooling_mode": str(v.get("coolingMode", "")),
                "effective_start_date": eff_start,
                "effective_end_date": eff_end,
                "study_reference_ids": join_ids(rr.get("studyRefIds")),
                "deliverable_ids": join_ids(rr.get("deliverableIds")),
                "evidence_reference_ids": join_evidence_refs(rr.get("evidenceRefs")),
                "notes": str(rr.get("notes", "")),
            }
            rows.append(row)

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} rows to {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
