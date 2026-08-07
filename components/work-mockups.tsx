/* Skeleton dashboard mockups for the Selected Work cards — adapted from the
   approved design concept. Pure CSS shapes; replaced by real screenshots once
   the demo apps are built. */

function FrameDots({ label }: { label: string }) {
  return (
    <div className="relative flex items-center gap-1.5">
      <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
      <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
      <span className="h-[7px] w-[7px] rounded-full bg-[#3A3A48]" />
      <span className="ml-2.5 text-[10px] uppercase tracking-[0.16em] text-[#6C6C80]">
        {label}
      </span>
    </div>
  );
}

export function PulseCrmMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#0B0B0F_0%,#12111F_58%,#15142F_100%)] p-4">
      <div className="pointer-events-none absolute -top-10 -right-8 h-[180px] w-[220px] rounded-full bg-[radial-gradient(closest-side,rgba(220,38,38,0.34),rgba(220,38,38,0)_72%)]" />
      <FrameDots label="Pulse CRM" />
      <div className="relative mt-4 grid grid-cols-[84px_minmax(0,1fr)] gap-3.5">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-[62px] rounded-[3px] bg-white/15" />
          <div className="h-2 w-[46px] rounded-[3px] bg-white/10" />
          <div className="h-2 w-[54px] rounded-[3px] bg-white/10" />
          <div className="h-2 w-[40px] rounded-[3px] bg-white/10" />
          <div className="h-2 w-[50px] rounded-[3px] bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-white/[.07] bg-white/5 p-2.5">
              <div className="h-1.5 w-9 rounded-[3px] bg-white/[.13]" />
              <div className="mt-2 h-3 w-[52px] rounded-[3px] bg-white/35" />
            </div>
            <div className="flex-1 rounded-lg border border-white/[.07] bg-white/5 p-2.5">
              <div className="h-1.5 w-10 rounded-[3px] bg-white/[.13]" />
              <div className="mt-2 h-3 w-11 rounded-[3px] bg-white/35" />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-white/[.07] bg-white/[.04] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 rounded-sm bg-[linear-gradient(180deg,#EF4444,#B91C1C)]" />
              <span className="text-[10px] uppercase tracking-[0.1em] text-glint">
                AI follow-up drafted
              </span>
            </div>
            <div className="h-1.5 w-[92%] rounded-[3px] bg-white/[.14]" />
            <div className="h-1.5 w-[74%] rounded-[3px] bg-white/10" />
            <div className="h-1.5 w-[58%] rounded-[3px] bg-white/[.08]" />
          </div>
          <div className="flex flex-col gap-[7px]">
            <div className="h-[9px] rounded-[3px] bg-white/[.07]" />
            <div className="h-[9px] rounded-[3px] bg-white/[.055]" />
            <div className="h-[9px] rounded-[3px] bg-white/[.045]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AvaBotMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#0B0B0F_0%,#12111F_58%,#15142F_100%)] p-4">
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-[180px] w-[220px] rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.5),rgba(49,46,129,0)_72%)]" />
      <FrameDots label="Ava Support Bot" />
      <div className="relative mt-4 flex flex-col gap-2.5">
        <div className="flex max-w-[62%] flex-col gap-1.5 self-end rounded-[10px_10px_3px_10px] bg-white/[.08] px-3 py-2.5">
          <div className="h-1.5 w-[110px] rounded-[3px] bg-white/25" />
          <div className="h-1.5 w-[76px] rounded-[3px] bg-white/[.16]" />
        </div>
        <div className="flex max-w-[74%] flex-col gap-1.5 self-start rounded-[10px_10px_10px_3px] border border-glint/[.16] bg-glint/[.08] px-3 py-2.5">
          <div className="text-[9.5px] uppercase tracking-[0.12em] text-glint">
            Ava · from docs
          </div>
          <div className="h-1.5 w-full rounded-[3px] bg-white/20" />
          <div className="h-1.5 w-[88%] rounded-[3px] bg-white/[.14]" />
          <div className="h-1.5 w-[64%] rounded-[3px] bg-white/10" />
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-red-vivid/35 bg-red-vivid/[.08] px-3 py-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-red-vivid" />
          <span className="text-[9.5px] uppercase tracking-[0.12em] text-[#F5A3A3]">
            Handing off to human
          </span>
        </div>
        <div className="mt-1 rounded-full border border-white/[.08] bg-white/5 px-3.5 py-2.5">
          <div className="h-1.5 w-24 rounded-[3px] bg-white/[.12]" />
        </div>
      </div>
    </div>
  );
}
