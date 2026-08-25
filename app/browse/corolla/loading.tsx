export default function CorollaLoading() {
  return (
    <main className="grid min-h-[60vh] flex-1 place-items-center bg-[#090a0d]" aria-busy="true" aria-label="Loading Corolla details">
      <div className="flex items-center gap-3 text-sm text-[#858994]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b371f] border-t-[#ffd015]" aria-hidden="true" />
        Loading details...
      </div>
    </main>
  );
}