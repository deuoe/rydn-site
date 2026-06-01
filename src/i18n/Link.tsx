import { Link as RouterLink, type LinkProps } from "react-router-dom"
import { useLocalizedHref } from "./useLocalizedNav"

/**
 * Drop-in replacement for react-router-dom's <Link>. Same API, but
 * automatically prepends the active language prefix when the user is
 * browsing in any non-default language (fr, es, fa, he).
 *
 * Use exactly like react-router-dom's Link:
 *   <Link to="/about-us">About</Link>
 *
 * External URLs, anchors (#section), and mailto/tel links pass through
 * untouched.
 */
export function Link(props: LinkProps) {
  const localize = useLocalizedHref()
  const to = typeof props.to === "string" ? localize(props.to) : props.to
  return <RouterLink {...props} to={to} />
}

export default Link
