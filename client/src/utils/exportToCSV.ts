import { type Product } from "../types/Product";

export const exportToCSV = (products: Product[]) => {
  if (products.length === 0) return;

  const headers = ["ID", "Tytuł", "Opis", "Cena"];
  const rows = products.map((p) => [
    p.id,
    p.title,
    p.description,
    p.price,
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",")
              ? `"${cell.replace(/"/g, '""')}"`
              : cell
          )
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "products.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
