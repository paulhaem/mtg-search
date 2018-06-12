# mtg-search
> Stefan Elsenhuber, Philipp Hamerle, Alexander Hämmerle and Lukas Kern

## Install
```bash
npm install
npm start
```

## Feld Typen
```bash
card
- setName: 'setName_txt_en'
- releaseDate: 'releaseDate_dt'
- artist: 'artist_txt_en'
- cmc: 'cmc_i'
- colors: 'colors_txt_sort'
- multiverseId: 'multiverseId_i'
- name: 'name_txt_en'
- power: 'power_i' # bei */* => -1/-1
- rarity: 'rarity_txt_en' # could be an enum as well
- subtypes: 'subtypes_txt_sort'
- text: 'text_txt_sort' 
- toughness: 'toughness_i' # bei */* => -1/-1
- types: 'types_txt_sort'
```
