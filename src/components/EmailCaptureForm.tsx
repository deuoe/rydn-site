import { useState, type FormEvent } from "react"
import { Forminit } from "forminit"
import { AlertCircle, CheckCircle2 } from "lucide-react"

/**
 * Email-only capture backed by Forminit, the same form backend as the
 * Become Advisor form.
 *
 * NOTE: this repo has a single Forminit form key (created in the Forminit
 * dashboard for the advisor application). Every capture reuses that key
 * and tags its submissions with fi-text-source, so the inbox can tell a
 * newsletter signup from an academy or france interest signup. If the
 * owner creates dedicated Forminit forms for each capture, add a formKey
 * prop here and pass the new keys in at each call site.
 */
const FORMINIT_KEY = "qavfvk7sam9"
const forminit = new Forminit()

type EmailCaptureFormProps = {
  /** Tag stored as fi-text-source on the submission, e.g. "Newsletter: RYDN". */
  source: string
  /** Optional list name, stored as fi-text-list. */
  list?: string
  placeholder?: string
  buttonLabel: string
  successMessage: string
  inputId?: string
  inputClassName: string
  buttonClassName: string
  formClassName?: string
}

export default function EmailCaptureForm({
  source,
  list,
  placeholder = "you@example.com",
  buttonLabel,
  successMessage,
  inputId,
  inputClassName,
  buttonClassName,
  formClassName = "flex gap-2",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const formData = new FormData()
    formData.append("fi-sender-email", email)
    formData.append("fi-text-source", source)
    if (list) formData.append("fi-text-list", list)

    const { error: submitError } = await forminit.submit(FORMINIT_KEY, formData)
    if (submitError) {
      setStatus("error")
      setError(submitError.message)
      return
    }
    setStatus("success")
  }

  if (status === "success") {
    return (
      <p className="flex items-start gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400" role="status">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
        {successMessage}
      </p>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={formClassName}>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading"}
          className={inputClassName}
        />
        <button type="submit" disabled={status === "loading"} className={buttonClassName}>
          {status === "loading" ? "Sending…" : buttonLabel}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 flex items-start gap-2 text-sm text-rose-600 dark:text-rose-400" role="alert">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          Something went wrong, please try again.{error ? ` (${error})` : ""}
        </p>
      )}
    </div>
  )
}
