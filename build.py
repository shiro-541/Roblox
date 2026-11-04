import json, re, html, os
from urllib.parse import quote

OUT = os.path.dirname(os.path.abspath(__file__))
SEARCH = "https://www.roblox.com/discover/?keyword="
DIRECT = {  # ID yang sudah terkonfirmasi lewat pencarian web
    "Work at a Pizza Place": 192800,
    "Lumber Tycoon 2": 13822889,
    "Theme Park Tycoon 2": 69184822,
    "Flee the Facility": 893973440,
}

CATS = [
 dict(id="horror", fx="👻,🦇,💀,🕸️,🩸", file="horror.html", emoji="\U0001F47B", color="#ff5468", title="Horror & Survival",
      desc="Game bertema horor, bertahan hidup, monster, dan jumpscare.",
      games=["The Mimic","DOORS","Pressure","Apeirophobia","Specter","Dead Silence","The Intruder","99 Nights in the Forest","Forgotten Memories","Residence Massacre","Judy","Short Creepy Stories","Dandy's World","Murder Mystery 2","Evade"]),
 dict(id="tycoon", fx="🪙,💰,💵,📈,🏢", file="tycoon.html", emoji="\U0001F3E2", color="#4da3ff", title="Business & Tycoon",
      desc="Game membangun bisnis, mengelola perusahaan, dan menghasilkan uang.",
      games=["Restaurant Tycoon 2","Restaurant Tycoon 3","Retail Tycoon 2","Supermarket Tycoon","Shopping Mall Tycoon","Theme Park Tycoon 2","Lumber Tycoon 2","Hotel Tycoon","Cinema Tycoon","Car Dealership Tycoon","My Restaurant","Theme Park Tycoon","Work at a Pizza Place","My Cafe Tycoon","Mall Tycoon"]),
 dict(id="puzzle", fx="🧩,❓,🔍,🗝️,💡", file="puzzle.html", emoji="\U0001F9E9", color="#b97bff", title="Puzzle & Mystery",
      desc="Game teka-teki, investigasi, dan mencari petunjuk.",
      games=["Find the Markers","The Password Game","Escape Room","Color or Die","DOORS","Identity Fraud","The Maze","Break In","Break In 2","Murder Mystery 2","Flee the Facility","Interliminality","Specter","The Rake REMASTERED","Find the Chomiks"]),
 dict(id="restoran", fx="🍔,🍕,🍟,🥤,🍩", file="restoran.html", emoji="\U0001F354", color="#ffa63d", title="Restaurant, Shop & Store",
      desc="Game khusus mengelola toko, restoran, supermarket, dan bisnis makanan.",
      games=["Work at a Pizza Place","Restaurant Tycoon 2","Restaurant Tycoon 3","My Restaurant","Cook Burgers","Supermarket Tycoon","Retail Tycoon 2","Shopping Mall Tycoon","My Cafe Tycoon","Bakery Simulator","Sushi Shop Simulator","Store Empire","Grocery Store Simulator","Food Truck Tycoon","Theme Park Tycoon 2"]),
 dict(id="mount", fx="⛰️,🌲,🥾,🚩,❄️", file="mount.html", emoji="⛰️", color="#3ddc97", title="Map Mount",
      desc="Map pendakian gunung di Roblox, dari Tambusisi sampai Rinjani.",
      games=["Mount Tambusisi","Mount Aru","Mount Tenang","Mount Lawu","Mount Daun","Mount Talamau","Mount Fecha","Mount Semut","Mount Rinjani","Mount Gede","Mount Semeru","Mount Merbabu","Mount Slamet","Mount Merapi","Mount Sindoro","Mount Sumbing","Mount Pamijahan","Mount Kambuno","Mount Batur","Mount Akar","Mount Leuweung","Mount Talaraya","Mount Maharani"]),
]

def slug(n): return re.sub(r"[^a-z0-9]+", "", n.lower())
def url(n):
    return (f"https://www.roblox.com/games/{DIRECT[n]}", True) if n in DIRECT else (SEARCH + quote(n), False)
e = html.escape

def head(title, color, desc, tid="home", fx="🎮,⭐,🧩,👻,🍔,⛰️"):
    return f'''<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d1020">
<meta name="description" content="{e(desc)}">
<title>{e(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Bungee&display=swap" rel="stylesheet">
<script>try{{sessionStorage.getItem("rbx-pt")&&document.documentElement.classList.add("pt-in")}}catch(e){{}}</script>
<link rel="stylesheet" href="style.css">
</head>
<body class="t-{tid}" data-fx="{fx}" style="--ac:{color}">
<div class="fx" id="fx" aria-hidden="true"></div>
'''

def tabs(cur):
    t = '<nav class="tabs" aria-label="Kategori">'
    t += f'<a href="index.html" style="--c:#6ea8ff"{" aria-current=page" if cur=="home" else ""}>\U0001F3E0 Beranda</a>'
    for c in CATS:
        t += f'<a href="{c["file"]}" style="--c:{c["color"]}"{" aria-current=page" if cur==c["id"] else ""}>{c["emoji"]} {e(c["title"])}</a>'
    return t + '</nav>\n'

FOOT = '''<footer>Tombol <b>Main di Roblox</b> membuka halaman game langsung. Tombol <b>Cari di Roblox</b> membuka halaman Discover Roblox dengan judulnya sebagai kata kunci, jadi pilih game yang paling cocok. Centangan tersimpan di perangkatmu.</footer>
</div>
<button class="top" id="top" type="button" aria-label="Ke atas">↑</button>
<div class="toast" id="toast" role="status"></div>
<script src="app.js"></script>
</body>
</html>
'''

# halaman kategori
for c in CATS:
    n = len(c["games"])
    p = head(f'{c["title"]} – Map Roblox', c["color"], c["desc"], c["id"], c["fx"]) + tabs(c["id"])
    p += f'<div class="wrap">\n<h1><span class="em">{c["emoji"]}</span> {e(c["title"])}</h1>\n<p class="lead">{e(c["desc"])}</p>\n'
    p += '<section class="hud" aria-label="Progres"><b>Progres</b><div class="bar"><i id="bar"></i></div><span id="cnt"></span></section>\n'
    p += '<div class="tools"><input type="search" id="q" placeholder="Cari game..." aria-label="Cari game"><select id="so" aria-label="Urutkan"><option value="n">Urutan</option><option value="a">A–Z</option></select><button class="btn" id="rnd" type="button">\U0001F3B2 Acak</button></div>\n'
    p += '<div class="flt"><label><input type="radio" name="s" value="all" checked> Semua</label><label><input type="radio" name="s" value="todo"> Belum</label><label><input type="radio" name="s" value="done"> Sudah</label></div>\n'
    p += '<ol class="grid">\n'
    for i, g in enumerate(c["games"]):
        u, d = url(g)
        p += (f'<li class="card" data-slug="{slug(g)}" data-name="{e(g.lower())}" data-title="{e(g)}" style="--i:{min(i,20)}">'
              f'<span class="no">{i+1}</span><h3>{e(g)}</h3><div class="act">'
              f'<label class="chk"><input type="checkbox"> Sudah main</label>'
              f'<a class="go" href="{e(u)}" target="_blank" rel="noopener">{"Main di Roblox" if d else "Cari di Roblox"} ↗</a></div></li>\n')
    p += '</ol>\n<div class="empty" id="empty" hidden>Tidak ada game yang cocok. Coba kata kunci atau filter lain.</div>\n' + FOOT
    open(os.path.join(OUT, c["file"]), "w", encoding="utf-8").write(p)

# beranda
allg = []
for c in CATS:
    for g in c["games"]:
        u, d = url(g)
        allg.append(dict(n=g, s=slug(g), c=c["id"], t=c["title"], e=c["emoji"], k=c["color"], p=c["file"], u=u, d=d))
total = sum(len(c["games"]) for c in CATS)
p = head("Daftar Map Roblox", "#6ea8ff", "Daftar map Roblox per kategori lengkap dengan link ke game.") + tabs("home")
p += f'<div class="wrap">\n<h1><span class="em">\U0001F3AE</span> Daftar Map Roblox</h1>\n<p class="lead">{len(CATS)} kategori, {total} entri game. Pilih kategori, centang yang sudah dimainkan, lalu buka gamenya di Roblox.</p>\n'
p += f'<div class="stats"><div><b data-n="{len(CATS)}">0</b><span>Kategori</span></div><div><b data-n="{total}">0</b><span>Game</span></div><div><b id="dn" data-n="0">0</b><span>Sudah dimainkan</span></div></div>\n'
p += '<div class="tools"><input type="search" id="gq" placeholder="Cari game di semua kategori..." aria-label="Cari game"></div>\n<div class="res" id="res"></div>\n<div class="hub">\n'
for i, c in enumerate(CATS):
    sl = ",".join(slug(g) for g in c["games"])
    p += (f'<a class="cat" href="{c["file"]}" style="--c:{c["color"]};--i:{i}" data-slugs="{sl}"><div class="big">{c["emoji"]}</div>'
          f'<h2>{e(c["title"])}</h2><p>{e(c["desc"])}</p><small class="prog">{len(c["games"])} game</small><div class="bar"><i></i></div></a>\n')
p += '</div>\n<script type="application/json" id="all">' + json.dumps(allg, ensure_ascii=False).replace("</", "<\\/") + '</script>\n' + FOOT
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(p)
print("dibuat:", [c["file"] for c in CATS] + ["index.html"], "total", total)
