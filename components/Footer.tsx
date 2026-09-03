import Icon from "./Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#292d35] bg-[#191c22]">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">

        {/* PressDrive */}
        <section>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffd015] text-[#141414]">
              &lt;-&gt;
            </span>
            PressDrive
          </Link>

          <p className="mt-4 max-w-47.5 text-[11px] leading-[1.6] text-[#9296a0]">
            Your all-in-one car rental platform connecting customers with
            rental offices and private drivers across Lebanon.
          </p>

          <div className="mt-4 flex gap-2">
            <a
              href="#social"
              className="grid h-7 w-7 place-items-center rounded-md border border-[#30343c] text-[10px] text-[#90949e] hover:border-[#ffd015] hover:text-[#ffd015]"
            >
              f
            </a>

            <a
              href="#social"
              className="grid h-7 w-7 place-items-center rounded-md border border-[#30343c] text-[10px] text-[#90949e] hover:border-[#ffd015] hover:text-[#ffd015]"
            >
              o
            </a>

            <a
              href="#social"
              className="grid h-7 w-7 place-items-center rounded-md border border-[#30343c] text-[10px] text-[#90949e] hover:border-[#ffd015] hover:text-[#ffd015]"
            >
              in
            </a>

            <a
              href="#social"
              className="grid h-7 w-7 place-items-center rounded-md border border-[#30343c] text-[10px] text-[#90949e] hover:border-[#ffd015] hover:text-[#ffd015]"
            >
              &gt;
            </a>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">
            Quick Links
          </h2>

          <nav className="mt-4 grid gap-2 text-[11px] text-[#9296a0]">
            <Link href="/">- Home</Link>
            <Link href="/browse">- Browse Vehicles</Link>
            <Link href="/ai-assistant">- AI Assistant</Link>
            <a href="#about">- About Us</a>
            <a href="#how">- How It Works</a>
            <a href="#pricing">- Pricing</a>
          </nav>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">
            Support
          </h2>

          <nav className="mt-4 grid gap-2 text-[11px] text-[#9296a0]">
            <a href="#help">- Help Center</a>
            <a href="#faqs">- FAQs</a>
            <a href="#terms">- Terms of Service</a>
            <a href="#privacy">- Privacy Policy</a>
            <a href="#cancel">- Cancellation Policy</a>
            <a href="#provider">- Become a Provider</a>
          </nav>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-white">
            Contact Us
          </h2>

          <div className="mt-4 grid gap-3 text-[11px] text-[#9296a0]">

            <p className="flex gap-2">
              <Icon
                name="mapPin"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]"
              />
              <span>
                <strong className="block font-medium text-white">
                  Address
                </strong>
                Hamra Street, Beirut, Lebanon
              </span>
            </p>

            <p className="flex gap-2">
              <Icon
                name="phone"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]"
              />
              <span>
                <strong className="block font-medium text-white">
                  Phone
                </strong>
                +961 1 234 567
              </span>
            </p>

            <p className="flex gap-2">
              <Icon
                name="mail"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd015]"
              />
              <span>
                <strong className="block font-medium text-white">
                  Email
                </strong>
                hello@pressdrive.com
              </span>
            </p>

          </div>
        </section>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-5xl border-t border-[#292d35] px-6 py-5 text-center text-[10px] text-[#737781] sm:px-10">
        Copyright 2024 PressDrive. All rights reserved.
      </div>
    </footer>
  );
}
