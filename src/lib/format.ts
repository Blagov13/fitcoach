export const fmtCurrency = (value: number, currency = "USD") =>
    Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
  
  export function fmtDateLong(d = new Date()) {
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }