/* Public document verification.

   Every invoice and letterhead Actorix issues carries a number and a link back
   to actorix.in/verify/<slug>. A client — or their accountant, or a bank —
   can confirm the document is genuinely ours without emailing to ask.

   WHAT IS AND ISN'T HERE
   The lookup reads the `public_verify` tab of the records sheet, which holds
   only: number, issue date, type, status. No client name, no amount, no line
   items. Verification URLs are public and guessable, so anything that would
   leak a client's business if guessed simply is not in that tab.

   The admin tool owns the write side; this repo only reads. It uses the Apps
   Script GET endpoint, which needs no secret precisely because the data behind
   it is non-sensitive. The shared secret stays in the private admin repo. */

export type VerifiedDocument = {
  found: true;
  number: string;
  issueDate: string;
  /** "Invoice" | "Letter" */
  type: string;
  /** invoices: draft/sent/paid/cancelled · letters: issued */
  status: string;
};

/** URL-safe form used in the printed links: ACT/2026-27/001 → ACT-2026-27-001 */
export const toSlug = (number: string) => number.replace(/\//g, "-");

/** Reverse of toSlug. Returns null for anything that isn't a document number,
    so a junk URL becomes a clean 404 rather than a call to Apps Script. */
export function fromSlug(slug: string): string | null {
  const parts = slug.toUpperCase().split("-");

  // ACT-LH-2026-27-001  (letterhead)
  if (parts.length === 5 && parts[0] === "ACT" && parts[1] === "LH") {
    if (!/^\d{4}$/.test(parts[2]) || !/^\d{2}$/.test(parts[3]) || !/^\d+$/.test(parts[4])) {
      return null;
    }
    return `ACT-LH/${parts[2]}-${parts[3]}/${parts[4]}`;
  }

  // ACT-2026-27-001  (invoice)
  if (parts.length === 4 && parts[0] === "ACT") {
    if (!/^\d{4}$/.test(parts[1]) || !/^\d{2}$/.test(parts[2]) || !/^\d+$/.test(parts[3])) {
      return null;
    }
    return `ACT/${parts[1]}-${parts[2]}/${parts[3]}`;
  }

  return null;
}

/** Look a number up. Returns null when not found, when the endpoint is not
    configured, or when it fails — the page treats all three the same way,
    because "we cannot confirm this" is the honest answer in every case. */
export async function lookup(number: string): Promise<VerifiedDocument | null> {
  const endpoint = process.env.APPS_SCRIPT_VERIFY_URL;
  if (!endpoint) return null;

  try {
    const res = await fetch(
      `${endpoint}?number=${encodeURIComponent(number)}`,
      // Apps Script redirects to googleusercontent; revalidate hourly so a
      // status change (sent → paid) shows up without hammering the sheet.
      { redirect: "follow", next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.found ? (data as VerifiedDocument) : null;
  } catch {
    return null;
  }
}

/** How a status reads to someone who isn't us. */
export const statusLabel = (type: string, status: string) => {
  if (type !== "Invoice") return "Issued by Actorix";
  switch (status) {
    case "paid":
      return "Paid in full";
    case "cancelled":
      return "Cancelled";
    case "draft":
      return "Draft — not yet issued";
    default:
      return "Issued, awaiting payment";
  }
};
