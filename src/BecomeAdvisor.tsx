import { useForm, type SubmitHandler } from "react-hook-form"
import Heading from "./components/Heading"
import Container from "./components/Container"
import { Forminit } from "forminit"
import { useRef, useState } from "react"

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

  console.log(import.meta.env.FORMINIT_ID)

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
    // This is the forminit ID. It would be public anyways if stored in .env, later
    // when we get a backend, we can authenticate the request to prevent abuse
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

  return (
    <Container>
      <Heading text="Become an Advisor" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/2 mx-auto mt-8 gap-6"
        ref={form}
      >
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            First Name <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Last Name <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Email <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("email", { required: true })}
            type="email"
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Phone Number <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            type="tel"
            placeholder="+16471234567"
            inputMode="tel"
            {...register("phone", {
              required: "This field is required",
              setValueAs: value => value.replace(/[\s()-]/g, ""),
              validate: value =>
                E164_PHONE_REGEX.test(value) || "Use E.164 format, e.g. +16471234567",
            })}
            maxLength={16}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message ?? "This field is required"}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Street Address <small className="text-pink-600">(Optional)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("streetAddress", { required: true })}
          />
          {errors.streetAddress && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            City <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("city", { required: true })}
          />
          {errors.city && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Zip/Postal Code <small className="text-pink-600">(Optional)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("zip", { required: true })}
          />
          {errors.zip && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Country <small className="text-pink-600">(Required)</small>
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("country", { required: true })}
          />
          {errors.country && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Work Type <small className="text-pink-600">(Required)</small>
          </label>
          <select
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("workType", { required: true })}
          >
            <option value="On-Site">On-Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.workType && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Interests <small className="text-pink-600">(Required)</small>
          </label>
          <div className="mb-2 ml-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Marketing"
                {...register("interests", { required: true })}
              />
              Marketing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Finance"
                {...register("interests", { required: true })}
              />
              Finance
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Technology"
                {...register("interests", { required: true })}
              />
              Technology
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Education"
                {...register("interests", { required: true })}
              />
              Education
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Healthcare"
                {...register("interests", { required: true })}
              />
              Healthcare
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Arts"
                {...register("interests", { required: true })}
              />
              Arts
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="transform scale-150"
                value="Other"
                {...register("interests", { required: true })}
              />
              Other
            </label>
          </div>
          <small className="mb-1">Select all that apply.</small>
          {errors.interests && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Resume <small className="text-pink-600">(Optional)</small>
          </label>
          <input
            type="file"
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            accept=".pdf,.doc,.docx"
            {...register("resume", { required: true })}
          />
          {errors.resume && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            I have a clean criminal record <small className="text-pink-600">(Required)</small>
          </label>
          <select
            className="border-2 border-gray-300 rounded-md p-2 mb-1"
            {...register("cleanCriminalRecord", { required: true })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.cleanCriminalRecord && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">
            Tell us about yourself <small className="text-pink-600">(Required)</small>
          </label>
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 mb-1 pb-64"
            {...register("aboutYou", { required: true })}
            minLength={30}
          />
          {errors.aboutYou && <span className="text-red-500">This field is required</span>}
        </div>

        {status === "error" && <p className="error">{error}</p>}
        {status === "success" && <p className="success">Message sent successfully!</p>}

        <button
          disabled={status === "loading"}
          type="submit"
          className="w-full lg:w-64 self-center rounded-lg bg-[#4facfe] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-[#4facfe] focus:ring-offset-2 cursor-pointer"
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>
      </form>
      {/* <Paragraph>
        At RooZ Youth Development Network, we believe that guidance can change the trajectory of a
        student's life. Many young people have the motivation and potential to succeed but lack
        access to individuals who can share real-world experience, insight, and encouragement. Our
        advisors help bridge that gap by offering mentorship, sharing their experiences, and helping
        students make informed academic and career decisions. Who Can Apply We welcome individuals
        from any area of expertise who are passionate about supporting and guiding students.
        Advisors may include: University students Alumni and graduates Researchers Professionals
        from any field What Advisors Do Advisors may contribute through: One-on-one mentorship
        sessions with students Online or in-person workshops Sharing insights about education
        pathways, careers, and personal development Participation is flexible and volunteer-based,
        depending on your availability. How to Apply If you are interested in becoming an advisor,
        please send the following to our team: • Your resume • A short paragraph explaining why you
        would like to become an advisor Send your application to: info@rydn.ca Our team will review
        your application and contact you if there is a good fit.
      </Paragraph> */}
    </Container>
  )
}
