import { useForm, type SubmitHandler } from "react-hook-form"
import { motion } from "motion/react"
import { Forminit } from "forminit"
import { useRef, useState } from "react"
import { Sparkles, Clock, Heart, BookOpen, Users, CheckCircle2, AlertCircle, ArrowRight, Send } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"

type Inputs = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  streetAddress: string
  city: string
  zip: string
  country: string
  workType: string
  interests: string[]
  resume: FileList
  cleanCriminalRecord: string
  aboutYou: string
}

const FORMINIT_KEY = "qavfvk7sam9"
const forminit = new Forminit()
const E164_PHONE_REGEX = /^\+[1-9]\d{1,14}$/

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
const labelClass = "mb-2 text-sm font-semibold text-slate-800"
const errorClass = "mt-1 text-xs text-rose-600 flex items-center gap-1"

export default function BecomeAdvisor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      streetAddress: "",
      city: "",
      zip: "",
      country: "",
      workType: "",
      interests: [],
      cleanCriminalRecord: "Yes",
      aboutYou: "",
    },
  })
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async d => {
    setStatus("loading")
    setError(null)

    const formData = new FormData()
    formData.append("fi-sender-firstName", d.firstName)
    formData.append("fi-sender-lastName", d.lastName)
    formData.append("fi-sender-email", d.email)
    formData.append("fi-text-phone", d.phone)
    formData.append("fi-sender-address", d.streetAddress)
    formData.append("fi-sender-city", d.city)
    formData.append("fi-text-zip", d.zip)
    formData.append("fi-text-country", d.country)
    formData.append("fi-text-workType", d.workType)
    formData.append("fi-text-interests", d.interests.join(", "))
    formData.append("fi-text-cleanCriminalRecord", d.cleanCriminalRecord)
    formData.append("fi-text-aboutYou", d.aboutYou)
    formData.append("fi-file-resume", d.resume[0])

    const { error, redirectUrl } = await forminit.submit(FORMINIT_KEY, formData)

    if (error) {
      setStatus("error")
      setError(error.message)
      return
    }

    setStatus("success")
    clearErrors()
    reset()

    if (redirectUrl) {
      window.location.href = redirectUrl
    }
  }

  const benefits = [
    { Icon: Clock, title: "Flexible commitment", body: "Most advisors give just an hour or two a month. You set the pace." },
    { Icon: Heart, title: "Real impact", body: "Help students who'd otherwise have nowhere to turn for guidance." },
    { Icon: BookOpen, title: "Pick your topics", body: "Advise on what you know — your major, your exam, your career." },
    { Icon: Users, title: "Join a community", body: "Connect with 25+ student advisors across Canada." },
  ]

  const steps = [
    { n: "01", title: "Apply below", body: "Fill out the form. Takes about 5 minutes." },
    { n: "02", title: "Quick chat", body: "Our team reaches out for a friendly intro call." },
    { n: "03", title: "Start advising", body: "Set your availability, pick topics, and you're live." },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Volunteer mentorship
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Be the mentor
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                you needed.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Share what you've already learned with the next student walking the same path. Apply once, advise on your terms.
            </p>
            <a href="#apply" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-8 py-3.5 font-semibold hover:bg-sky-50 transition">
              Apply now <ArrowRight size={16} />
            </a>
          </motion.div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Why advise" text="What you get out of it" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 text-sky-700">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow="How it works" text="From apply to advising" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-flex">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30">
                    <span className="font-display text-2xl font-bold">{s.n}</span>
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed max-w-xs mx-auto">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-20 scroll-mt-20">
        <Container>
          <Heading eyebrow="Application" text="Apply to advise" />
          <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Fill out the form below. We'll reach out within a few business days.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="mt-14 max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
            ref={form}
          >
            <div className="flex flex-col">
              <label className={labelClass}>First name <span className="text-rose-500">*</span></label>
              <input className={inputClass} {...register("firstName", { required: true })} />
              {errors.firstName && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Last name <span className="text-rose-500">*</span></label>
              <input className={inputClass} {...register("lastName", { required: true })} />
              {errors.lastName && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Email <span className="text-rose-500">*</span></label>
              <input className={inputClass} type="email" placeholder="you@example.com" {...register("email", { required: true })} />
              {errors.email && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Phone <span className="text-rose-500">*</span></label>
              <input
                className={inputClass}
                type="tel"
                placeholder="+16471234567"
                inputMode="tel"
                maxLength={16}
                {...register("phone", {
                  required: "Required",
                  setValueAs: value => value.replace(/[\s()-]/g, ""),
                  validate: value => E164_PHONE_REGEX.test(value) || "Use E.164 format (e.g. +16471234567)",
                })}
              />
              {errors.phone && <span className={errorClass}><AlertCircle size={12} /> {errors.phone.message ?? "Required"}</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>Street address</label>
              <input className={inputClass} {...register("streetAddress", { required: true })} />
              {errors.streetAddress && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>City <span className="text-rose-500">*</span></label>
              <input className={inputClass} {...register("city", { required: true })} />
              {errors.city && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Postal code</label>
              <input className={inputClass} {...register("zip", { required: true })} />
              {errors.zip && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Country <span className="text-rose-500">*</span></label>
              <input className={inputClass} {...register("country", { required: true })} />
              {errors.country && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Work type <span className="text-rose-500">*</span></label>
              <select className={inputClass} {...register("workType", { required: true })}>
                <option value="On-Site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.workType && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>Areas of interest <span className="text-rose-500">*</span></label>
              <p className="text-xs text-slate-500 mb-3">Select all that apply.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["Marketing", "Finance", "Technology", "Education", "Healthcare", "Arts", "Other"].map(opt => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-sky-300 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded text-sky-600 focus:ring-sky-500"
                      value={opt}
                      {...register("interests", { required: true })}
                    />
                    <span className="text-sm font-medium text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <span className={errorClass}><AlertCircle size={12} /> Pick at least one</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>Resume <span className="text-rose-500">*</span></label>
              <input
                type="file"
                className="block w-full text-sm text-slate-700 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer rounded-xl border border-slate-300 bg-white p-2"
                accept=".pdf,.doc,.docx"
                {...register("resume", { required: true })}
              />
              {errors.resume && <span className={errorClass}><AlertCircle size={12} /> Resume required</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>I have a clean criminal record <span className="text-rose-500">*</span></label>
              <select className={inputClass} {...register("cleanCriminalRecord", { required: true })}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.cleanCriminalRecord && <span className={errorClass}><AlertCircle size={12} /> Required</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className={labelClass}>Tell us about yourself <span className="text-rose-500">*</span></label>
              <textarea
                className={inputClass + " min-h-[160px] resize-y"}
                placeholder="Why do you want to be an advisor? What can you help students with?"
                {...register("aboutYou", { required: true, minLength: 30 })}
                minLength={30}
              />
              {errors.aboutYou && <span className={errorClass}><AlertCircle size={12} /> Tell us a bit more (min 30 characters)</span>}
            </div>

            {status === "error" && (
              <div className="md:col-span-2 flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>Something went wrong: {error}</p>
              </div>
            )}
            {status === "success" && (
              <div className="md:col-span-2 flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <p>Application submitted! We'll be in touch soon.</p>
              </div>
            )}

            <div className="md:col-span-2 flex justify-center mt-3">
              <button
                disabled={status === "loading"}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-10 py-3.5 text-sm font-semibold transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : <>Submit application <Send size={14} /></>}
              </button>
            </div>
          </motion.form>
        </Container>
      </section>
    </>
  )
}
