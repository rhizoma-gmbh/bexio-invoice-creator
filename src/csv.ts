import { readCSVObjects } from "https://deno.land/x/csv@v0.8.0/mod.ts";

export interface CsvLine {
  project: string;
  startDate: string;
  endDate?: string;
  description: string;
  hours: number;
  seen: boolean;
}

// TODO: Requires refactoring, one loop less should be possible
export async function readCsvReport(path: string): Promise<CsvLine[]> {
  const f = await Deno.open(path);
  const output: CsvLine[] = [];

  for await (const obj of readCSVObjects(f)) {
    if (!obj["Hour Date"]) {
      continue;
    }

    output.push({
      project: obj["Project"],
      startDate: obj["Hour Date"],
      description: obj["Hour Note"],
      hours: parseFloat(obj["Logged Hours"]),
      seen: false,
    });
  }

  output.sort((a, b) => a.startDate.localeCompare(b.startDate));
  const tempArray: CsvLine[] = [];
  for (const [i, match] of output.entries()) {
    if (match.seen) {
      continue;
    }
    for (const [y, line] of output.entries()) {
      if (i === y) {
        continue;
      }
      if (match.description === line.description) {
        if (match.seen) {
          continue;
        }
        if (match.startDate !== line.startDate) {
          match.endDate = line.startDate;
        }
        match.hours += line.hours;
        line.seen = true;
      }
    }
    match.seen = true;
    tempArray.push(match);
  }

  f.close();

  return tempArray;
}
