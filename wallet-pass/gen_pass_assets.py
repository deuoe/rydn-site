"""
Generate the RYDN gradient assets for your PassKit wallet pass.

Run from Terminal:
    cd ~/Documents/Claude/Projects/RYDN/wallet-pass
    python3 gen_pass_assets.py

Outputs (in this same folder):
    RYDN_pass_header.png        — gradient strip WITH the RYDN text (160x50 at 3x = 480x150)
    RYDN_pass_background.png    — plain gradient, no text (for the pass background)
    RYDN_pass_strip.png         — wide gradient banner for the strip image slot

If Python complains about missing PIL, run once:
    pip3 install Pillow --break-system-packages

(Or just `pip3 install Pillow` if your system allows.)
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ---- Brand palette ---------------------------------------------------------
NAVY = (15, 23, 42)         # slate-900
DEEP_BLUE = (14, 79, 163)   # RYDN primary
MID_BLUE = (30, 64, 175)
INDIGO = (49, 46, 129)
AMBER = (251, 191, 36)

# ---- Font lookup -----------------------------------------------------------
# We try a few system fonts so this works on any Mac without installs.
FONT_CANDIDATES = [
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Avenir.ttc",
]

def load_font(size, bold=False):
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size, index=1 if bold else 0)
        except Exception:
            continue
    # Last-ditch fallback
    return ImageFont.load_default()


# ---- Gradient helpers ------------------------------------------------------
def diagonal_gradient(size, c1, c2, c3=None):
    """Diagonal gradient image, sized for retina by default (caller scales)."""
    w, h = size
    img = Image.new("RGB", (w, h), c1)
    pixels = img.load()
    # Move along the diagonal — value t mixes c1 → c2 → c3
    diag = max(1, w + h)
    for y in range(h):
        for x in range(w):
            t = (x + y) / diag  # 0..1
            if c3 is None:
                r = int(c1[0] * (1 - t) + c2[0] * t)
                g = int(c1[1] * (1 - t) + c2[1] * t)
                b = int(c1[2] * (1 - t) + c2[2] * t)
            else:
                if t < 0.5:
                    tt = t * 2
                    r = int(c1[0] * (1 - tt) + c2[0] * tt)
                    g = int(c1[1] * (1 - tt) + c2[1] * tt)
                    b = int(c1[2] * (1 - tt) + c2[2] * tt)
                else:
                    tt = (t - 0.5) * 2
                    r = int(c2[0] * (1 - tt) + c3[0] * tt)
                    g = int(c2[1] * (1 - tt) + c3[1] * tt)
                    b = int(c2[2] * (1 - tt) + c3[2] * tt)
            pixels[x, y] = (r, g, b)
    return img


def add_radial_glow(img, position, radius, color, alpha=120):
    """Drop a soft radial color spot over the image (purely decorative)."""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = position
    for r in range(radius, 0, -2):
        a = int(alpha * (1 - r / radius))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     fill=(color[0], color[1], color[2], a))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


# ---- 1. Header strip with RYDN wordmark ------------------------------------
def build_header():
    """480 x 150 px — fits the 'logo' slot at 3x. Gradient + RYDN wordmark."""
    img = diagonal_gradient((480, 150), DEEP_BLUE, MID_BLUE, INDIGO)
    img = add_radial_glow(img, (450, 30), 220, AMBER, alpha=80)
    img = add_radial_glow(img, (40, 130), 220, (99, 102, 241), alpha=100)

    draw = ImageDraw.Draw(img)
    # Big "RYDN" wordmark
    title_font = load_font(60, bold=True)
    sub_font = load_font(20)

    title = "RYDN"
    # Letter spacing — Pillow doesn't do this natively, so we approximate
    # by drawing each letter with a small gap.
    x = 30
    y = 18
    for ch in title:
        draw.text((x, y), ch, font=title_font, fill="white")
        bbox = draw.textbbox((0, 0), ch, font=title_font)
        x += (bbox[2] - bbox[0]) + 8  # letter spacing

    sub = "RooZ Youth Development Network"
    draw.text((32, 95), sub, font=sub_font, fill=(255, 255, 255, 220))

    out = "RYDN_pass_header.png"
    img.save(out, "PNG", optimize=True)
    print(f"  Saved {out}  (480x150 px)")


# ---- 2. Plain gradient background ------------------------------------------
def build_background():
    """1125 x 432 px — covers the pass strip area at 3x with a clean gradient."""
    img = diagonal_gradient((1125, 432), DEEP_BLUE, MID_BLUE, INDIGO)
    img = add_radial_glow(img, (1050, 60), 500, AMBER, alpha=70)
    img = add_radial_glow(img, (80, 380), 500, (99, 102, 241), alpha=100)

    out = "RYDN_pass_background.png"
    img.save(out, "PNG", optimize=True)
    print(f"  Saved {out}  (1125x432 px)")


# ---- 3. Wide strip banner (alternative layout) ----------------------------
def build_strip():
    """Wide branded strip at 3x. Useful for the 'strip image' slot on
    Generic and Store Card pass types."""
    img = diagonal_gradient((1125, 432), DEEP_BLUE, MID_BLUE, NAVY)
    img = add_radial_glow(img, (920, 80), 400, AMBER, alpha=90)

    draw = ImageDraw.Draw(img)
    title_font = load_font(140, bold=True)
    sub_font = load_font(46)

    # Center title vertically
    draw.text((60, 110), "RYDN", font=title_font, fill="white")
    draw.text((62, 280), "RooZ Youth Development Network",
              font=sub_font, fill=(255, 255, 255, 220))

    out = "RYDN_pass_strip.png"
    img.save(out, "PNG", optimize=True)
    print(f"  Saved {out}  (1125x432 px)")


def main():
    print("Generating RYDN pass assets in this folder...")
    build_header()
    build_background()
    build_strip()
    print("\nDone. Upload these to PassKit:")
    print("  - RYDN_pass_header.png    → 'Logo' slot")
    print("  - RYDN_pass_background.png → 'Background image' slot")
    print("  - RYDN_pass_strip.png      → 'Strip image' slot (if available)")


if __name__ == "__main__":
    main()
