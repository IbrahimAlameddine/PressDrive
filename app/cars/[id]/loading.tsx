export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#0f1015] flex flex-col items-center justify-center text-white">
      {/* دائرة التحميل المضيئة بالأصفر */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-[#ffcc00] rounded-full animate-spin"></div>
        <span className="absolute text-xs">🚗</span>
      </div>
      
      <p className="mt-4 text-xs font-semibold text-gray-400 tracking-wider animate-pulse uppercase">
        Loading Vehicle Details...
      </p>
    </div>
  );
}