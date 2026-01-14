import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

const isDir = (p) => {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
};

const isFile = (p) => {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
};

const isJsonFile = (p) => p.toLowerCase().endsWith(".json");

function collectJsonFiles(target) {
  if (isFile(target)) return isJsonFile(target) ? [target] : [];
  if (!isDir(target)) return [];

  const out = [];
  for (const name of fs.readdirSync(target)) {
    const p = path.join(target, name);
    if (isDir(p)) out.push(...collectJsonFiles(p));
    else if (isFile(p) && isJsonFile(p)) out.push(p);
  }

  // stable ordering helps CI diffs
  return out.sort((a, b) => a.localeCompare(b));
}

function createAjv() {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    allowUnionTypes: true,
  });
  addFormats(ajv);
  return ajv;
}

function addSchemaIfMissing(ajv, schema, label) {
  if (!schema?.$id) throw new Error(`Schema missing $id: ${label}`);
  if (!ajv.getSchema(schema.$id)) ajv.addSchema(schema, schema.$id);
}

function compileSchema(ajv, schemaPath) {
  const schema = readJson(schemaPath);
  addSchemaIfMissing(ajv, schema, schemaPath);
  return ajv.getSchema(schema.$id) || ajv.compile(schema);
}

function prettyName(file, width = 35) {
  const base = path.basename(file);
  return base.length >= width ? base : base.padEnd(width);
}

function validateFile(ajv, validate, file, label, stats) {
  const data = readJson(file);
  const ok = validate(data);

  stats.total += 1;
  if (ok) {
    stats.passed += 1;
    console.log(`OK   ${prettyName(file)} (${label})`);
    return true;
  }

  stats.failed += 1;
  console.log(`FAIL ${prettyName(file)} (${label})`);
  console.log(ajv.errorsText(validate.errors, { separator: "\n" }));
  return false;
}

function summary(stats) {
  console.log("\n---- Summary ----");
  console.log(`Validated: ${stats.total}   Passed: ${stats.passed}   Failed: ${stats.failed}`);
}

function usage() {
  console.error("Usage:");
  console.error("  node validate.js <examplesFolder>");
  console.error("  node validate.js <schemaPath> <fileOrFolder> [more files/folders]");
}

const args = process.argv.slice(2);

if (args.length === 1 && isDir(args[0])) {
  const examplesDir = args[0];

  // examples/ -> json-schema/
  const repoRoot = path.dirname(examplesDir);
  const schemaDir = path.join(repoRoot, "json-schema");

  const coreSchemaPath = path.join(schemaDir, "core.schema.json");
  const facSchemaPath = path.join(schemaDir, "fac008.schema.json");

  if (!fs.existsSync(coreSchemaPath)) throw new Error(`Missing: ${coreSchemaPath}`);
  if (!fs.existsSync(facSchemaPath)) throw new Error(`Missing: ${facSchemaPath}`);

  const ajv = createAjv();

  // load both into the same AJV instance so cross-refs work
  addSchemaIfMissing(ajv, readJson(coreSchemaPath), coreSchemaPath);
  addSchemaIfMissing(ajv, readJson(facSchemaPath), facSchemaPath);

  const validateCore = compileSchema(ajv, coreSchemaPath);
  const validateFac = compileSchema(ajv, facSchemaPath);

  const files = collectJsonFiles(examplesDir);
  const stats = { total: 0, passed: 0, failed: 0 };

  let ok = true;
  for (const file of files) {
    const doc = readJson(file);

    // routing rule: FAC-008 packages define ratingRecords
    const fac = !!doc?.package?.ratingRecords;
    ok = validateFile(ajv, fac ? validateFac : validateCore, file, fac ? "fac008" : "core", stats) && ok;
  }

  summary(stats);
  process.exit(ok ? 0 : 1);
}

if (args.length < 2) {
  usage();
  process.exit(2);
}

const [schemaPath, ...targets] = args;

if (!fs.existsSync(schemaPath)) {
  console.error(`Schema not found: ${schemaPath}`);
  process.exit(2);
}

const ajv = createAjv();

// if the schema references ./core.schema.json, load it first when present
const schemaDir = path.dirname(schemaPath);
const coreSibling = path.join(schemaDir, "core.schema.json");
if (fs.existsSync(coreSibling)) {
  addSchemaIfMissing(ajv, readJson(coreSibling), coreSibling);
}

const validate = compileSchema(ajv, schemaPath);
const stats = { total: 0, passed: 0, failed: 0 };

let ok = true;
for (const target of targets) {
  const files = collectJsonFiles(target);
  for (const file of files) {
    ok = validateFile(
      ajv,
      validate,
      file,
      path.basename(schemaPath, ".schema.json"),
      stats
    ) && ok;
  }
}

summary(stats);
process.exit(ok ? 0 : 1);
