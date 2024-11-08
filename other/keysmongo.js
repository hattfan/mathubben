var objekt = [menigo, dabas, msstat]
var menigo = [
    "_id",
"Grossist",
"Kommun",
"Förvaltningsbolag",
"Moderbolagnr",
"Moderbolagnamn",
"Kundnr",
"Kundnamn",
"Artikelnr",
"Benämning",
"Varumärke",
"Antalifrp",
"InnehålliFrp",
"Enhetnamn",
"Dagspris",
"Avtal",
"Avtalnr",
"Varuområdenamn",
"Utökadvarugrupp",
"ArtikelgruppRnamn",
"Varugruppnamn",
"Miljömärkning",
"Märkning",
"Levartnr",
"HuvudleverantörNamn",
"Ursprungsland",
"Alkskatt",
"Nettoexklalkoskatt",
"Nettovikt(kg)",
"Köptantal",
"Antalköp",
"Upphandlad",
"GTINenligtsortfil",
"LevartnrBenämning",
"LevartnrString",
"GTIN",
"GTINType",
"KommunNummer"
],

dabas = ["_id",
"Artikelbeskrivning",
"Artikelegenskap",
"Produktkod",
"OvrigObligatoriskMarkning",
"MaximalaAntaletMinstaEnheterIforpackningen",
"Hyllkantstext",
"Storlek",
"TullstatistisktNummer",
"Datumstandard",
"MangdFardigVara",
"MangdPris",
"MangdFardigVaraAvser",
"AntalMinstaEnheterIforpackningen",
"MinstaEnhetViktVolym",
"MinstaEnhetSort",
"Hemsida",
"Nettovikt",
"Nettovolym",
"AvgiftErlagdForForpackningsmaterial",
"Skattesats",
"MinstaEnhetCirkaViktVolym",
"Alkoholhalt",
"T4203_Argang",
"Staplingshojd",
"NordisktVarunummerLakemedel",
"KravObrutenKylkedja",
"PLUNummer",
"Faktortyp",
"Faktor",
"T4202_LokaltUrsprung",
"Ursprungsland",
"RelativLuftfuktighetMin",
"TemperaturMax",
"TemperaturMin",
"RelativLuftfuktighetMax",
"TotalHallbarhetAntalDagar",
"HallbarhetMinAntalDagarLeverantor",
"InformationOvrig",
"Emballagevikt",
"Allergenpastaende",
"Kubikmeter",
"Kvadratmeter",
"Langd",
"AntalPortioner",
"PrismarktAvleverantor",
"Ingrediensforteckning",
"ArtikelEJAvseddForFoodservicemarknaden",
"Druvsort",
"FarligarDelarBorttagbara",
"UppfyllerRoHS",
"Palltyp",
"T0157_Tryckkanslighet",
"Pris",
"ValutaPaPriset",
"InnehallerEjAllergener",
"Ursprungsdeklaration",
"IngrediensforteckningIckeLivsmedel",
"OvrigMarkning",
"SlutdatumForVariant",
"Halsopastaende",
"Naringspastaende",
"Malmarknadsomrade",
"Sillvikt",
"BatterierIngar",
"BatterierKravs",
"Batteriteknik",
"Batterityp",
"T4750_AntalInbyggdaBatterier",
"Batterivikt",
"T4204_SökbegreppEhandel",
"T4228_ArtensVetenskapligaNamnKod",
"T4229_ArtensVetenskapligaNamn",
"T4230_Fangstredskap",
"T4231_Produktionsmetod",
"T4232_Forvaringsstatus",
"InbyggdaBatterier",
"GTIN",
"TillverkarensArtikelnummer",
"Artikelbenamning",
"RegleratProduktnamn",
"Forvaringsinstruktion",
"Variabelmattsindikator",
"Bruttovikt",
"Bredd",
"Djup",
"Hojd",
"Returemballage",
"FarligtGodsKod",
"FarligtGodsKlass",
"FarligtGodsForpackningsgrupp",
"GPCKod",
"GiltigFROM",
"Publiceringsdatum",
"FakturerbarEnhet",
"Slutdatum",
"GiltighetsdatumPris",
"Tillganglighetstidpunkt",
"SistaTillganglighetstidpunkt",
"SkapadDatum",
"SenastAndradDatum",
"Flampunkt",
"KodBegransadMangd",
"OfficiellTransportbenamning",
"OspecificeradTransportbenamning",
"TunnelrestriktionADR",
"KlassificeringskodFarligtgods",
"Transportkategori",
"Konsumentartikel",
"BestallningsbarForpackning",
"RabattOlaglig",
"Garantiloptid",
"Konsumentdatum",
"Tjanst",
"Sasongsindikator",
"Engangskop",
"AntalReturnerbaraEnheter",
"Staplingsriktning",
"Staplingstyp",
"MaxTransportTemperatur",
"MinTransportTemperatur",
"Anvandningsinstruktioner",
"HallbarhetEfterOppning",
"Riskfras",
"KodlistutgivareRiskfras",
"Klassificeringssystem",
"FarligtGodsBegransadMangd",
"FarligtGodsOvrigInfo",
"FarligtGodsSarbestammelser",
"T3495_Artikelavisering",
"T4032_TypAvUtgangsdatum",
"T3742_ForstaLeveransdatum",
"Undervarumarke",
"Niva",
"Produktbladslank",
"KompletterandeProduktklass",
"T4200_AllmänPubliceringstidpunkt",
"T3848_TypAvTryckkanslighet",
"Varningsetiketter",
"Sasongskoder",
"Produktklasser",
"MaskinellMarkningar",
"Bilder",
"ReferenserTillAndraArtiklar",
"MSRKritierier",
"Kravspecifikationer",
"Receptlinks",
"Allergener",
"Markningar",
"Ingredienser",
"Tillagningsinformation",
"Tillverkningslander",
"Naringsinfo",
"Serveringsforslag",
"Diettyper",
"Tillagningsmetoder",
"Farger",
"VillkorForsaljning",
"Varumarke",
"Nettoinnehall",
"Kontakter",
"Faroangivelser",
"Sakerhet",
"Forpackningar",
"Tillsatser",
"Substanser",
"Fangstzoner",
"Marknadsbudskap",
"KortMarknadsbudskap",
"Komponenter",
"GTINNivaer",
"Varumarket",
"Tillverkare",
"TillverkarensVarumarke"]

msstat = [
    "_id",
"Kommun",
"Kundnr",
"Enhet",
"Produktslag",
"Produktområde",
"Produktgrupp",
"Artikelnr",
"Artikelnamn",
"Anbuds-vara",
"Anbuds-vara1",
"Anbuds-vara2",
"Inköpiår",
"Inköpiår1",
"Antalenhiår",
"Antalenhiår1",
"Kg/Litiår",
"Ekologisk",
"Försenhet",
"Varumärke",
"Ekologisk2",
"Rättvisemärkt",
"Leverantör",
"Levkod",
"Ursprungsland",
"MSArtikelnr",
"Leverantörsnummer",
"",
"GTIN"
]