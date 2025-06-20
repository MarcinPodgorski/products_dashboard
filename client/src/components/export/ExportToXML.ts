import { type Product } from "../../types/Product";
import { saveAs } from "file-saver";

export function exportToXML(products: Product[], selectedColumns: { key: string; label: string }[]) {
  const xmlItems = products
    .map((p) => {
      const fields = selectedColumns
        .map((c) => `<${c.label}>${(p as any)[c.key] ?? ""}</${c.label}>`)
        .join("");
      return `<product>${fields}</product>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><products>${xmlItems}</products>`;
  const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
  saveAs(blob, "produkty.xml");
}
