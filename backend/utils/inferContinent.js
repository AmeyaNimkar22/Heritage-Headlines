const continentKeywords = {
  Asia: [
    "india", "china", "japan", "south korea", "north korea", "vietnam", "thailand", 
    "indonesia", "malaysia", "philippines", "singapore", "pakistan", "bangladesh", 
    "sri lanka", "nepal", "bhutan", "myanmar", "cambodia", "laos", "mongolia", 
    "taiwan", "kazakhstan", "uzbekistan", "turkmenistan", "kyrgyzstan", "tajikistan", 
    "afghanistan", "iran", "iraq", "saudi arabia", "uae", "qatar", "kuwait", 
    "oman", "yemen", "jordan", "lebanon", "syria", "israel", "palestine", 
    "turkey", "armenia", "azerbaijan", "georgia", "maldives", "brunei", "timor-leste",
    "himalaya", "aravali", "asia", "everest", "mekong", "yangtze", "ganges"
  ],
  Europe: [
    "france", "germany", "italy", "united kingdom", "uk", "britain", "spain", 
    "portugal", "netherlands", "belgium", "switzerland", "austria", "greece", 
    "sweden", "norway", "denmark", "finland", "iceland", "ireland", "poland", 
    "czech republic", "slovakia", "hungary", "romania", "bulgaria", "albania", 
    "serbia", "croatia", "slovenia", "bosnia", "montenegro", "north macedonia", 
    "ukraine", "belarus", "moldova", "estonia", "latvia", "lithuania", "russia", 
    "luxembourg", "malta", "monaco", "andorra", "san marino", "vatican city", 
    "europe", "alps", "pyrenees", "caucasus", "danube", "rhine"
  ],
  Africa: [
    "nigeria", "ethiopia", "egypt", "south africa", "kenya", "tanzania", "algeria", 
    "morocco", "ghana", "angola", "ivory coast", "madagascar", "cameroon", "niger", 
    "burkina faso", "mali", "malawi", "zambia", "senegal", "chad", "somalia", 
    "zimbabwe", "guinea", "rwanda", "benin", "burundi", "tunisia", "south sudan", 
    "togo", "sierra leone", "libya", "congo", "drc", "liberia", "namibia", 
    "botswana", "gabon", "lesotho", "gambia", "mauritius", "seychelles", "djibouti", 
    "africa", "sahara", "nile", "kilimanjaro", "serengeti"
  ],
  "North America": [
    "usa", "united states", "canada", "mexico", "guatemala", "cuba", "haiti", 
    "dominican republic", "honduras", "nicaragua", "el salvador", "costa rica", 
    "panama", "jamaica", "trinidad and tobacco", "bahamas", "barbados", "saint lucia", 
    "grenada", "belize", "antigua", "greenland", "america", "north america", 
    "rockies", "mississippi", "appalachians"
  ],
  "South America": [
    "brazil", "argentina", "colombia", "peru", "chile", "venezuela", "ecuador", 
    "bolivia", "paraguay", "uruguay", "guyana", "suriname", "south america", 
    "amazon", "andes", "patagonia", "galapagos"
  ],
  Oceania: [
    "australia", "new zealand", "papua new guinea", "fiji", "solomon islands", 
    "micronesia", "vanuatu", "samoa", "kiribati", "tonga", "marshall islands", 
    "palau", "tuvalu", "nauru", "oceania", "polynesia", "melanesia", "outback"
  ],
  Antarctica: [
    "antarctica", "south pole", "ross ice shelf", "vinson massif"
  ]
};

export default function inferContinent(text, url = "") {
  const combined = `${text} ${url}`.toLowerCase();

  for (const [continent, keywords] of Object.entries(continentKeywords)) {
    if (keywords.some(k => combined.includes(k))) {
      return continent;
    }
  }

  return "Other";
}
