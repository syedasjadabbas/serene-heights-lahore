export const site = {
  name: "Serene Heights Lahore",
  tagline: "A landmark 21-storey mixed-use commercial development on Gulberg Main Boulevard, Lahore.",
  email: "info@sereneheightslahore.com",
  address: "Gulberg Main Boulevard, Lahore, Pakistan",
  groupUrl: "https://www.sereneheightsgroup.com/lahore",
  phones: {
    commercial: { label: "For Corporate Office / Commercial", numbers: ["0304-1111106"] },
    hospitality: { label: "For Co-Working / Hotel Apartments", numbers: ["0321-4979446", "0300-8497999"] },
  },
};

/** "0304-1111106" -> "tel:03041111106" */
export const tel = (n: string) => `tel:${n.replace(/\D/g, "")}`;

export const nav = [
  { href: "/project", label: "The Project" },
  {
    href: "/project#configuration",
    label: "Floors",
    children: [
      { href: "/project#commercial", label: "Commercial Floors" },
      { href: "/project#offices", label: "Office Floors" },
      { href: "/project#coworking", label: "Co-Working Floors" },
      { href: "/project#hotel", label: "Hotel Apartments" },
    ],
  },
  {
    href: "/amenities",
    label: "Amenities",
    children: [
      { href: "/amenities#architecture", label: "Architecture" },
      { href: "/amenities#services", label: "Services & Amenities" },
    ],
  },
  { href: "/invest", label: "Invest" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
