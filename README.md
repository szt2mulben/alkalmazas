
# Munkaidő Nyilvántartó
Ez egy egyszerű webalkalmazás, amely lehetővé teszi a munkaidő nyilvántartását, feladatok kezelését, és címkék szerinti szűrést. Az alkalmazás Vue.js-t használ a frontend fejlesztéséhez, és a helyi tárolót (localStorage) az adatok mentésére.

# Telepítés

### Előfeltételek
A projekt futtatásához a következőkre van szükség:
Node.js (ajánlott: legfrissebb LTS verzió)
npm vagy yarn (csomagkezelő)


# Telepítési lépések
1. Klónozd a repository-t:

```sh
git clone <repo_url>
```

2. Lépj be a projekt mappájába:
```sh
cd alkalmazas
```

3. Telepítsd a szükséges csomagokat:
Ha npm-t használsz:
```sh
npm install
```
4. Indítsd el a fejlesztői szervert:

```sh
npm run dev
```

# Funkcionalitás
Bejegyzések hozzáadása: Az alkalmazás lehetővé teszi munkaidő bejegyzések létrehozását, ahol megadhatod a dátumot, kezdési és befejezési időpontokat, valamint a feladat leírását.
Címkék: A felhasználók címkéket rendelhetnek a bejegyzésekhez, mint például 'projekt', 'ügyfél', 'marketing', 'fejlesztés'.
Adatok mentése: Az adatok a böngésző localStorage-jában kerülnek tárolásra, így az adatok megmaradnak a frissítések után is.
Bejegyzések szerkesztése és törlése: Lehetőség van meglévő bejegyzések szerkesztésére és törlésére is.
Reszponzív dizájn: Az alkalmazás reszponzív, így különböző képernyőméreteken is jól használható.

# Fejlesztési környezet
A projekt Vue.js alapú, és a következő eszközöket használja:

Vue.js: A frontend fejlesztéshez.
Vue Router: A navigáció kezeléséhez.
Bootstrap: Az alapvető stílusokhoz és reszponzív dizájnhoz.
LocalStorage: Az adatok helyi tárolására.

# További információk

Az alkalmazás alapvetően munkaidő-nyilvántartásra lett kifejlesztve, de könnyen testreszabható, ha más típusú adatokat szeretnél nyilvántartani.
Az alkalmazás a localStorage-t használja, így nem szükséges adatbázis a működéséhez.
A kódot egyszerűsítettem, hogy könnyen bővíthető és karbantartható legyen.

# Fejlesztők
A projektet készítette: Bence Mulati
