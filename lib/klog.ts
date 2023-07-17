export interface Output {
  records: KlogRecord[];
  errors: string[] | null;
}

export interface KlogEntry {
  type: "range" | "duration";
  summary: string;
  tags: string[];
  total: string;
  total_mins: number;
  start: string;
  start_mins: number;
  end: string;
  end_mins: number;
}

export interface KlogRecord {
  date: string;
  summary: string;
  total: string;
  total_mins: number;
  should_total: string;
  should_total_mins: number;
  diff: string;
  diff_mins: number;
  tags: string[];
  entries: KlogEntry[];
}

export function formatText(input: string) {
  const [date, summary] = input.split(":");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}:${summary}`;
}
