# Időjárás-előrejelzés

Egy kis React-alkalmazás, amivel bármelyik város aktuális időjárását és a
következő hét napra szóló előrejelzését meg lehet nézni. Az adatok az
[Open-Meteo](https://open-meteo.com/) ingyenes API-jaiból érkeznek, amikhez nem
kell se regisztráció, se API-kulcs. Az előrejelzés alá raktam egy grafikont is,
ami a következő napok csúcshőmérsékletét mutatja.

> Webfejlesztés próbafeladat – Csia Krisztián

## Mit tud?

- **Városkeresés** – A város nevére kattintva felugrik egy kereső. Ha több
  találat is van (mondjuk három különböző Szeged a világban), akkor listából
  lehet kiválasztani a megfelelőt. Első indításkor, amikor még semmi sincs
  beállítva, a kereső magától megnyílik.
- **Megjegyzi, hol jártál** – A kiválasztott várost a böngésző elmenti, így
  legközelebb már egyből az jön be, nem kell újra megkeresni.
- **Aktuális időjárás** – A hőmérséklet és az állapot mellett ott a hőérzet,
  páratartalom, szél (iránnyal együtt), csapadék, UV-index, légnyomás, felhőzet,
  valamint a napkelte és napnyugta időpontja.
- **7 napos előrejelzés** – Minden naphoz a nap neve, egy állapotikon, a csapadék
  esélye, illetve a minimum- és maximumhőmérséklet.
- **Hőmérséklet-grafikon** – A heti csúcshőmérsékletek is jól követhető vonaldiagramon.
- **Nappali / éjszakai mód** – A háttér magától igazodik ahhoz, hogy a kiválasztott
  helyen épp nappal van-e vagy éjszaka, de egy kattintással kézzel is át lehet váltani.
- **Reszponzív** – Telefonon egymás alatt, nagyobb képernyőn két oszlopban
  rendeződik el a tartalom.

## Mivel készült?

- React 19 + Vite
- Redux Toolkit + React-Redux (állapotkezelés)
- Recharts (grafikon)
- react-icons (időjárás-ikonok)
- SCSS (stílusok globális változókkal és mixinekkel)
- Vitest + React Testing Library (tesztelés)

## Indítás

Ehhez [Node.js](https://nodejs.org/) 18-as vagy újabb verzió és npm kell.

```bash
# 1. Függőségek telepítése
npm install

# 2. Fejlesztői szerver indítása
npm run dev
```

Ezután már csak meg kell nyitni a böngészőben a terminálban kiírt címet
(általában <http://localhost:5173>).

### Egyéb hasznos parancsok

```bash
npm run build         # éles build a dist/ mappába
npm run preview       # az éles build helyi előnézete
npm run lint          # ESLint-ellenőrzés
npm run format        # kód formázása Prettierrel
npm test              # tesztek egyszeri lefuttatása
npm run test:watch    # tesztek figyelő módban
npm run test:coverage # lefedettségi riport
```

## Honnan jönnek az adatok?

Két Open-Meteo végpontot használ az app, egyikhez sem kell API-kulcs:

- **Geocoding** – a városkereséshez:
  `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast** – az aktuális időjáráshoz és az előrejelzéshez:
  `https://api.open-meteo.com/v1/forecast`

A WMO időjáráskódokat magyar szövegre és ikonra a
[src/utils/weatherCodes.js](src/utils/weatherCodes.js) fordítja le.

## Tesztelés

A teszteket [Vitest](https://vitest.dev/) futtatja, a komponensekhez pedig a
[React Testing Library](https://testing-library.com/) társul. A teszteket a tesztelt fájl mellé
vannak rakva (`*.test.js` / `*.test.jsx`).

```bash
npm test              # az összes teszt egyszeri lefuttatása
npm run test:watch    # figyelő mód, fejlesztés közben kényelmes
npm run test:coverage # lefedettségi riport
```

Amit lefedtem:

- **utils** – a WMO-kódok fordítása, a dátumformázás és a localStorage-kezelés
- **services** – az Open-Meteo API-hívások, mockolt `fetch`-csel
- **store** – a Redux slice és az aszinkron lekérés különböző állapotai
- **components** – az atom komponensek megjelenése és kattintásra adott válasza

## Hogy épül fel a projekt?

A komponensek atomic design szerint vannak rendezve (atoms → molecules →
organisms → templates), a stílusok pedig a komponensek mellett, co-located
módon élnek.

```
src/
├── store/         # Redux store és slice
├── services/      # Open-Meteo API-hívások
├── utils/         # WMO-kódok, dátumformázás, localStorage
├── components/    # atoms / molecules / organisms / templates
├── styles/        # globális SCSS változók, mixinek, alapstílus
├── test/          # Vitest setup (jest-dom, cleanup)
├── App.jsx
└── main.jsx
```
