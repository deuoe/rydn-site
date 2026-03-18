import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/50">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              RooZ Youth Development Network
            </h2>
            <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">
              We connect students with mentors who can guide them through academics, career paths,
              and life decisions. Our goal is to make mentorship accessible, practical, and
              community-driven.
            </p>

            <div className="mt-6">
              <a
                href="/about-us"
                className="inline-flex items-center rounded-lg bg-[#4facfe] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-[#4facfe] focus:ring-offset-2"
              >
                Learn More
              </a>
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
              <dl className="mt-4 space-y-3 text-slate-700">
                <div className="flex items-start gap-2">
                  <dt className="min-w-14 font-medium text-slate-900">Phone</dt>
                  <dd>(647) 498-3938</dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="min-w-14 font-medium text-slate-900">Email</dt>
                  <dd>
                    <a
                      href="mailto:info@rydn.ca"
                      className="text-sky-700 underline decoration-[#4facfe] underline-offset-4 transition hover:text-sky-900"
                    >
                      info@rydn.ca
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Follow Us</h2>
              <p className="mt-2 text-slate-600">
                Stay connected with RooZ Youth Development Network.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="#"
                  aria-label="twitter"
                  className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/rydn.ca"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            © 2026 RooZ Youth Development Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
