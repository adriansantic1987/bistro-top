import { MENU_ITEMS } from "@/data/menuData";
import { MENU_TRANSLATIONS } from "@/data/menuTranslations";

export const FALLBACK_OPENING_HOURS = [
  { day_group: "Pon - Sub", open_time: "12:00", close_time: "23:00", season_label: "Ljeto" },
  { day_group: "Nedjelja", open_time: "12:00", close_time: "22:00", season_label: "Ljeto" }
];

export const FALLBACK_MENU_ITEMS = MENU_ITEMS.map((item, index) => ({
  id: item.id,
  category: item.category,
  name: item.name,
  description: item.description,
  price: item.price,
  display_order: index,
  active: true
}));

export const FALLBACK_SITE_CONTENT = {
  HR: {
    navbar: {
      home: "Početna",
      about: "O nama",
      menu: "Jelovnik",
      contact: "Kontakt & Rezervacije"
    },
    hero: {
      accent: "Otok Krk, Hrvatska • Pizzeria & Grill",
      subtitle: "Uživajte u odličnim pizzama, sočnom roštilju i bogatim porcijama na otoku Krku.",
      desc: "Svakodnevno za vas pripremamo vrhunske burgere, tople domaće pizze iz krušne peći i jela s otvorenog roštilja na drveni ugljen. Dođite u opuštenu atmosferu i ugasite glad uz izdašne i ukusne obroke.",
      ctaMenu: "Pogledaj jelovnik",
      ctaBook: "Rezerviraj stol"
    },
    about: {
      tagline: "Kvalitetna hrana & opušten ambijent",
      title: "Dobrodošli u Bistro Top",
      desc: "Smješten u samom srcu otoka Krka, **Bistro Top** nudi vrhunska, svježe pripremljena jela. Naša jednostavna filozofija donosi obilne i ukusne porcije u kojima uživa cijela obitelj.",
      feature1_title: "Žar drvenog ugljena",
      feature1_desc: "Sočni burgeri i klasični ćevapčići pečeni na pravom žaru.",
      feature2_title: "Pizze iz krušne peći",
      feature2_desc: "Bogate, hrskave pizze iz krušne peći s puno rastopljenog sira.",
      bottom_text: "Bilo da dolazite na brzi ručak nakon plaže, večeru s prijateljima ili obiteljsko druženje, naš jelovnik nudi bogat izbor pizza, mesnih jela s roštilja, burgera i svježih salata. Ovdje nitko ne ostaje gladan!",
      reviews_tagline: "Dojmovi gostiju",
      reviews_title: "Što kažu naši gosti",
      google_score: "Google ocjena: 4.5+ / 5"
    },
    menu: {
      tagline: "Domaći recepti & svježi sastojci",
      title: "Naš jelovnik",
      subtitle: "Istražite bogatu ponudu autohtonih otočkih i jadranskih specijaliteta, pripremljenih s ljubavlju.",
      banner_subtitle: "Domaći ugođaj i tradicionalna krčka kuhinja",
      allergy_note: "* Molimo da o mogućim alergijama obavijestite naše osoblje prije naručivanja. Sve cijene su izražene u eurima i uključuju PDV.",
      categories: {
        pizze: "Pizze",
        rostilj: "Jela s roštilja",
        peka: "Jela pod pekom",
        riba: "Riba & Plodovi mora",
        predjela_deserti: "Predjela & Deserti"
      }
    },
    footer: {
      contact_tagline: "Kontakt & Lokacija",
      visit_us: "Posjetite nas",
      address_title: "Adresa",
      address_value: "Vela Placa 3, 51500 Krk, Hrvatska",
      hours_title: "Radno vrijeme (Ljeto)",
      hours_weekdays: "Pon - Sub: 12:00 - 23:00",
      hours_sunday: "Nedjelja: 12:00 - 22:00",
      logo_desc: "Pizzeria & Grill • Otok Krk, Hrvatska",
      copyright: "Bistro Top Krk. Sva prava pridržana."
    },
    action_box: {
      reserve_title: "Rezervacija Stola",
      reserve_subtitle: "Osigurajte svoje mjesto na vrijeme. Unesite svoje podatke ispod kako biste pokrenuli brzu rezervaciju stola putem WhatsApp poruke.",
      name_placeholder: "Vaše Ime i Prezime",
      guests_placeholder: "Broj osoba",
      date_placeholder: "Datum",
      time_placeholder: "Vrijeme",
      reserve_btn: "Rezerviraj stol (WhatsApp)",
      order_title: "Narudžba Hrane & Dostava",
      order_subtitle: "Ako želite naručiti dostavu hrane na kućnu adresu ili radije preferirate brzu telefonsku rezervaciju stola uživo, kontaktirajte nas direktno.",
      contact_btn: "Kontaktiraj nas",
      whatsapp_template: "Pozdrav! Želio bih rezervirati stol u Bistrou Top. Ime i prezime: {name}, Broj ljudi: {guests}, Datum: {date}, Vrijeme: {time}"
    }
  },
  EN: {
    navbar: {
      home: "Home",
      about: "About Us",
      menu: "Menu",
      contact: "Contact & Booking"
    },
    hero: {
      accent: "Krk Island, Croatia • Pizzeria & Grill",
      subtitle: "Enjoy excellent pizzas, juicy grills and hearty portions on Krk island.",
      desc: "Every day we prepare premium burgers, hot homemade pizzas from the wood-fired oven and dishes from the open charcoal grill. Come to a relaxed atmosphere and satisfy your hunger with generous and delicious meals.",
      ctaMenu: "View Menu",
      ctaBook: "Book a Table"
    },
    about: {
      tagline: "Quality food & relaxed atmosphere",
      title: "Welcome to Bistro Top",
      desc: "Located in the heart of Krk island, **Bistro Top** offers simple, freshly prepared dishes. Our philosophy is to serve generous, delicious portions that the whole family can enjoy.",
      feature1_title: "Charcoal Grill",
      feature1_desc: "Juicy burgers and classic specialties grilled over real charcoal.",
      feature2_title: "Wood-Fired Pizza",
      feature2_desc: "Crispy wood-fired pizzas loaded with homemade sauce and melted cheese.",
      bottom_text: "Whether you come for a quick lunch after the beach, dinner with friends or a family gathering, our menu offers a rich selection of pizzas, grilled meats, burgers and fresh salads. Nobody goes home hungry!",
      reviews_tagline: "Guest Reviews",
      reviews_title: "What our guests say",
      google_score: "Google Rating: 4.5+ / 5"
    },
    menu: {
      tagline: "Homemade recipes & fresh ingredients",
      title: "Our Menu",
      subtitle: "Explore the rich offer of authentic island and Adriatic specialties, prepared with love.",
      banner_subtitle: "Cozy ambient and traditional Krk cuisine",
      allergy_note: "* Please inform our staff of any possible allergies before ordering. All prices are in EUR and include VAT.",
      categories: {
        pizze: "Pizzas",
        rostilj: "Charcoal Grills",
        peka: "Dishes under Peka",
        riba: "Fish & Seafood",
        predjela_deserti: "Starters & Desserts"
      }
    },
    footer: {
      contact_tagline: "Contact & Location",
      visit_us: "Visit Us",
      address_title: "Address",
      address_value: "Vela Placa 3, 51500 Krk, Croatia",
      hours_title: "Opening Hours (Summer)",
      hours_weekdays: "Mon - Sat: 12:00 - 23:00",
      hours_sunday: "Sunday: 12:00 - 22:00",
      logo_desc: "Pizzeria & Grill • Krk Island, Croatia",
      copyright: "Bistro Top Krk. All rights reserved."
    },
    action_box: {
      reserve_title: "Table Reservation",
      reserve_subtitle: "Secure your spot in time. Enter your details below to initiate a quick table reservation via WhatsApp message.",
      name_placeholder: "Your First and Last Name",
      guests_placeholder: "Number of guests",
      date_placeholder: "Date",
      time_placeholder: "Time",
      reserve_btn: "Reserve table (WhatsApp)",
      order_title: "Food Order & Delivery",
      order_subtitle: "If you want to order food delivery to your home address or prefer a quick phone reservation live, contact us directly.",
      contact_btn: "Contact Us",
      whatsapp_template: "Hello! I would like to reserve a table at Bistro Top. Name: {name}, People: {guests}, Date: {date}, Time: {time}"
    }
  },
  IT: {
    navbar: {
      home: "Inizio",
      about: "Chi Siamo",
      menu: "Menu",
      contact: "Contatti"
    },
    hero: {
      accent: "Isola di Krk, Croazia • Pizzeria & Grill",
      subtitle: "Gusta ottime pizze, grigliate succulente e porzioni abbondanti sull'isola di Krk.",
      desc: "Ogni giorno prepariamo hamburger di prima qualità, calde pizze fatte in casa dal forno a legna e piatti dalla griglia a carbone aperta. Vieni in un'atmosfera rilassata e soddisfa la tua fame con pasti abbondanti e deliziosi.",
      ctaMenu: "Vedi il menu",
      ctaBook: "Prenota un tavolo"
    },
    about: {
      tagline: "Cibo di qualità e atmosfera rilassata",
      title: "Benvenuti al Bistro Top",
      desc: "Situato nel cuore dell'isola di Krk, il **Bistro Top** offre piatti semplici e preparati al momento. La nostra filosofia è servire porzioni abbondanti e gustose per tutta la famiglia.",
      feature1_title: "Griglia a carbone",
      feature1_desc: "Hamburger succulenti e ćevapčići cotti su vera griglia a carbone.",
      feature2_title: "Pizze dal forno a legna",
      feature2_desc: "Pizze croccanti con salsa fatta in casa e tanto formaggio fuso.",
      bottom_text: "Che veniate per un pranzo veloce dopo la spiaggia, una cena tra amici o una riunione di famiglia, il nostro menu offre un'ampia scelta di pizze, carne alla griglia, hamburger e insalate fresche. Qui nessuno resta affamato!",
      reviews_tagline: "Recensioni dei clienti",
      reviews_title: "Cosa dicono i nostri ospiti",
      google_score: "Punteggio Google: 4.5+ / 5"
    },
    menu: {
      tagline: "Ricette fatte in casa e ingredienti freschi",
      title: "Il nostro menu",
      subtitle: "Esplora la ricca offerta di specialità dell'isola e dell'Adriatico, preparate con amore.",
      banner_subtitle: "Ambiente accogliente e cucina tradicional di Veglia",
      allergy_note: "* Si prega di informare il nostro staff di eventuali allergie prima di ordinare. Tutti i prezzi sono in euro e comprensivi di IVA.",
      categories: {
        pizze: "Pizze",
        rostilj: "Grigliate",
        peka: "Sotto la peka",
        riba: "Pesce e frutti di mare",
        predjela_deserti: "Antipasti e dolci"
      }
    },
    footer: {
      contact_tagline: "Contatti & Posizione",
      visit_us: "Vieni a trovarci",
      address_title: "Indirizzo",
      address_value: "Vela Placa 3, 51500 Krk, Croazia",
      hours_title: "Orari di apertura (Estate)",
      hours_weekdays: "Lun - Sab: 12:00 - 23:00",
      hours_sunday: "Domenica: 12:00 - 22:00",
      logo_desc: "Pizzeria & Grill • Isola di Krk, Croazia",
      copyright: "Bistro Top Krk. Tutti i diritti riservati."
    },
    action_box: {
      reserve_title: "Prenotazione Tavolo",
      reserve_subtitle: "Assicurati il tuo posto in tempo. Inserisci i tuoi dati qui sotto per avviare una prenotazione rapida del tavolo tramite messaggio WhatsApp.",
      name_placeholder: "Il tuo Nome e Cognome",
      guests_placeholder: "Numero di persone",
      date_placeholder: "Data",
      time_placeholder: "Ora",
      reserve_btn: "Prenota tavolo (WhatsApp)",
      order_title: "Ordinazione Cibo & Consegna",
      order_subtitle: "Se desideri ordinare la consegna di cibo a casa o preferisci una prenotazione telefonica rapida dal vivo, contattaci direttamente.",
      contact_btn: "Contattaci",
      whatsapp_template: "Ciao! Vorrei prenotare un tavolo al Bistro Top. Nome: {name}, Persone: {guests}, Data: {date}, Ora: {time}"
    }
  },
  DE: {
    navbar: {
      home: "Start",
      about: "Über Uns",
      menu: "Speisekarte",
      contact: "Kontakt & Reservierung"
    },
    hero: {
      accent: "Insel Krk, Kroatien • Pizzeria & Grill",
      subtitle: "Genießen Sie hervorragende Pizzen, saftige Grillgerichte und reichliche Portionen auf der Insel Krk.",
      desc: "Jeden Tag bereiten wir erstklassige Burger, heiße hausgemachte Pizzen aus dem Holzofen und Gerichte vom offenen Holzkohlegrill zu. Kommen Sie in eine entspannte Atmosphäre und stillen Sie Ihren Hunger mit reichlichen und leckeren Mahlzeiten.",
      ctaMenu: "Speisekarte ansehen",
      ctaBook: "Tisch reservieren"
    },
    about: {
      tagline: "Qualitätsessen & entspannte Atmosphäre",
      title: "Willkommen im Bistro Top",
      desc: "Im Herzen der Insel Krk bietet das **Bistro Top** einfache, frisch zubereitete Speisen. Unsere Philosophie ist es, reichliche und leckere Portionen für die ganze Familie zu servieren.",
      feature1_title: "Holzkohlegrill",
      feature1_desc: "Saftige Burger und klassische Ćevapčići vom echten Holzkohlegrill.",
      feature2_title: "Pizza aus dem Holzofen",
      feature2_desc: "Knusprige Holzofenpizzen mit hausgemachter Tomatensauce und viel geschmolzenem Käse.",
      bottom_text: "Ob Sie zu einem schnellen Mittagessen nach dem Strand, einem Abendessen mit Freunden oder einem Familientreffen kommen, unsere Speisekarte bietet eine reichhaltige Auswahl an Pizzen, Grillgerichten, Bürgern und frischen Salaten. Wir kommen auf jeden Fall wieder! Hier bleibt niemand hungrig!",
      reviews_tagline: "Gästebewertungen",
      reviews_title: "Was unsere Gäste sagen",
      google_score: "Google-Bewertung: 4.5+ / 5"
    },
    menu: {
      tagline: "Hausgemachte Rezepte & frische Zutaten",
      title: "Speisekarte",
      subtitle: "Entdecken Sie die reichhaltige Auswahl an authentischen Spezialitäten der Insel und der Adria, mit Liebe zubereitet.",
      banner_subtitle: "Gemütliches Ambiente und traditionelle Krk-Küche",
      allergy_note: "* Bitte informieren Sie unser Personal vor der Bestellung über eventuelle Allergien. Alle Preise sind in Euro angegeben und enthalten die gesetzliche MwSt.",
      categories: {
        pizze: "Pizzas",
        rostilj: "Grillgerichte",
        peka: "Gerichte unter Peka",
        riba: "Fisch & Meeresfrüchte",
        predjela_deserti: "Vorspeisen & Desserts"
      }
    },
    footer: {
      contact_tagline: "Kontakt & Lage",
      visit_us: "Besuchen Sie uns",
      address_title: "Adresse",
      address_value: "Vela Placa 3, 51500 Krk, Kroatien",
      hours_title: "Öffnungszeiten (Sommer)",
      hours_weekdays: "Mon - Sam: 12:00 - 23:00",
      hours_sunday: "Sonntag: 12:00 - 22:00",
      logo_desc: "Pizzeria & Grill • Insel Krk, Kroatien",
      copyright: "Bistro Top Krk. Alle Rechte vorbehalten."
    },
    action_box: {
      reserve_title: "Tischreservierung",
      reserve_subtitle: "Sichern Sie sich rechtzeitig Ihren Platz. Geben Sie unten Ihre Daten ein, um eine schnelle Tischreservierung per WhatsApp-Nachricht zu starten.",
      name_placeholder: "Ihr Vor- und Nachname",
      guests_placeholder: "Anzahl der Personen",
      date_placeholder: "Datum",
      time_placeholder: "Uhrzeit",
      reserve_btn: "Tisch reservieren (WhatsApp)",
      order_title: "Essensbestellung & Lieferung",
      order_subtitle: "Wenn Sie eine Essenslieferung nach Hause bestellen möchten oder eine schnelle telefonische Tischreservierung bevorzugen, kontaktieren Sie uns direkt.",
      contact_btn: "Kontaktieren Sie uns",
      whatsapp_template: "Hallo! Ich möchte einen Tisch im Bistro Top reservieren. Name: {name}, Personen: {guests}, Datum: {date}, Uhrzeit: {time}"
    }
  }
};
