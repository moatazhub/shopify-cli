export function mapCities(city){
    return cityMap[city];
}

const cityMap = {
    "SU" : "OCT",
    "SHR": "SHA",
    "ALX": "ALX",
    "ASN": "ASW",
    "AST": "ASU",
    "BH" : "BEH",
    "BNS" : "BNS",
    "C" : "CAI",
    "DK" : "DAK",
    "DT" : "QDX",
    "FYM": "FAY",
    "GH" : "GHA",
    "GZ" : "GIZ",
    "HU" : "HLW",
    "IS" : "QIV",
    "KFS" : "KAF",
    "LX" : "LXR",
    "MT" : "MUH",
    "MN" : "EMY",
    "MNF" : "MEN",
    "WAD" : "ELW",
    "SIN" : "NOS",
    "PTS" : "PSD",
    "KB" : "KAL",
    "KN" : "QNA",
    "BA" : "RES",
    "SHG" : "QHX",
    "JS" : "SOS",
    "SUZ" : "SUZ"
};

export function computeWieght(itmes){
    
    let qty = 0;
    let weight = 0;
    itmes.forEach(item => {
         weight += (item['grams'] * item['quantity']) ;
         qty += item['quantity'];
    });
    
    return [weight, qty];
}