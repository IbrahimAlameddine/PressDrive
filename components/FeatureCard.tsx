import Icon from "./Icon";

export default function FeatureCard({ icon, title, description }: { icon: "brain" | "building" | "user"; title: string; description: string }) {
  return (
    <article className="rounded-xl border border-[#292d35] bg-[#111318] p-6 transition hover:border-[#665714]">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#ffd015] text-[#141414] shadow-[0_4px_16px_rgba(255,208,21,0.15)]">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="text-base font-bold text-[#f1f1ed]">{title}</h3>
      <p className="mt-2 text-sm leading-[1.65] text-[#9da1aa]">{description}</p>
    </article>
  );
}