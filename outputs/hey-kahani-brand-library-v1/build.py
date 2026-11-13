"""Build Hey Kahani's selected vector library and non-browser preview sheets."""
from pathlib import Path
import json
import math
import os
import subprocess
from html import escape

ROOT = Path(__file__).resolve().parent
P = {
    'red': '#D3000A', 'sand': '#FFF1D6', 'sky': '#63C3FE',
    'yellow': '#FECB74', 'ink': '#05334A', 'green': '#2B9863',
    'orange': '#FF5D27', 'lavender': '#D6C9E4', 'husk': '#E6CEAD',
    'pink': '#EF2289',
}
ASSETS = []

def path(d, colour, **attrs):
    attr = ' '.join(f'{k.replace("_", "-")}="{v}"' for k,v in attrs.items())
    return f'<path d="{d}" fill="{P.get(colour, colour)}" {attr}/>'

def line(d, colour='ink', width=8):
    return path(d, 'none', stroke=P.get(colour, colour), stroke_width=width,
                stroke_linecap='round', stroke_linejoin='round')

def asset(category, slug, title, body, size=(400,400), use='', safe=None, minimum=96):
    entry = {'id': f'hk-{category}-{slug}', 'category': category, 'name': title,
             'file': f'svg/{category}/{slug}.svg', 'png': f'png/{category}/{slug}.png',
             'viewBox': [0,0,*size], 'suggestedUse': use,
             'recommendedMinimumWidthPx': minimum}
    if safe:
        entry['contentSafeRect'] = dict(zip(['x','y','width','height'], safe))
    ASSETS.append((entry, body))

# Twelve individually drawn single-piece container silhouettes.
containers = [
 ('soft-postcard', 'Soft postcard', 'sand', (640,400), [72,70,490,260],
  'M56 27 C153 12 225 42 329 30 C433 19 526 12 588 40 C623 56 624 105 617 167 L607 315 C604 356 581 377 534 374 C365 367 221 389 66 370 C25 365 14 344 19 296 L25 99 C26 55 29 35 56 27 Z'),
 ('off-centre-arch', 'Off-centre arch', 'sky', (400,520), [70,170,260,280],
  'M31 473 L27 209 C24 108 71 43 157 22 C241 2 335 67 361 142 C379 196 373 335 375 465 C375 490 355 498 321 497 L73 501 C45 500 32 495 31 473 Z'),
 ('lopsided-pebble', 'Lopsided pebble', 'yellow', (480,480), [85,110,310,270],
  'M65 102 C104 42 202 26 293 38 C382 50 440 111 452 203 C467 294 409 398 328 432 C252 464 143 439 83 401 C26 364 13 285 26 213 C33 171 42 137 65 102 Z'),
 ('rolling-banner', 'Rolling banner', 'sand', (960,280), [100,85,760,110],
  'M48 57 C135 12 201 30 285 54 C364 76 422 57 500 34 C581 8 651 21 725 47 C792 70 866 26 916 54 C948 73 942 121 934 162 C927 207 932 230 897 239 C809 260 747 220 672 228 C587 237 523 263 440 246 C347 226 289 237 214 250 C143 264 65 246 36 218 C13 193 19 85 48 57 Z'),
 ('scooped-shoulder', 'Scooped shoulder', 'lavender', (640,400), [80,120,470,225],
  'M55 25 L463 24 C486 25 478 52 498 78 C517 103 555 111 596 105 C619 101 625 120 621 151 L611 325 C608 363 581 377 539 375 L67 379 C27 379 17 351 20 313 L25 80 C28 47 35 29 55 25 Z'),
 ('plump-panel', 'Plump panel', 'husk', (640,400), [85,80,470,250],
  'M87 27 C153 13 211 35 290 28 C371 21 463 7 536 34 C594 55 627 105 623 170 C621 225 606 244 613 295 C620 347 580 376 522 374 L109 380 C51 380 21 355 22 305 C23 252 8 225 19 163 C29 99 28 40 87 27 Z'),
 ('leaning-note', 'Leaning note', 'sky', (640,400), [90,95,450,220],
  'M72 55 C180 39 393 13 545 21 C579 23 590 45 594 83 L620 291 C624 328 609 345 567 350 L91 380 C45 383 26 362 25 326 L20 121 C19 79 31 62 72 55 Z'),
 ('double-hill', 'Double hill', 'yellow', (640,400), [80,120,480,220],
  'M25 347 L27 127 C28 89 62 41 116 28 C182 11 236 44 269 82 C293 104 318 91 355 60 C411 13 483 15 542 50 C601 85 621 131 618 189 L612 342 C611 368 593 378 558 376 L71 378 C39 378 25 368 25 347 Z'),
 ('quiet-tide', 'Quiet tide', 'lavender', (640,400), [80,100,480,220],
  'M57 44 C145 22 207 60 298 50 C380 41 465 11 552 30 C594 39 617 61 615 106 L607 303 C606 344 583 369 545 365 C455 352 415 329 332 346 C240 366 169 387 80 371 C35 363 21 344 22 301 L27 109 C27 71 34 50 57 44 Z'),
 ('round-window', 'Round window', 'sand', (400,520), [65,170,270,275],
  'M39 479 L26 229 C20 132 53 56 145 26 C223 0 326 40 354 118 C380 190 369 343 371 467 C371 491 355 501 329 499 L85 500 C58 500 41 497 39 479 Z'),
 ('story-pill', 'Story pill', 'red', (960,280), [120,75,720,130],
  'M115 28 C283 8 398 33 544 23 C666 15 774 10 851 42 C919 70 949 113 933 171 C919 226 870 249 804 251 C617 258 443 240 252 257 C153 265 55 248 30 200 C7 157 30 63 115 28 Z'),
 ('gentle-trapezoid', 'Gentle trapezoid', 'husk', (640,400), [100,90,420,230],
  'M97 43 C213 30 399 16 518 34 C554 40 564 62 576 106 L618 301 C628 346 599 370 552 371 L67 379 C23 379 14 352 25 314 L59 103 C65 68 67 49 97 43 Z'),
]
for slug,title,c,size,safe,d in containers:
    asset('containers', slug, title, path(d,c), size, 'Content panel or image mask; use the documented content-safe rectangle.', safe, 240)

# Twelve freeform accents. No scaled copies or colour-only duplicates.
asset('decorative','wandering-loop','Wandering loop',
      line('M52 273 C80 339 162 293 197 233 C233 174 242 70 194 60 C139 48 112 120 139 165 C185 244 274 191 321 119 C357 65 362 76 370 91','red',26),
      use='Wide heading accent or sparse background gesture.')
asset('decorative','spring-zigzag','Spring zigzag',
      path('M40 125 C28 105 50 86 74 97 L135 142 L127 89 C123 64 146 53 164 75 L215 153 L225 99 C229 75 255 76 267 99 L297 173 L316 137 C329 112 358 125 347 150 L309 242 C299 265 272 262 261 239 L240 185 L224 239 C217 262 193 270 178 246 L151 201 L148 245 C147 268 124 281 105 263 L41 201 C21 181 40 154 61 168 L93 189 Z','green'),
      use='Small energetic accent, kept away from text.')
burst_d='M200 40 Q213 24 220 52 L231 119 L293 65 Q313 48 307 77 L286 144 L360 139 Q390 140 366 162 L308 201 L363 241 Q388 263 358 263 L284 254 L302 330 Q307 357 285 338 L226 287 L208 363 Q202 390 190 362 L172 289 L108 339 Q86 355 96 327 L119 255 L44 259 Q15 258 40 237 L99 198 L39 156 Q15 137 44 138 L119 145 L94 73 Q84 46 106 64 L170 119 L183 52 Q186 28 200 40 Z'
asset('decorative','open-burst','Open burst',line(burst_d,'ink',13),use='Outline accent; leave its centre empty.')
asset('decorative','sky-puddle','Sky puddle',path('M59 139 C79 70 161 45 228 57 C303 71 342 121 331 188 C320 242 349 290 299 320 C248 350 187 316 135 333 C73 354 35 316 43 258 C50 214 40 183 59 139 Z','sky'),use='Background colour patch or image companion.')
asset('decorative','crooked-ring','Crooked ring',path('M59 181 C58 102 116 47 192 39 C264 30 335 84 352 151 C373 224 350 305 290 343 C231 380 142 354 94 303 C69 276 59 228 59 181 Z M137 173 C133 206 151 260 183 275 C213 289 265 264 278 229 C295 188 267 131 232 117 C197 103 146 137 137 173 Z','yellow',fill_rule='evenodd'),use='Open framing accent, never a content panel.')
asset('decorative','orange-bend','Orange bend',path('M92 68 C118 43 143 64 151 103 C161 160 182 205 241 218 C291 229 307 266 281 294 C249 328 188 314 137 283 C77 246 47 178 57 122 C61 100 76 79 92 68 Z','orange'),use='Small curved punctuation mark.')
asset('decorative','pebble-pair','Pebble pair',path('M66 148 C75 91 149 67 199 101 C244 130 265 203 230 261 C196 316 112 335 72 294 C40 261 55 203 66 148 Z','lavender')+path('M198 79 C234 49 291 67 316 108 C344 154 339 205 300 220 C263 234 202 210 184 171 C169 140 173 101 198 79 Z','sky'),use='Paired forms supporting shared or grouped content.')
asset('decorative','double-dip','Double dip',path('M39 259 C49 208 75 151 115 141 C147 133 169 163 184 194 C206 154 229 139 257 153 C287 167 319 223 334 257 C344 283 315 299 297 279 L252 218 L212 276 C198 297 174 299 160 275 L122 213 L89 278 C73 309 32 296 39 259 Z','red'),use='Compact accent beside a heading.')
asset('decorative','long-wave','Long wave',path('M19 209 C70 111 117 120 167 189 C202 239 228 250 267 180 C308 105 356 119 389 169 L389 242 C354 184 333 184 299 244 C249 333 187 310 140 245 C110 203 89 178 19 281 Z','yellow'),use='Edge-cropped section decoration; no content sits on the thin ribbon.')
asset('decorative','soft-corner','Soft corner',path('M51 90 C84 57 154 43 199 72 C232 93 242 135 284 130 C323 126 345 154 332 190 C317 230 284 251 265 289 C246 327 216 339 187 312 C160 285 162 246 123 237 C79 226 26 239 22 197 C19 161 24 116 51 90 Z','sky'),use='Corner crop or soft framing patch.')
asset('decorative','tilted-arch','Tilted arch',path('M48 291 C47 196 62 87 152 60 C250 30 309 117 339 245 C346 277 316 294 298 265 C263 201 259 123 203 125 C139 126 138 218 129 288 C125 321 49 327 48 291 Z','green'),use='Playful arch accent; it is not a content container.')
asset('decorative','pink-flick','Pink flick',path('M123 195 C153 147 217 114 250 143 C279 172 244 223 197 247 C151 271 96 245 123 195 Z','pink'),use='Small optional highlight, sparse within a composition.')

# Twelve illustrative vectors: simple flat fills and selective dark detail.
asset('illustrations','open-storybook','Open storybook',
 path('M58 146 C99 118 153 121 199 144 C245 120 301 117 342 141 L362 310 C298 291 247 306 202 331 C153 306 103 300 45 313 Z','red')+
 path('M70 116 C112 96 163 113 199 143 L199 292 C161 270 119 262 65 275 Z','sand')+
 path('M199 143 C238 111 289 99 329 110 L344 272 C284 260 242 277 199 292 Z','sand')+
 line('M199 146 Q195 218 199 292',width=7)+line('M91 160 Q136 151 169 178 M87 200 Q133 191 169 218 M232 176 Q270 149 311 153 M233 218 Q274 191 316 195',width=7)+
 line('M294 79 Q315 88 320 107 M309 53 Q344 67 350 101 M325 28 Q370 44 379 92','sky',10),use='Storytelling, reading or listening introduction.')
asset('illustrations','flying-kite','Flying kite',
 path('M64 137 L165 35 Q171 28 177 39 L257 137 L155 255 Z','red')+
 path('M173 39 L257 137 L163 143 Z','sky')+path('M64 137 L163 143 L155 255 Z','yellow')+
 path('M155 255 Q152 288 125 312 L145 319 Q164 303 171 272 Z','red')+
 path('M165 257 Q175 287 177 311 L196 300 Q185 275 176 253 Z','sky')+
 line('M167 262 C174 321 263 335 278 287 C295 237 239 237 247 279 C257 329 322 278 366 331',width=7),use='Imagination, play or discovery.')
asset('illustrations','mango-sprig','Mango sprig',
 line('M191 343 C202 269 220 194 194 88','green',15)+
 path('M197 171 C141 147 107 104 129 48 C176 44 228 87 197 171 Z','green')+
 path('M209 230 C216 160 281 116 332 122 C331 184 282 229 209 230 Z','green')+
 path('M196 291 C129 304 73 275 61 223 C114 204 173 229 196 291 Z','green')+
 line('M193 147 Q174 107 146 72 M226 212 Q264 172 305 143 M176 276 Q129 247 84 240',width=7),use='Everyday nature or growth; South Asian botanical cue.')
flower='M203 63 C230 35 265 59 257 88 C287 69 318 98 300 126 C337 121 352 160 322 178 C353 202 331 238 301 232 C307 268 269 280 247 254 C231 289 193 282 190 254 C162 277 126 252 139 224 C100 231 84 196 112 175 C80 145 109 116 140 127 C126 92 165 70 184 96 C177 76 184 65 203 63 Z'
asset('illustrations','marigold','Marigold',
 line('M207 240 Q211 293 191 361','green',15)+
 path('M203 318 C171 280 136 279 117 285 C121 322 152 339 203 338 Z','green')+
 path('M204 307 C225 273 268 271 293 283 C278 319 251 335 199 340 Z','green')+path(flower,'orange')+
 line('M183 140 Q201 155 207 139 M231 171 Q245 181 252 164 M163 186 Q174 199 184 188','yellow',9),use='Celebration or everyday beauty, without a festival claim.')
asset('illustrations','listening-headphones','Listening headphones',
 path('M72 226 C69 117 114 55 192 54 C275 50 324 113 324 228 L292 234 C297 143 262 92 196 91 C130 89 100 139 104 233 Z','red')+
 path('M76 192 C95 180 117 190 119 211 L122 294 C122 316 97 329 78 315 C59 300 53 212 76 192 Z','sky')+
 path('M280 207 C284 187 310 179 327 195 C347 214 338 298 320 314 C299 332 276 315 277 294 Z','sky')+
 line('M116 218 L119 288 M280 218 L279 287',width=7)+
 line('M170 181 Q187 153 200 182 Q214 211 232 180','yellow',10),use='Listening-related editorial content; not a hardware product depiction.')
asset('illustrations','paper-boat','Paper boat',
 path('M56 232 L347 219 Q323 271 289 298 L115 305 Q79 278 56 232 Z','red')+
 path('M73 228 L187 141 L195 229 Z','yellow')+path('M194 77 L194 228 L307 220 Z','sand')+
 path('M194 77 L211 228 L273 220 Z','sky')+
 line('M48 333 Q94 317 138 333 T227 333 T349 328','sky',11)+
 line('M93 365 Q129 351 167 364 M246 363 Q283 349 316 362','ink',7),use='Adventure, imagination or exploration.')
asset('illustrations','spinning-top','Spinning top',
 path('M113 163 Q151 112 198 115 Q248 117 292 161 L250 249 L199 324 L151 250 Z','yellow')+
 path('M111 163 Q190 195 292 161 L272 207 Q199 235 133 205 Z','red')+
 path('M149 246 Q199 267 252 245 L232 275 Q200 288 168 277 Z','red')+
 path('M183 122 L183 73 Q199 59 215 74 L212 122 Z','sky')+
 line('M61 213 Q23 249 72 279 M324 198 Q364 239 328 268',width=7)+
 line('M167 347 Q199 359 229 347','sky',8),use='Independent play or curiosity.')
asset('illustrations','little-home','Little home',
 path('M88 177 L280 164 L302 320 L88 331 Z','sky')+
 path('M58 180 L180 62 Q188 55 198 64 L329 169 L300 191 L190 111 L87 201 Z','red')+
 path('M165 330 L163 234 Q194 211 221 235 L226 325 Z','yellow')+
 path('M107 211 L143 209 L145 248 L110 250 Z','sand')+path('M244 205 L278 201 L282 241 L246 246 Z','sand')+
 line('M320 333 Q329 299 325 271','green',8)+path('M324 302 Q294 292 296 266 Q326 264 324 302 Z','green')+path('M327 293 Q331 259 359 254 Q366 286 327 293 Z','green'),use='Home, belonging or family routines.')
asset('illustrations','moon-and-stars','Moon and stars',
 path('M245 61 C170 47 92 105 79 191 C63 291 136 349 215 330 C275 315 312 261 311 219 C273 251 231 253 197 219 C161 182 170 117 218 87 Z','yellow')+
 path('M299 63 L307 86 L332 94 L310 105 L303 130 L291 108 L268 101 L290 89 Z','sky')+
 path('M326 161 L333 178 L351 184 L335 194 L331 213 L321 197 L304 190 L320 180 Z','red')+
 path('M74 70 L81 86 L100 92 L83 100 L77 117 L69 101 L52 95 L68 87 Z','sky'),use='Evening or bedtime-related editorial content.')
asset('illustrations','rain-cloud','Rain cloud',
 path('M75 214 C35 206 38 157 74 145 C62 105 104 75 135 94 C163 47 229 61 243 104 C290 81 332 123 321 158 C362 173 346 225 310 227 L87 229 Q67 229 75 214 Z','sky')+
 path('M104 267 C93 283 82 300 91 312 C105 325 124 313 122 300 Q120 286 114 271 Q109 259 104 267 Z','sky')+
 path('M192 252 C176 277 171 292 181 304 C197 320 215 300 211 288 L201 257 Q196 244 192 252 Z','sky')+
 path('M274 276 C258 300 258 315 271 325 C286 334 299 320 296 305 L285 279 Q279 266 274 276 Z','sky'),use='Weather, everyday wonder or a gentle pause.')
asset('illustrations','banyan-leaf','Banyan leaf',
 path('M203 352 C184 317 148 301 108 263 C60 216 52 153 84 107 C110 70 164 66 197 99 C228 54 286 57 316 96 C354 146 329 211 290 253 C255 289 223 304 203 352 Z','green')+
 line('M203 337 Q205 220 197 115 M200 257 Q142 243 111 200 M202 209 Q155 188 122 143 M203 271 Q261 249 289 207 M201 217 Q250 183 283 138',width=7)+line('M203 337 Q216 357 211 377','green',9),use='Nature-led supporting illustration; distinct from the three-leaf sprig.')
sun_body=path('M102 192 C104 134 149 104 204 108 C261 111 292 153 286 209 C282 261 239 292 185 285 C135 279 99 241 102 192 Z','yellow')
for angle in [-95,-51,-9,36,84,129,175,220]:
    a=math.radians(angle); x=197+143*math.cos(a); y=197+143*math.sin(a)
    x2=197+173*math.cos(a); y2=197+173*math.sin(a)
    sun_body+=line(f'M{x:.2f} {y:.2f} L{x2:.2f} {y2:.2f}','yellow',18)
sun_body+=line('M150 194 Q163 215 178 195 M214 193 Q229 213 242 190',width=7)
asset('illustrations','gentle-sun','Gentle sun',sun_body,use='Optional expressive motif; the library\'s only face-like detail.')

def write_assets():
    for entry,body in ASSETS:
        w,h=entry['viewBox'][2:]
        f=ROOT/entry['file']; f.parent.mkdir(parents=True,exist_ok=True)
        title_id=entry['id']+'-title'
        svg=(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
             f'viewBox="0 0 {w} {h}" role="img" aria-labelledby="{title_id}">'
             f'<title id="{title_id}">{escape(entry["name"])}</title>'
             f'<g>{body}</g></svg>\n')
        f.write_text(svg)
    (ROOT/'manifest.json').write_text(json.dumps({
        'version':'1.0','date':'2026-11-13','colourSpace':'sRGB',
        'styleApproval':'User selected abstract H and illustration A references on November 13, 2026.',
        'authoring':'Original hand-authored SVG paths informed by the selected references; no raster tracing or embedded images.',
        'palette':P,'assets':[x[0] for x in ASSETS]},indent=2)+'\n')

def preview(category, title, subtitle):
    items=[a for a in ASSETS if a[0]['category']==category]
    width,height=1440,1640
    out=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
         '<rect width="1440" height="1640" fill="#FFFFFF"/>',
         f'<text x="44" y="54" font-family="Arial" font-size="28" fill="{P["ink"]}">{escape(title)}</text>',
         f'<text x="44" y="87" font-family="Arial" font-size="16" fill="{P["ink"]}">{escape(subtitle)}</text>']
    for i,(entry,body) in enumerate(items):
        x=40+(i%3)*466; y=116+(i//3)*378
        w,h=entry['viewBox'][2:]
        scale=min(414/w,292/h)
        dx=x+(426-w*scale)/2; dy=y+(300-h*scale)/2
        out.append(f'<g transform="translate({dx:.3f} {dy:.3f}) scale({scale:.5f})">{body}</g>')
        out.append(f'<text x="{x+8}" y="{y+333}" font-family="Arial" font-size="17" fill="{P["ink"]}">{i+1:02d} / {escape(entry["name"])}</text>')
    out.append('</svg>')
    p=ROOT/'preview'/f'{category}.svg'; p.parent.mkdir(exist_ok=True)
    p.write_text('\n'.join(out)+'\n')

def render():
    subprocess.run(['node',str(ROOT/'render.cjs')],check=True)
    # Raster contact sheets use the actual exported assets. A local font file
    # avoids renderer-dependent font-cache issues in repeated SVG text.
    from PIL import Image, ImageDraw, ImageFont
    font_path=os.environ.get('HK_PREVIEW_FONT','/System/Library/Fonts/Supplemental/Arial.ttf')
    fonts={n:ImageFont.truetype(font_path,n) for n in [16,17,28]}
    headings={
        'containers':('Hey Kahani / filled containers','12 distinct silhouettes / blank centres for text or images / exact brand colours'),
        'decorative':('Hey Kahani / freeform shapes','12 distinct accents / loops, blobs, bursts and ribbons / transparent individual files'),
        'illustrations':('Hey Kahani / illustrative vectors','12 different subjects / flat colour and selective hand-drawn detail')}
    for category,(title,subtitle) in headings.items():
        canvas=Image.new('RGBA',(1440,1640),'white')
        draw=ImageDraw.Draw(canvas)
        draw.text((44,25),title,font=fonts[28],fill=P['ink'])
        draw.text((44,69),subtitle,font=fonts[16],fill=P['ink'])
        items=[a for a in ASSETS if a[0]['category']==category]
        for i,(entry,_) in enumerate(items):
            x=40+(i%3)*466; y=116+(i//3)*378
            im=Image.open(ROOT/entry['png']).convert('RGBA')
            im.thumbnail((414,292),Image.Resampling.LANCZOS)
            dx=x+(426-im.width)//2; dy=y+(300-im.height)//2
            canvas.alpha_composite(im,(dx,dy))
            draw.text((x+8,y+315),f'{i+1:02d} / {entry["name"]}',font=fonts[17],fill=P['ink'])
        canvas.convert('RGB').save(ROOT/'preview'/f'{category}.png')

if __name__=='__main__':
    write_assets()
    preview('containers','Hey Kahani / filled containers','12 distinct silhouettes / blank centres for text or images / exact brand colours')
    preview('decorative','Hey Kahani / freeform shapes','12 distinct accents / loops, blobs, bursts and ribbons / transparent individual files')
    preview('illustrations','Hey Kahani / illustrative vectors','12 different subjects / flat colour and selective hand-drawn detail')
    render()
    print(f'Built {len(ASSETS)} SVG assets, transparent PNG exports and 3 preview sheets in {ROOT}')
