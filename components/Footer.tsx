import Icon from "./Icon";
import Link from "next/link";

const quickLinks = [
  ["Home", "/"],
  ["Browse Vehicles", "#available"],
  ["AI Assistant", "#features"],
  ["About Us", "#about"],
  ["How It Works", "#how"],
  ["Pricing", "#pricing"],
];

const supportLinks = [
  ["Help Center", "#help"],
  ["FAQs", "#faqs"],
  ["Terms of Service", "#terms"],
  ["Privacy Policy", "#privacy"],
  ["Cancellation Policy", "#cancel"],
  ["Become a Provider", "#provider"],
];

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <section>
      <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">{title}</h2>
      <nav className="mt-4 grid gap-2 text-[11px] text-[#9296a0]">
        {links.map(([label, href]) => (
          <a key={label} href={href}>
            - {label}
          </a>
        ))}
      </nav>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#292d35] bg-[#191c22]">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <section>
          <Link className="flex items-center gap-2 text-sm font-bold" href="/">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-[#141414]">&lt;-&gt;</span>
            PressDrive
          </Link>
          <p className="mt-4 max-w-47.5 text-[11px] leading-[1.6] text-[#9296a0]">
            Your all-in-one car rental platform connecting customers with rental offices and private drivers across Lebanon.
          </p>
          <div className="mt-4 flex gap-2">
            {["f", "o", "in", ">"].map((item) => (
              <a key={item} href="#social" aria-label="Social media" className="grid h-7 w-7 place-items-center rounded-md border border-[#30343c] text-[10px] text-[#90949e] hover:border-[#ffd015] hover:text-[#ffd015]">
                {item}
              </a>
            ))}
          </div>
        </section>

        <FooterLinks title="Quick Links" links={quickLinks} />
        <FooterLinks title="Support" links={supportLinks} />

        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">Contact Us</h2>
          <div className="mt-4 grid gap-3 text-[11px] text-[#9296a0]">
            <p className="flex gap-2">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]" />
              <span><strong className="block font-medium text-white">Address</strong>Hamra Street, Beirut, Lebanon</span>
            </p>
            <p className="flex gap-2">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]" />
              <span><strong className="block font-medium text-white">Phone</strong>+961 1 234 567</span>
            </p>
            <p className="flex gap-2">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]" />
              <span><strong className="block font-medium text-white">Email</strong>hello@pressdrive.com</span>
            </p>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-5xl border-t border-[#292d35] px-6 py-5 text-center text-[10px] text-[#737781] sm:px-10">
        Copyright 2024 PressDrive. All rights reserved.
      </div>
    </footer>
  );
}
