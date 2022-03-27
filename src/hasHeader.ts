// if there is header already, return true. if not return false.
export function hasHeader(text: string): boolean {
  const outsidePattern = new RegExp(/^\/\* \*{74} \*\/$/);
  const innerPattern = new RegExp(/^\/\* .{74} \*\/$/);
  const lines = text.split('\n', 11);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((i === 0 || i === 10) && !line.match(outsidePattern)) {
      return false;
    } else if ((i > 0 || i < 10) && !line.match(innerPattern)) {
      return false;
    }
  }
  return true;
}
