export const site = {
  name: "IWM Location",
  legalName: "IWM Industrial Welding Maintenance Sàrl",
  ide: "CHE-316.100.382",
  url: "https://iwm-location.ch",
  phone: "076 361 66 14",
  phoneHref: "tel:+41763616614",
  whatsapp: "41763616614",
  email: "nacelles@iwm-location.ch",
  street: "Chemin des Grandes-Vies 19",
  postalCode: "2900",
  city: "Porrentruy",
  hours: "Lundi à vendredi, 7h00–\u206012h00 et 13h30–\u206017h30",
  hoursShort: "Lu–ve, 7h00–\u206012h00 et 13h30–\u206017h30",
};

export function whatsappUrl(text = "Bonjour IWM Location, je souhaite louer une nacelle."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
