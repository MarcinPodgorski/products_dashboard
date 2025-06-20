import { type Product } from "../../types/Product";
import { saveAs } from "file-saver";

export function exportToCSV(products: Product[], selectedColumns: { key: string; label: string }[]) {
  const headers = selectedColumns.map((c) => `"${c.label}"`).join(",");
  const rows = products.map((p) =>
    selectedColumns.map((c) => `"${(p as any)[c.key] ?? ""}"`).join(",")
  );
  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "produkty.csv");
}
