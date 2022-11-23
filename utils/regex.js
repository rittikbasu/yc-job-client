export function getBatch(string) {
  const regex = /YC\s\w+/;
  const match = string.match(regex);
  if (match) {
    return match[0].replace("YC", "");
  } else {
    return "";
  }
}

export function removeBatchFromTitle(string) {
  return string.replace(/YC\s\w+/, "").replace("()", "");
}
