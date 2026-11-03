"""Builds 1200x630 social-share (Open Graph) images from page photos.

Run from the project root after changing page photos:  python scripts/og-images.py
The page -> image mapping used by the site lives in src/data/seo.js (ogImageFor).
"""
from PIL import Image

I = 'public/images'
JOBS = {
    'treatments': ('treatments/10d-laser/10d-laser-2.webp', 0.5),
    'category-facial': ('treatments/hydra-facial/hydra-facial-1.webp', 0.45),
    'category-body': ('treatments/cryotherapy/cryotherapy-1.webp', 0.5),
    'category-hair': ('treatments/hair-growth/hair-growth-1.webp', 0.4),
    'treatment-thermage': ('treatments/thermage/thermage-2.webp', 0.4),
    'treatment-hifu-12d': ('treatments/hifu-12d/hifu-12d-1.webp', 0.45),
    'treatment-hifu-7d': ('treatments/hifu-7d/hifu-7d-1.webp', 0.45),
    'treatment-exilift-face': ('treatments/exilift-face/exilift-face-1.webp', 0.45),
    'treatment-co2-laser': ('treatments/co2-laser/co2-laser-3.webp', 0.4),
    'treatment-pico-laser': ('treatments/pico-laser/pico-laser-1.webp', 0.45),
    'treatment-carbon-laser': ('treatments/carbon-laser/carbon-laser-1.webp', 0.4),
    'treatment-organic-botox': ('treatments/organic-botox/organic-botox-3.webp', 0.45),
    'treatment-melasma-pigmentation': ('treatments/melasma/melasma-1.webp', 0.5),
    'treatment-anti-acne': ('treatments/anti-acne/anti-acne-1.webp', 0.45),
    'treatment-ems-express': ('treatments/ems-express/ems-express-1.webp', 0.5),
    'treatment-hydrafacial': ('treatments/hydra-facial/hydra-facial-1.webp', 0.45),
    'treatment-cryo-fat-freeze': ('treatments/cryotherapy/cryotherapy-1.webp', 0.5),
    'treatment-ems-sculpt-neo': ('treatments/ems-sculpt/ems-sculpt-3.webp', 0.5),
    'treatment-10d-laser': ('treatments/10d-laser/10d-laser-4.webp', 0.5),
    'treatment-hair-regrowth': ('treatments/hair-growth/hair-growth-1.webp', 0.4),
    'treatment-diode-hair-removal': ('treatments/diode/diode-3.webp', 0.45),
    'treatment-anti-dandruff': ('treatments/anti-dandruff/anti-dandruff-1.webp', 0.4),
    'studio': ('center/center-5.webp', 0.5),
    'results': ('treatments/hydra-facial/hydra-facial-5.webp', 0.45),
    'about': ('center/center-1.webp', 0.5),
    'reviews': ('testimonials/alexandra-constantino-poster.webp', 0.42),
    'contact': ('center/center-4.webp', 0.5),
}

for name, (src, focus_y) in JOBS.items():
    im = Image.open(f'{I}/{src}').convert('RGB')
    w, h = im.size
    ch = round(w * 630 / 1200)  # full width, 1.91:1 band
    top = min(max(round(h * focus_y - ch / 2), 0), h - ch)
    im.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS).save(f'{I}/og/{name}.jpg', quality=82, optimize=True, progressive=True)
    print('og/' + name + '.jpg')
