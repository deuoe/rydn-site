import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import { useBrand } from "../brand/brand"
import { buttonClasses, variantForBrand, type ButtonVariant } from "./buttonClasses"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

/**
 * Single button system. With no variant it follows the current brand
 * (Youth gold, Med emerald, Academy amber, France blue), so CTAs match
 * the page they sit on without every call site picking a colour.
 */
export default function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  const brand = useBrand()
  return (
    <button className={buttonClasses(variant ?? variantForBrand(brand), className)} {...props}>
      {children}
    </button>
  )
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
}

/** Anchor version of the same system, for mailto links, hashes, and href CTAs. */
export function ButtonLink({
  children,
  className,
  variant,
  ...props
}: ButtonLinkProps) {
  const brand = useBrand()
  return (
    <a className={buttonClasses(variant ?? variantForBrand(brand), className)} {...props}>
      {children}
    </a>
  )
}
