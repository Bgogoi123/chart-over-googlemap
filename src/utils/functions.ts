export function convertDateToString(dateProp: Date) {
  return new Date(dateProp).toISOString().slice(0, 10);
}
