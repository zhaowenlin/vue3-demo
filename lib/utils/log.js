var projectName = 'perfintech';
export function warn(message) {
  console.warn("[" + projectName + " warn]:" + message);
}
export function error(message) {
  throw new Error("[" + projectName + " error]:" + message);
}