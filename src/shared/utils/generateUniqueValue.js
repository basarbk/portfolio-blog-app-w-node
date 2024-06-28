export default function generateUniqueValue(short = false) {
  const value = crypto.randomUUID();
  if (short) {
    return value.split("-")[0];
  }
  return value;
}
