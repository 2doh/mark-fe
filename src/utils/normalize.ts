export const normalizeFunc = (data?: string | null) =>
  data?.trim().replace(/\s+/g, "").toLocaleLowerCase("ko").normalize("NFC") ||
  "";
