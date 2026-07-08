export const MENU_TRANSLATIONS: Record<string, {
  name: { EN: string; IT: string; DE: string };
  description: { EN: string; IT: string; DE: string };
}> = {
  // PIZZE (10 items)
  "piz-1": {
    name: { EN: "Pizza Margherita", IT: "Pizza Margherita", DE: "Pizza Margherita" },
    description: {
      EN: "Tomato sauce, fresh mozzarella, olive oil and fresh basil.",
      IT: "Salsa di pomodoro, mozzarella fresca, olio d'oliva e basilico fresco.",
      DE: "Tomatensauce, frischer Mozzarella, Olivenöl und frisches Basilikum."
    }
  },
  "piz-2": {
    name: { EN: "Pizza Vesuvio", IT: "Pizza Vesuvio", DE: "Pizza Vesuvio" },
    description: {
      EN: "Tomato sauce, mozzarella, ham and oregano.",
      IT: "Salsa di pomodoro, mozzarella, prosciutto cotto e origano.",
      DE: "Tomatensauce, Mozzarella, gekochter Schinken und Oregano."
    }
  },
  "piz-3": {
    name: { EN: "Pizza Capricciosa", IT: "Pizza Capricciosa", DE: "Pizza Capricciosa" },
    description: {
      EN: "Tomato sauce, mozzarella, ham, fresh mushrooms and olives.",
      IT: "Salsa di pomodoro, mozzarella, prosciutto cotto, funghi freschi e olive.",
      DE: "Tomatensauce, Mozzarella, gekochter Schinken, frische Champignons und Oliven."
    }
  },
  "piz-4": {
    name: { EN: "Pizza Quattro Formaggi", IT: "Pizza Quattro Formaggi", DE: "Pizza Quattro Formaggi" },
    description: {
      EN: "Tomato sauce, mozzarella, gorgonzola, local Krk cheese and parmesan.",
      IT: "Salsa di pomodoro, mozzarella, gorgonzola, formaggio locale di Veglia e parmigiano.",
      DE: "Tomatensauce, Mozzarella, Gorgonzola, lokaler Krk-Käse und Parmesan."
    }
  },
  "piz-5": {
    name: { EN: "Pizza Al Tonno", IT: "Pizza Al Tonno", DE: "Pizza Al Tonno" },
    description: {
      EN: "Tomato sauce, mozzarella, tuna, capers, red onion and olive oil.",
      IT: "Salsa di pomodoro, mozzarella, tonno, capperi, cipolla rossa e olio d'oliva.",
      DE: "Tomatensauce, Mozzarella, Thunfisch, Kapern, rote Zwiebeln und Olivenöl."
    }
  },
  "piz-6": {
    name: { EN: "Pizza Picante", IT: "Pizza Picante", DE: "Pizza Picante" },
    description: {
      EN: "Tomato sauce, mozzarella, spicy salami, hot peppers, ajvar and red onion.",
      IT: "Salsa di pomodoro, mozzarella, salame piccante, peperoncini, ajvar e cipolla rossa.",
      DE: "Tomatensauce, Mozzarella, scharfe Salami, Peperoni, Ajvar und rote Zwiebeln."
    }
  },
  "piz-7": {
    name: { EN: "Krk Pizza", IT: "Pizza di Veglia", DE: "Pizza Krk" },
    description: {
      EN: "Tomato sauce, local Krk sheep cheese, prosciutto, wild figs and arugula.",
      IT: "Salsa di pomodoro, formaggio pecorino locale di Veglia, prosciutto crudo, fichi selvatici e rucola.",
      DE: "Tomatensauce, lokaler Krk-Schafskäse, hausgemachter Prosciutto, wilde Feigen und Rucola."
    }
  },
  "piz-8": {
    name: { EN: "Pizza Rustica", IT: "Pizza Rustica", DE: "Pizza Rustica" },
    description: {
      EN: "Tomato sauce, mozzarella, bacon, mushrooms, sour cream and onions.",
      IT: "Salsa di pomodoro, mozzarella, pancetta locale, funghi, panna acida e cipolla.",
      DE: "Tomatensauce, Mozzarella, hausgemachter Speck, Champignons, Sauerrahm und Zwiebeln."
    }
  },
  "piz-9": {
    name: { EN: "Pizza Vegetariana", IT: "Pizza Vegetariana", DE: "Vegetarische Pizza" },
    description: {
      EN: "Tomato sauce, mozzarella, grilled zucchini, eggplant, peppers, corn and cherry tomatoes.",
      IT: "Salsa di pomodoro, mozzarella, zucchine grigliate, melanzane, peperoni, mais e pomodorini.",
      DE: "Tomatensauce, Mozzarella, gegrillte Zucchini, Auberginen, Paprika, Mais und Kirschtomaten."
    }
  },
  "piz-10": {
    name: { EN: "Bistro Top Special", IT: "Bistro Top Special", DE: "Bistro Top Spezial" },
    description: {
      EN: "Tomato sauce, mozzarella, beef tenderloin strips, truffle cream and fresh arugula.",
      IT: "Salsa di pomodoro, mozzarella, straccetti di filetto di manzo, crema di tartufo e rucola fresca.",
      DE: "Tomatensauce, Mozzarella, Rinderfiletstreifen, Trüffelcreme und frischer Rucola."
    }
  },

  // JELA S ROŠTILJA (10 items)
  "ros-1": {
    name: { EN: "Homemade Ćevapčići", IT: "Ćevapčići della Casa", DE: "Hausgemachte Ćevapčići" },
    description: {
      EN: "10 pieces of 100% beef grilled on charcoal, served in hot somun flatbread with onions and ajvar.",
      IT: "10 pezzi di ćevapčići di manzo al 100% cotti sulla brace, serviti in un caldo panino somun con cipolla e ajvar.",
      DE: "10 Ćevapčići aus 100% Rindfleisch auf Holzkohle gegrillt, serviert in heißem Somun-Fladenbrot mit Zwiebeln und Ajvar."
    }
  },
  "ros-2": {
    name: { EN: "Pljeskavica with Kajmak", IT: "Pljeskavica con Kajmak", DE: "Pljeskavica mit Kajmak" },
    description: {
      EN: "Large beef patty served in somun flatbread with a generous dollop of homemade kajmak cream and onions.",
      IT: "Grande polpetta di manzo servita nel panino somun con una generosa cucchiaiata di kajmak fatto in casa e cipolla rossa.",
      DE: "Großes Rindfleisch-Pljeskavica serviert in Somun-Fladenbrot mit einem großzügigen Stück hausgemachtem Kajmak und roten Zwiebeln."
    }
  },
  "ros-3": {
    name: { EN: "Stuffed Pljeskavica", IT: "Pljeskavica Ripiena", DE: "Gefüllte Pljeskavica" },
    description: {
      EN: "Beef patty stuffed with local cheese and bacon bits, grilled over charcoal.",
      IT: "Polpetta di manzo ripiena di formaggio locale e pancetta a cubetti, cotta alla griglia.",
      DE: "Rinder-Pljeskavica gefüllt mit hausgemachtem Käse und Speckwürfeln, vom Grill."
    }
  },
  "ros-4": {
    name: { EN: "Mixed Meat 'Bistro Top'", IT: "Grigliata Mista 'Bistro Top'", DE: "Grillteller 'Bistro Top'" },
    description: {
      EN: "Charcoal classics: ćevapčići, pork skewer, marinated chicken fillet and local sausage served with french fries.",
      IT: "Grigliata classica: ćevapčići, spiedino di maiale, filetto di pollo marinato e salsiccia locale con patatine fritte.",
      DE: "Holzkohle-Klassiker: Ćevapčići, Schweinespieß, mariniertes Hähnchenfilet und hausgemachte Wurst mit Pommes."
    }
  },
  "ros-5": {
    name: { EN: "Pork Loin Skewers", IT: "Spiedini di Lonza di Maiale", DE: "Schweinerücken-Spieße" },
    description: {
      EN: "Pork loin threaded onto skewers with onions and peppers, grilled and served with baked potatoes.",
      IT: "Filetto di maiale infilzato su spiedini con cipolla e peperoni, grigliato e servito con patate al forno.",
      DE: "Schweinefilet am Spieß mit Zwiebeln und Paprika, gegrillt, serviert mit Ofenkartoffeln."
    }
  },
  "ros-6": {
    name: { EN: "Veal Chops with Herbs", IT: "Costolette di Vitello alle Erbe", DE: "Kalbskoteletts mit Kräutern" },
    description: {
      EN: "Thick grilled veal chops drizzled with olive oil, fresh rosemary and garlic emulsion.",
      IT: "Spesse costolette di vitello grigliate, condite con un'emulsione di olio d'oliva, rosmarino e aglio.",
      DE: "Dicke Kalbskoteletts vom Grill, beträufelt mit Olivenöl, Rosmarin und Knoblauch."
    }
  },
  "ros-7": {
    name: { EN: "Grilled Rump Steak", IT: "Costata di Manzo alla Griglia", DE: "Rumpsteak vom Rost" },
    description: {
      EN: "Aged beef rump steak grilled on charcoal, served with baked potatoes and olives.",
      IT: "Costata di manzo frollata alla griglia, servita con patate al forno e olive.",
      DE: "Abgehangenes Rinderrumpsteak vom Grill mit Ofenkartoffeln und Oliven."
    }
  },
  "ros-8": {
    name: { EN: "Marinated Chicken Fillet", IT: "Filetto di Pollo Marinato", DE: "Mariniertes Hähnchenfilet" },
    description: {
      EN: "Chicken fillet marinated in local herbs and lemon, grilled on charcoal, served with zucchini.",
      IT: "Filetto di pollo marinato alle erbe locali e limone, grigliato e servito con zucchine.",
      DE: "Hähnchenfilet mariniert in Kräutern und Zitrone, vom Grill, serviert mit Zucchini."
    }
  },
  "ros-9": {
    name: { EN: "Homemade Krk Sausages", IT: "Salsicce di Veglia Fatte in Casa", DE: "Hausgemachte Krk-Würste" },
    description: {
      EN: "Traditional pork sausages made on Krk island, grilled and served with sauerkraut.",
      IT: "Salsicce di maiale tradizionali di Veglia, grigliate e servite con crauti.",
      DE: "Traditionelle Schweinswürste von der Insel Krk, vom Grill, serviert mit Sauerkraut."
    }
  },
  "ros-10": {
    name: { EN: "Pepper Steak", IT: "Filetto al Pepe Verde", DE: "Pfeffersteak" },
    description: {
      EN: "Premium beef tenderloin grilled, brushed with butter and topped with green peppercorn and cognac sauce.",
      IT: "Filetto di manzo di prima scelta alla griglia spennellato al burro, con salsa al pepe verde e cognac.",
      DE: "Premium-Rinderfilet vom Grill, mit Butter bestrichen, serviert an einer grünen Pfeffersauce mit Kognak."
    }
  },

  // JELA POD PEKOM (10 items)
  "pek-1": {
    name: { EN: "Veal under Peka", IT: "Vitello sotto la Peka", DE: "Kalbfleisch unter der Peka" },
    description: {
      EN: "Tender veal slow-roasted for 3 hours under a iron bell covered with embers, served with baby potatoes and onions.",
      IT: "Tenero vitello cotto lentamente per 3 ore sotto la campana di ferro coperta di brace, con patate novelle e cipolla.",
      DE: "Zartes Kalbfleisch, 3 Stunden langsam unter einer mit Glut bedeckten Peka-Glocke geschmort, mit jungen Kartoffeln und Zwiebeln."
    }
  },
  "pek-2": {
    name: { EN: "Krk Lamb under Peka", IT: "Agnello di Veglia sotto la Peka", DE: "Krk-Lamm unter der Peka" },
    description: {
      EN: "Local pasture-raised lamb roasted under peka with domestic potatoes and fresh sage leaves.",
      IT: "Agnello locale allevato al pascolo cotto sotto la campana con patate nostrane e salvia fresca.",
      DE: "Lammfleisch von Krk-Weiden unter der Peka gebacken mit Kartoffeln und frischem Salbei."
    }
  },
  "pek-3": {
    name: { EN: "Octopus under Peka", IT: "Polpo sotto la Peka", DE: "Krake unter der Peka" },
    description: {
      EN: "Whole Adriatic octopus slow-baked under peka with potatoes, black olives and white wine.",
      IT: "Polpo intero dell'Adriatico cotto lentamente sotto la campana con patate, olive nere e vino bianco.",
      DE: "Ganze adriatische Krake unter der Peka geschmort mit Kartoffeln, Oliven und Weißwein."
    }
  },
  "pek-4": {
    name: { EN: "Domestic Rooster under Peka", IT: "Gallo Nostrano sotto la Peka", DE: "Hausgemachter Hahn unter der Peka" },
    description: {
      EN: "Free-range rooster baked under the iron bell with potatoes, baby carrots and fresh rosemary.",
      IT: "Gallo ruspante cotto lentamente sotto la campana di ferro con patate, carotine e rosmarino freschi.",
      DE: "Hausgemachter Hahn unter der Peka gebacken mit Kartoffeln, jungen Karotten und Rosmarin."
    }
  },
  "pek-5": {
    name: { EN: "Wild Boar under Peka", IT: "Cinghiale sotto la Peka", DE: "Wildschwein unter der Peka" },
    description: {
      EN: "Wild boar meat marinated in red wine and bay leaves, slow-baked under peka with dried plums.",
      IT: "Carne di cinghiale marinata in vino rosso e alloro, cotta sotto la campana con prugne secche.",
      DE: "Wildschweinfleisch mariniert in Wein und Lorbeerblatt, unter der Peka geschmort mit getrockneten Pflaumen."
    }
  },
  "pek-6": {
    name: { EN: "Suckling Pig under Peka", IT: "Maialino da Latte sotto la Peka", DE: "Spanferkel unter der Peka" },
    description: {
      EN: "Suckling pork pig slow-roasted under peka until skin is golden and crispy, served with potatoes.",
      IT: "Maialino da latte cotto sotto la campana fino a doratura della cotenna croccante, servito con patate.",
      DE: "Spanferkel unter der Peka geschmort, bis die Haut goldbraun und knusprig ist, mit Kartoffeln."
    }
  },
  "pek-7": {
    name: { EN: "Mixed Peka Platter", IT: "Peka Mista di Carne", DE: "Gemischtes Peka-Gericht" },
    description: {
      EN: "Hearty combination of veal loin and lamb leg slow-roasted under the iron bell with seasonal vegetables.",
      IT: "Ricca combinazione di lonza di vitello e cosciotto d'agnello cotti sotto la campana con verdure di stagione.",
      DE: "Kombination aus Kalbsrücken und Lammkeule, langsam unter der Peka gegart mit Gemüse."
    }
  },
  "pek-8": {
    name: { EN: "Lamb Shank under Peka", IT: "Stinco d'Agnello sotto la Peka", DE: "Lammschulter unter der Peka" },
    description: {
      EN: "Lamb shank slow-cooked and roasted under peka with root vegetables and sweet prošek wine.",
      IT: "Stinco d'agnello cotto lentamente sotto la campana con ortaggi a radice e vino dolce prošek.",
      DE: "Lammhaxe langsam unter der Peka gegart mit Wurzelgemüse und Prošek-Süßwein."
    }
  },
  "pek-9": {
    name: { EN: "Duck under Peka with Apples", IT: "Anatra sotto la Peka con Mele", DE: "Ente unter der Peka mit Äpfeln" },
    description: {
      EN: "Domestic duck slow-roasted under peka with tart apples, potatoes and a touch of cinnamon.",
      IT: "Anatra nostrana cotta sotto la campana con mele aspre, patate e un pizzico di cannella.",
      DE: "Hausente langsam unter der Peka geschmort mit sauren Äpfeln, Kartoffeln und Zimt."
    }
  },
  "pek-10": {
    name: { EN: "Vegetables under Peka", IT: "Verdure sotto la Peka", DE: "Gemüse unter der Peka" },
    description: {
      EN: "Potatoes, carrots, zucchini, onions, eggplants and peppers baked under the iron bell with olive oil.",
      IT: "Patate, carote, zucchine, cipolle, melanzane e peperoni cotti sotto la campana con olio d'oliva.",
      DE: "Kartoffeln, Karotten, Zucchini, Zwiebeln, Auberginen und Paprika unter der Peka geschmort mit Olivenöl."
    }
  },

  // RIBA & PLODOVI MORA (10 items)
  "rib-1": {
    name: { EN: "Grilled Sea Bream", IT: "Orata alla Griglia", DE: "Goldbrasse vom Rost" },
    description: {
      EN: "Fresh whole sea bream grilled with rosemary. Served with boiled Swiss chard and garlic potatoes.",
      IT: "Orata fresca intera grigliata al rosmarino. Servita con bietola bollita e patate al prezzemolo.",
      DE: "Frische ganze Goldbrasse vom Grill mit Rosmarin. Beilage: Mangold und Salzkartoffeln mit Knoblauch."
    }
  },
  "rib-2": {
    name: { EN: "Grilled Sea Bass", IT: "Spigola alla Griglia", DE: "Wolfsbarsch vom Rost" },
    description: {
      EN: "Whole sea bass grilled on charcoal, brushed with olive oil and garlic, served with chard.",
      IT: "Spigola intera alla griglia condita con olio d'oliva e aglio, servita con bietole.",
      DE: "Ganzes Wolfsbarsch vom Grill, mit Olivenöl und Knoblauch bestrichen, serviert mit Mangold."
    }
  },
  "rib-3": {
    name: { EN: "Grilled Adriatic Squid", IT: "Calamari dell'Adriatico alla Griglia", DE: "Gegrillter adriatischer Tintenfisch" },
    description: {
      EN: "Whole Adriatic squid grilled, drizzled with parsley, garlic and local Krk olive oil.",
      IT: "Calamari interi dell'Adriatico cotti alla griglia, conditi con prezzemolo, aglio e olio di Veglia.",
      DE: "Ganze adriatische Tintenfische vom Rost, beträufelt mit Knoblauch-Petersilien-Umak und Olivenöl."
    }
  },
  "rib-4": {
    name: { EN: "Fried Squid with Fries", IT: "Calamari Fritti con Patatine", DE: "Frittierter Tintenfisch mit Pommes" },
    description: {
      EN: "Crispy fried squid rings served with golden french fries, lemon wedge and tartar sauce.",
      IT: "Anelli di calamari fritti croccanti serviti con patatine fritte, limone e salsa tartara.",
      DE: "Knusprig frittierte Tintenfischringe serviert mit Pommes frites, Zitrone und Remoulade."
    }
  },
  "rib-5": {
    name: { EN: "Black Cuttlefish Risotto", IT: "Risotto Nero di Seppia", DE: "Schwarzes Tintenfisch-Risotto" },
    description: {
      EN: "Creamy risotto made with local cuttlefish, its ink, olive oil and grated parmesan.",
      IT: "Cremoso risotto preparato con seppie locali, il loro nero, olio d'oliva e parmigiano.",
      DE: "Cremiges Risotto vom Tintenfisch mit Tinte, Olivenöl und Parmesan."
    }
  },
  "rib-6": {
    name: { EN: "Mussels in Tomato Buzara", IT: "Cozze alla Buzara Rossa", DE: "Miesmuscheln in Tomaten-Buzara" },
    description: {
      EN: "Fresh local mussels cooked in tomato, garlic, parsley and Žlahtina local white wine sauce.",
      IT: "Cozze fresche cotte alla buzara con pomodoro, aglio, prezzemolo e vino bianco locale Žlahtina.",
      DE: "Frische Miesmuscheln gedünstet in Sauce aus Tomaten, Knoblauch, Petersilie und Žlahtina-Weißwein."
    }
  },
  "rib-7": {
    name: { EN: "Grilled Tuna Steak", IT: "Trancio di Tonno alla Griglia", DE: "Thunfischsteak vom Grill" },
    description: {
      EN: "Thick fresh tuna steak grilled on charcoal, brushed with olive oil, served on arugula bed.",
      IT: "Fetta spessa di tonno fresco alla griglia spennellata d'olio, servita su letto di rucola.",
      DE: "Dicke frische Thunfischtranche vom Grill mit Olivenöl, serviert auf einem Rucolabett."
    }
  },
  "rib-8": {
    name: { EN: "Kvarner Scampi Buzara", IT: "Scampi del Quarnaro alla Buzara", DE: "Kvarner Kaisergranat auf Buzara-Art" },
    description: {
      EN: "First-class scampi from the Kvarner bay cooked in white buzara sauce with olive oil and garlic.",
      IT: "Scampi di prima scelta del Quarnaro cotti in buzara in bianco con olio d'oliva e aglio.",
      DE: "Erstklassige Kaisergranaten (Scampi) aus der Kvarner Bucht gedünstet in weißer Buzarasauce."
    }
  },
  "rib-9": {
    name: { EN: "Prawn and Zucchini Risotto", IT: "Risotto con Gamberetti e Zucchine", DE: "Garnelen-Zucchini-Risotto" },
    description: {
      EN: "Krk prawn tails cooked with baby zucchini in a creamy olive oil risotto base.",
      IT: "Code di gamberetti di Veglia cotte con zucchine novelle in un cremoso risotto all'olio.",
      DE: "Cremiges Risotto mit adriatischen Garnelen, jungen Zucchini und Olivenöl."
    }
  },
  "rib-10": {
    name: { EN: "Monkfish in White Sauce", IT: "Rana Pescatrice in Salsa Bianca", DE: "Seeteufel in weißer Sauce" },
    description: {
      EN: "Monkfish fillets simmered in white garlic, wine and cream sauce, served with potatoes.",
      IT: "Filetto di rana pescatrice cotto in salsa bianca all'aglio, vino e panna con patate bollite.",
      DE: "Seeteufelfilet gedünstet in weißer Sauce aus Knoblauch, Wein und Sahne mit Salzkartoffeln."
    }
  },

  // PREDJELA & DESERTI (10 items)
  "pre-1": {
    name: { EN: "Krk Prosciutto and Sheep Cheese", IT: "Prosciutto di Veglia e Pecorino", DE: "Krk-Schinken und Schafskäse" },
    description: {
      EN: "Local air-dried prosciutto, local sheep cheese from Krk farm, olives and figs.",
      IT: "Prosciutto crudo locale essiccato alla bora, formaggio pecorino locale, olive e fichi.",
      DE: "Hausgemachter Schinken luftgetrocknet, Schafskäse aus lokaler Käserei, Oliven und Feigen."
    }
  },
  "pre-2": {
    name: { EN: "Octopus Salad", IT: "Insalata di Polpo", DE: "Kraken-Salat" },
    description: {
      EN: "Tender boiled octopus pieces tossed with potatoes, red onions, parsley and olive oil.",
      IT: "Teneri pezzetti di polpo bollito conditi con patate, cipolla rossa, prezzemolo e olio locale.",
      DE: "Zart gekochte Krakenstücke mit Kartoffeln, roten Zwiebeln, Petersilie und nativem Olivenöl."
    }
  },
  "pre-3": {
    name: { EN: "Salted Sardines with Onion", IT: "Sarde Salate con Cipolla", DE: "Salzige Sardinen mit Zwiebeln" },
    description: {
      EN: "Salted sardine fillets in olive oil topped with red onions on toasted crusty bread.",
      IT: "Filetti di sarde salate in olio d'oliva conditi con cipolle rosse su pane tostato croccante.",
      DE: "Gesalzene Sardinenfilets in Olivenöl mit roten Zwiebeln auf geröstetem Brot."
    }
  },
  "pre-4": {
    name: { EN: "Krk Presnac Cake", IT: "Torta Presnac di Veglia", DE: "Krčki Presnac Kuchen" },
    description: {
      EN: "Traditional local pastry filled with young sheep cheese, eggs and lemon zest.",
      IT: "Dolce tradizionale a base di formaggio pecorino fresco, uova e scorza di limone.",
      DE: "Traditioneller Kuchen aus jungem Schafskäse, Eiern und Zitronenschale in süßem Teig."
    }
  },
  "pre-5": {
    name: { EN: "Homemade Rožata", IT: "Rožata della Casa", DE: "Hausgemachte Rožata" },
    description: {
      EN: "Creamy caramel custard pudding flavored with traditional rose liqueur.",
      IT: "Cremoso budino al caramello aromatizzato con liquore tradizionale alla rosa.",
      DE: "Cremiger Karamellpudding verfeinert mit traditionellem Rosenlikör."
    }
  },
  "pre-6": {
    name: { EN: "Homemade Apple Strudel", IT: "Strudel di Mele della Casa", DE: "Hausgemachter Apfelstrudel" },
    description: {
      EN: "Warm strudel pastry filled with tart apples, cinnamon and raisins, served with vanilla sauce.",
      IT: "Strudel caldo ripieno di mele aspre, cannella e uvetta, servito con salsa alla vaniglia.",
      DE: "Warmer Strudel mit sauren Äpfeln, Zimt und Rosinen, serviert mit Vanillesauce."
    }
  },
  "pre-7": {
    name: { EN: "Chocolate Lava Cake", IT: "Tortino al Cioccolato dal Cuore Caldo", DE: "Schoko-Lava-Kuchen" },
    description: {
      EN: "Warm chocolate cake with a melting hot chocolate core, served with a scoop of ice cream.",
      IT: "Tortino tiepido al cioccolato dal cuore liquido, servito con una pallina di gelato.",
      DE: "Warmer Kuchen mit flüssigem Schokoladenkern, serviert mit einer Kugel Eiscreme."
    }
  },
  "pre-8": {
    name: { EN: "Crepes with Walnuts and Honey", IT: "Crespelle con Noci e Miele", DE: "Pfannkuchen mit Walnüssen und Honig" },
    description: {
      EN: "Warm crepes stuffed with ground walnuts and drizzled with raw local Krk honey.",
      IT: "Crespelle calde ripiene di noci tritate e condite con miele grezzo locale di Veglia.",
      DE: "Warme Pfannkuchen gefüllt mit gemahlenen Walnüssen und beträufelt mit lokalem Krk-Honig."
    }
  },
  "pre-9": {
    name: { EN: "Fritule with Cinnamon and Sugar", IT: "Fritole con Cannella e Zucchero", DE: "Krapfen mit Zimt und Zucker" },
    description: {
      EN: "Homemade fried local fritter balls dusted with powdered sugar and cinnamon.",
      IT: "Fritole tradizionali calde spolverate con zucchero a velo e cannella.",
      DE: "Hausgemachte frittierte Fritule-Bällchen, bestreut mit Puderzucker und Zimt."
    }
  },
  "pre-10": {
    name: { EN: "Figs in Prošek Wine", IT: "Fichi cotti nel Prošek", DE: "Feigen in Prošek-Süßwein" },
    description: {
      EN: "Local Krk figs cooked in sweet prošek wine, served warm with vanilla ice cream.",
      IT: "Fichi locali di Veglia cotti nel vino dolce prošek, serviti caldi con gelato alla vaniglia.",
      DE: "Krk-Feigen gedünstet in süßem Prošek-Wein, warm serviert mit Vanilleeis."
    }
  }
};
