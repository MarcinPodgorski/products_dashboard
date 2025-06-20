import { type Product } from "../types/Product";

export const exportToXML = (products: Product[]) => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<products>\n` +
    products
      .map(
        (p) => `
  <product>
    <id>${p.id}</id>
    <title>${p.title}</title>
    <description>${p.description}</description>
    <price>${p.price}</price>
    <image<${p.images[0]}</image>
  </product>`
      )
      .join("\n") +
    "\n</products>";

  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "products.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
