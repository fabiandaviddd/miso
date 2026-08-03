#!/usr/bin/env python3
"""Erzeugt die MisoNIE-App-Icons ohne externe Bibliotheken (nur stdlib).

Motiv: ruhige, nach außen weicher werdende Ringe ("leiser werdender Klang")
in Grün auf dunkelgrünem Grund. Bewusst schlicht, damit es auch klein wirkt.

Aufruf:  python3 tools/gen_icons.py
"""
import zlib, struct, math, os

OUT = os.path.join(os.path.dirname(__file__), "..", "icons")

# --- Farbpalette (dunkle Grüntöne) ---
BG_TOP    = (0x10, 0x22, 0x1a)   # oben etwas heller
BG_BOTTOM = (0x08, 0x14, 0x0f)   # unten dunkler
ACCENT    = (0x53, 0xd3, 0x9a)   # ruhiges Grün
ACCENT_SOFT = (0x8f, 0xe4, 0xbc)


def clamp(x, lo=0.0, hi=1.0):
    return lo if x < lo else hi if x > hi else x


def smoothstep(e0, e1, x):
    t = clamp((x - e0) / (e1 - e0) if e1 != e0 else 0.0)
    return t * t * (3 - 2 * t)


def mix(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))


def over(dst, src, alpha):
    """src (rgb) mit deckung alpha über dst (rgb) legen."""
    return tuple(int(round(src[i] * alpha + dst[i] * (1 - alpha))) for i in range(3))


def rrect_sdf(x, y, w, h, r):
    cx, cy = w / 2.0, h / 2.0
    qx = abs(x - cx) - (w / 2.0 - r)
    qy = abs(y - cy) - (h / 2.0 - r)
    ax, ay = max(qx, 0.0), max(qy, 0.0)
    return math.hypot(ax, ay) + min(max(qx, qy), 0.0) - r


def render(size, maskable=False):
    px = bytearray()
    corner = 0.0 if maskable else size * 0.22   # maskable: randlos (Plattform maskiert)
    cx = cy = size / 2.0
    aa = size / 256.0                            # weiche Kante ~ proportional
    # Ringe: Radien & Deckungen (nach außen schwächer -> "leiser")
    scale = size * (0.62 if maskable else 0.72)  # maskable: mehr Sicherheitsrand
    disc_r = scale * 0.13
    rings = [
        (scale * 0.27, scale * 0.055, 0.95),
        (scale * 0.40, scale * 0.050, 0.62),
        (scale * 0.52, scale * 0.045, 0.34),
    ]
    for y in range(size):
        px.append(0)  # PNG-Filterbyte pro Zeile
        gy = y / (size - 1)
        for x in range(size):
            # Hintergrund: vertikaler Verlauf + leichtes radiales Aufhellen
            base = mix(BG_TOP, BG_BOTTOM, gy)
            d_center = math.hypot(x - cx, y - cy) / (size * 0.7)
            base = mix(base, BG_TOP, clamp(0.10 * (1 - d_center)))
            col = base
            d = math.hypot(x - cx, y - cy)
            # Mittelscheibe
            cov = 1 - smoothstep(disc_r - aa, disc_r + aa, d)
            if cov > 0:
                col = over(col, ACCENT_SOFT, cov)
            # Ringe
            for (R, T, a) in rings:
                rc = (1 - smoothstep(T / 2 - aa, T / 2 + aa, abs(d - R))) * a
                if rc > 0:
                    col = over(col, ACCENT, rc)
            # Außenform (Alpha)
            if maskable:
                alpha = 255
            else:
                sdf = rrect_sdf(x + 0.5, y + 0.5, size, size, corner)
                alpha = int(round(255 * (1 - smoothstep(-aa, aa, sdf))))
            px.extend((int(round(col[0])) & 255, int(round(col[1])) & 255,
                       int(round(col[2])) & 255, alpha & 255))
    return bytes(px)


def write_png(path, size, raw):
    def chunk(typ, data):
        return (struct.pack(">I", len(data)) + typ + data +
                struct.pack(">I", zlib.crc32(typ + data) & 0xffffffff))
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)  # 8-bit RGBA
    idat = zlib.compress(raw, 9)
    with open(path, "wb") as f:
        f.write(sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b""))


def main():
    os.makedirs(OUT, exist_ok=True)
    jobs = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("icon-maskable-512.png", 512, True),
        ("apple-touch-icon.png", 180, True),
    ]
    for name, size, maskable in jobs:
        write_png(os.path.join(OUT, name), size, render(size, maskable))
        print("wrote", name)


if __name__ == "__main__":
    main()
