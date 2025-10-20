export function getPreviousYear(yearBefore: number): Date {
  const dateNow = new Date();
  const previousYear = new Date(
    dateNow.getFullYear() - yearBefore,
    dateNow.getMonth(),
    dateNow.getDate()
  );
  return previousYear;
}
