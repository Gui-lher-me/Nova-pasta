import {
  AgreementIcon,
  DashboardIcon,
  ImportsIcon,
  InboxIcon,
  LockIcon,
  MetricIcon,
  NotificationsIcon,
  OrderIcon,
  PlatformIcon,
  PrebuiltIcon,
  ProductIcon,
  ProfileIcon,
  QuestionMarkIcon,
  ReferralIcon,
  ReviewsIcon,
  SettingsIcon,
  SupplierIcon,
  ValuesIcon,
  VendorIcon,
} from "@/icons";
import { Receipt } from "lucide-react";

export const categoryMap = {
  accessories: {
    label: "Accessories",
    subcategories: [
      { value: "belts", label: "Belts" },
      { value: "sunglasses", label: "Sunglasses" },
      { value: "keychains", label: "Keychains" },
      { value: "scarves", label: "Scarves" },
      { value: "gloves_mittens", label: "Gloves & Mittens" },
      { value: "protective_masks", label: "Protective Masks" },
    ],
  },
  bags_wallets: {
    label: "Bags & Wallets",
    subcategories: [
      { value: "backpacks", label: "Backpacks" },
      { value: "wallets", label: "Wallets" },
      { value: "duffel_bags_totes", label: "Duffel Bags & Totes" },
      { value: "travel_luggage", label: "Travel & Luggage" },
      { value: "purses_clutches", label: "Purses & Clutches" },
    ],
  },
  beauty: {
    label: "Beauty",
    subcategories: [
      { value: "face_body_care", label: "Face & Body Care" },
      { value: "hair_care", label: "Hair Care" },
      { value: "hygiene_toiletries", label: "Hygiene & Toiletries" },
      { value: "make_up_cosmetics", label: "Make-Up & Cosmetics" },
      { value: "perfumes_fragrances", label: "Perfumes & Fragrances" },
      { value: "skin_nail_care", label: "Skin & Nail Care" },
    ],
  },
  food_drink: {
    label: "Food & Drinks",
    subcategories: [
      { value: "beverages", label: "Beverages" },
      { value: "coffee_tea", label: "Coffee & Tea" },
      { value: "food_snacks", label: "Food & Snacks" },
    ],
  },
  health_wellness: {
    label: "Health & Wellness",
    subcategories: [
      { value: "anxiety_stress", label: "Anxiety & Stress" },
      { value: "oral_dental_care", label: "Oral & Dental Care" },
      { value: "pain_management", label: "Pain Management" },
      { value: "vitamins_supplements", label: "Vitamins & Supplements" },
    ],
  },
  home_garden: {
    label: "Home & Garden",
    subcategories: [
      { value: "bathroom_accessories", label: "Bathroom" },
      { value: "bedding_pillows_rugs", label: "Bedding, Pillows & Rugs" },
      { value: "cleaning_products", label: "Cleaning Products" },
      { value: "gardening_landscaping", label: "Gardening & Landscaping" },
      { value: "home_appliances", label: "Home Appliances" },
      { value: "mirrors_wall_art", label: "Mirrors & Wall Art" },
      { value: "diffusers_oils_candles", label: "Diffusers, Oils & Candles" },
      { value: "kitchen", label: "Kitchen" },
      { value: "room_decor", label: "Room Decor" },
    ],
  },
  jewelry_watches: {
    label: "Jewelry & Watches",
    subcategories: [
      { value: "bracelets", label: "Bracelets" },
      { value: "charms_pendants", label: "Charms & Pendants" },
      { value: "earrings", label: "Earrings" },
      { value: "necklaces", label: "Necklaces" },
      { value: "rings", label: "Rings" },
      { value: "watches", label: "Watches" },
    ],
  },
  clothing: {
    label: "Clothing",
    subcategories: [
      { value: "athletic", label: "Athletic" },
      { value: "clothing_accessories", label: "Clothing Accessories" },
      { value: "eyewear", label: "Eyewear" },
      { value: "footwear", label: "Footwear" },
      { value: "dresses", label: "Dresses" },
      { value: "jackets_outerwear", label: "Jackets & Outerwear" },
      { value: "pants_leggings", label: "Pants & Leggings" },
      { value: "shirts_tops", label: "Shirts & Tops" },
      { value: "formal_wear", label: "Formal Wear" },
      { value: "headwear", label: "Headwear" },
      { value: "swimwear", label: "Swimwear" },
      { value: "underwear", label: "Underwear" },
    ],
  },
  party_event_gifts: {
    label: "Party, Event & Gifts",
    subcategories: [
      { value: "cards", label: "Cards" },
      { value: "costumes", label: "Costumes" },
      { value: "gifts", label: "Gifts" },
      {
        value: "holidays_seasonal_events",
        label: "Holidays & Seasonal Events",
      },
    ],
  },
  parenting_kids: {
    label: "Parenting & Kids",
    subcategories: [
      { value: "parenthood_accessories", label: "Parenthood & Accessories" },
      { value: "blankets_pillows", label: "Blankets & Pillows" },
      { value: "children_baby_clothing", label: "Children & Baby Clothing" },
    ],
  },
  pets: {
    label: "Pets",
    subcategories: [
      { value: "treats_feeding", label: "Treats & Feeding" },
      { value: "pet_toys", label: "Pet Toys" },
      { value: "apparel_leashes", label: "Apparel & Leashes" },
    ],
  },
  sports_outdoors: {
    label: "Sport & Outdoors",
    subcategories: [
      { value: "fishing_boating", label: "Fishing & Boarding" },
      { value: "hiking_camping", label: "Hiking & Camping" },
      {
        value: "sports_equipment_accessories",
        label: "Sports Equipment & Accessories",
      },
    ],
  },
  stationery_crafts: {
    label: "Stationery & Crafts",
    subcategories: [
      { value: "crafts", label: "Crafts" },
      { value: "office_supplies", label: "Office Suppliers" },
      { value: "pens_pencils", label: "Pens & Pencils" },
      { value: "stickers", label: "Stickers" },
      { value: "notebooks", label: "Notebooks" },
    ],
  },
  tech_accessories: {
    label: "Tech & Accessories",
    subcategories: [
      {
        value: "mobile_laptop_accessories",
        label: "Mobile & Laptop Accessories",
      },
      { value: "speakers_headphones", label: "Speakers & Headphones" },
      {
        value: "renewable_alternative_energy",
        label: "Renewable & Alternative Energy",
      },
      { value: "electronics", label: "Electronics" },
    ],
  },
  toys_games: {
    label: "Toys & Games",
    subcategories: [
      { value: "card_board_games", label: "Card & Board Games" },
      { value: "puzzles_brainteasers", label: "Puzzles & Brainteasers" },
      { value: "toys", label: "Toys" },
    ],
  },
};

export const INITIAL_FILTERS = {
  values: [
    {
      value: "eco_friendly",
      label: "Eco Friendly",
    },
    {
      value: "organic",
      label: "Organic",
    },
    {
      value: "handmade",
      label: "Handmade",
    },
    {
      value: "fair_trade",
      label: "Fair Trade",
    },
    {
      value: "kosher",
      label: "Kosher",
    },
    {
      value: "women_owned",
      label: "Women Owned Business",
    },
    {
      value: "vegan",
      label: "Vegan",
    },
    {
      value: "small_batch",
      label: "Small Batch",
    },
    {
      value: "social_good",
      label: "Social Good",
    },
  ],
  manufacturingCountry: [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
  ],
  supplierCountry: [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
  ],
  shipsTo: [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "all", label: "All countries" },
  ],
};

// cookie stuff
const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
export const cookieOptions = {
  httpOnly: true, // Keeps the cookie inaccessible to client-side JavaScript
  secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
  path: "/", // The cookie is available throughout the website
  expires: new Date(Date.now() + oneDay), // Expires in one day
};

export const COOKIE_NAMES = [
  "supplier_access_token",
  "admin_access_token",
  "store_access_token",
];

export const notFoundImageUrl =
  "https://app.dropcommerce.com/static/media/not-found.4fd1696b.png";

export const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const AGREEMENTS = [
  {
    id: "shipping",
    label: "Shipping",
    description:
      "You agree to ship orders within 3 business days of receiving payment for an order. If there is any delay, you agree to notify DropCommerce immediately. *Exceptions made for hand made products with a large processing time, but must be listed on the profile. If an order is not marked as shipped within 7 days, it may be auto cancelled.",
  },
  {
    id: "inventory",
    label: "Inventory",
    description:
      "You agree to keep accurate inventory levels. If you use Shopify sync, you agree that your Shopify inventory levels are up to date. Otherwise, you agree to update DropCommerce when items are out of stock.",
  },
  {
    id: "pricing",
    label: "Pricing",
    description:
      "You agree to keep your pricing up to date within DropCommerce. Your listed 'retail price' must always match the 'retail price' in DropCommerce. If you update many products and need help syncing them, contact support@dropcommerce.com",
  },
  {
    id: "communication",
    label: "Communication",
    description:
      "You agree to be easy to get in touch with in the case of product or order related questions from customers or DropCommerce staff. If there is an active question / issue and we do not hear back from you within 1-2 business days, orders may be auto-cancelled and refunded.",
  },
];

export const NOTIFICATION_FREQUENCIES = [
  { label: "Immediately", value: "immediately" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
];

export const MANUFACTURING_TIME_OPTIONS = [
  {
    value: "1-2 Days",
    label: "1-2 Days",
  },
  {
    value: "3-5 Days",
    label: "3-5 Days",
  },
  {
    value: "6-7 Days",
    label: "6-7 Days",
  },
  {
    value: "1-2 Weeks",
    label: "1-2 Weeks",
  },
  {
    value: "2-4 Weeks",
    label: "2-4 Weeks",
  },
];

export const countryOptions = [
  {
    value: "US",
    label: "United States",
  },
  {
    value: "CA",
    label: "Canada",
  },
  {
    value: "HA",
    label: "Hawaii/Alaska",
  },
  {
    value: "LA",
    label: "Latin America",
  },
  {
    value: "AU",
    label: "Australia/New Zealand",
  },
  {
    value: "EU",
    label: "European Union",
  },
  {
    value: "IS",
    label: "Iceland",
  },
  {
    value: "INTL",
    label: "International",
  },
];

const countryObj = countryOptions.reduce((acc, { label, value }) => {
  acc[label] = value;
  return acc;
}, {});

export const getCodeFromCountry = (country) => {
  return countryObj[country];
};

export const getCountryFromCode = (code) => {
  const entry = Object.entries(countryObj).find(
    // eslint-disable-next-line no-unused-vars
    ([key, value]) => value === code,
  );
  return entry ? entry[0] : null;
};

export const codeMap = {
  exclude_ak: "AK",
  exclude_pr: "PR",
  exclude_hi: "HI",
};

export const STORE_SETTINGS_PAGES = [];

export const STORE_ACCOUNT_PAGES = [
  {
    icon: <ProfileIcon />,
    destination: "/store/settings/profile",
    label: "Profile",
  },
];

export const SUPPLIER_SETTINGS_PAGES = [
  {
    icon: (
      <ProfileIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/profile",
    label: "Profile",
    description: "Adjust your bio, return policy, and other profile settings",
  },
  {
    icon: (
      <PlatformIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/integrations",
    label: "Integrations",
    description:
      "Connect an ecommerce platform to import products and manage third-party integrations like PayPal and Stripe",
  },
  {
    icon: (
      <ValuesIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/values",
    label: "Values",
    description:
      "Indicate your brand values and special attributes to stores, like 'made in america' or 'organic'",
  },
  {
    icon: (
      <SupplierIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/shippings",
    label: "Shipping rates",
    description: "Adjust your account-level shipping rates and settings",
  },
  {
    icon: (
      <ProductIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/brand",
    label: "Packaging & branding",
    description:
      "Let stores know what to expect in the physical package, such as branding and invoicing",
  },
  {
    icon: (
      <LockIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/reset",
    label: "Reset password",
    description: "Change or reset your account password for added security",
  },
  {
    icon: (
      <AgreementIcon className="me-6 mt-0.5 size-8 shrink-0 text-gray-800 dark:text-neutral-200" />
    ),
    destination: "/settings/agreement",
    label: "Agreement",
    description:
      "Review and complete the supplier agreement before your profile goes live",
  },
];

export const SUPPLIER_ACCOUNT_PAGES = [
  {
    icon: <NotificationsIcon />,
    destination: "/settings/notifications",
    label: "Notifications",
  },
  {
    icon: <ReferralIcon />,
    destination: "/settings/referrals",
    label: "Referrals",
  },
];

export const PLATFORMS = [
  { label: "Shopify", value: "shopify" },
  { label: "Shoplazza", value: "shoplazza" },
  { label: "Wix", value: "wix" },
  { label: "BigCommerce", value: "bigcommerce" },
  { label: "WooCommerce", value: "woocommerce" },
  { label: "Other", value: "other" },
];

export const COUNTRIES = [
  {
    label: "Afghanistan",
    value: "afghanistan",
  },
  {
    label: "Albania",
    value: "albania",
  },
  {
    label: "Algeria",
    value: "algeria",
  },
  {
    label: "Andorra",
    value: "andorra",
  },
  {
    label: "Angola",
    value: "angola",
  },
  {
    label: "Antigua and Barbuda",
    value: "antigua_and_barbuda",
  },
  {
    label: "Argentina",
    value: "argentina",
  },
  {
    label: "Armenia",
    value: "armenia",
  },
  {
    label: "Australia",
    value: "australia",
  },
  {
    label: "Austria",
    value: "austria",
  },
  {
    label: "Azerbaijan",
    value: "azerbaijan",
  },
  {
    label: "Bahamas",
    value: "bahamas",
  },
  {
    label: "Bahrain",
    value: "bahrain",
  },
  {
    label: "Bangladesh",
    value: "bangladesh",
  },
  {
    label: "Barbados",
    value: "barbados",
  },
  {
    label: "Belarus",
    value: "belarus",
  },
  {
    label: "Belgium",
    value: "belgium",
  },
  {
    label: "Belize",
    value: "belize",
  },
  {
    label: "Benin",
    value: "benin",
  },
  {
    label: "Bhutan",
    value: "bhutan",
  },
  {
    label: "Bolivia",
    value: "bolivia",
  },
  {
    label: "Bosnia and Herzegovina",
    value: "bosnia_and_herzegovina",
  },
  {
    label: "Botswana",
    value: "botswana",
  },
  {
    label: "Brazil",
    value: "brazil",
  },
  {
    label: "Brunei",
    value: "brunei",
  },
  {
    label: "Bulgaria",
    value: "bulgaria",
  },
  {
    label: "Burkina Faso",
    value: "burkina_faso",
  },
  {
    label: "Burundi",
    value: "burundi",
  },
  {
    label: "Cabo Verde",
    value: "cabo_verde",
  },
  {
    label: "Cambodia",
    value: "cambodia",
  },
  {
    label: "Cameroon",
    value: "cameroon",
  },
  {
    label: "Canada",
    value: "canada",
  },
  {
    label: "Central African Republic",
    value: "central_african_republic",
  },
  {
    label: "Chad",
    value: "chad",
  },
  {
    label: "Chile",
    value: "chile",
  },
  {
    label: "China",
    value: "china",
  },
  {
    label: "Colombia",
    value: "colombia",
  },
  {
    label: "Comoros",
    value: "comoros",
  },
  {
    label: "Congo",
    value: "congo",
  },
  {
    label: "Costa Rica",
    value: "costa_rica",
  },
  {
    label: "Croatia",
    value: "croatia",
  },
  {
    label: "Cuba",
    value: "cuba",
  },
  {
    label: "Cyprus",
    value: "cyprus",
  },
  {
    label: "Czech Republic",
    value: "czech_republic",
  },
  {
    label: "Denmark",
    value: "denmark",
  },
  {
    label: "Djibouti",
    value: "djibouti",
  },
  {
    label: "Dominica",
    value: "dominica",
  },
  {
    label: "Dominican Republic",
    value: "dominican_republic",
  },
  {
    label: "Ecuador",
    value: "ecuador",
  },
  {
    label: "Egypt",
    value: "egypt",
  },
  {
    label: "El Salvador",
    value: "el_salvador",
  },
  {
    label: "Equatorial Guinea",
    value: "equatorial_guinea",
  },
  {
    label: "Eritrea",
    value: "eritrea",
  },
  {
    label: "Estonia",
    value: "estonia",
  },
  {
    label: "Eswatini",
    value: "eswatini",
  },
  {
    label: "Ethiopia",
    value: "ethiopia",
  },
  {
    label: "Fiji",
    value: "fiji",
  },
  {
    label: "Finland",
    value: "finland",
  },
  {
    label: "France",
    value: "france",
  },
  {
    label: "Gabon",
    value: "gabon",
  },
  {
    label: "Gambia",
    value: "gambia",
  },
  {
    label: "Georgia",
    value: "georgia",
  },
  {
    label: "Germany",
    value: "germany",
  },
  {
    label: "Ghana",
    value: "ghana",
  },
  {
    label: "Greece",
    value: "greece",
  },
  {
    label: "Grenada",
    value: "grenada",
  },
  {
    label: "Guatemala",
    value: "guatemala",
  },
  {
    label: "Guinea",
    value: "guinea",
  },
  {
    label: "Guinea-Bissau",
    value: "guinea_bissau",
  },
  {
    label: "Guyana",
    value: "guyana",
  },
  {
    label: "Haiti",
    value: "haiti",
  },
  {
    label: "Honduras",
    value: "honduras",
  },
  {
    label: "Hungary",
    value: "hungary",
  },
  {
    label: "Iceland",
    value: "iceland",
  },
  {
    label: "India",
    value: "india",
  },
  {
    label: "Indonesia",
    value: "indonesia",
  },
  {
    label: "Iran",
    value: "iran",
  },
  {
    label: "Iraq",
    value: "iraq",
  },
  {
    label: "Ireland",
    value: "ireland",
  },
  {
    label: "Israel",
    value: "israel",
  },
  {
    label: "Italy",
    value: "italy",
  },
  {
    label: "Jamaica",
    value: "jamaica",
  },
  {
    label: "Japan",
    value: "japan",
  },
  {
    label: "Jordan",
    value: "jordan",
  },
  {
    label: "Kazakhstan",
    value: "kazakhstan",
  },
  {
    label: "Kenya",
    value: "kenya",
  },
  {
    label: "Kiribati",
    value: "kiribati",
  },
  {
    label: "Kosovo",
    value: "kosovo",
  },
  {
    label: "Kuwait",
    value: "kuwait",
  },
  {
    label: "Kyrgyzstan",
    value: "kyrgyzstan",
  },
  {
    label: "Laos",
    value: "laos",
  },
  {
    label: "Latvia",
    value: "latvia",
  },
  {
    label: "Lebanon",
    value: "lebanon",
  },
  {
    label: "Lesotho",
    value: "lesotho",
  },
  {
    label: "Liberia",
    value: "liberia",
  },
  {
    label: "Libya",
    value: "libya",
  },
  {
    label: "Liechtenstein",
    value: "liechtenstein",
  },
  {
    label: "Lithuania",
    value: "lithuania",
  },
  {
    label: "Luxembourg",
    value: "luxembourg",
  },
  {
    label: "Madagascar",
    value: "madagascar",
  },
  {
    label: "Malawi",
    value: "malawi",
  },
  {
    label: "Malaysia",
    value: "malaysia",
  },
  {
    label: "Maldives",
    value: "maldives",
  },
  {
    label: "Mali",
    value: "mali",
  },
  {
    label: "Malta",
    value: "malta",
  },
  {
    label: "Marshall Islands",
    value: "marshall_islands",
  },
  {
    label: "Mauritania",
    value: "mauritania",
  },
  {
    label: "Mauritius",
    value: "mauritius",
  },
  {
    label: "Mexico",
    value: "mexico",
  },
  {
    label: "Micronesia",
    value: "micronesia",
  },
  {
    label: "Moldova",
    value: "moldova",
  },
  {
    label: "Monaco",
    value: "monaco",
  },
  {
    label: "Mongolia",
    value: "mongolia",
  },
  {
    label: "Montenegro",
    value: "montenegro",
  },
  {
    label: "Morocco",
    value: "morocco",
  },
  {
    label: "Mozambique",
    value: "mozambique",
  },
  {
    label: "Myanmar",
    value: "myanmar",
  },
  {
    label: "Namibia",
    value: "namibia",
  },
  {
    label: "Nauru",
    value: "nauru",
  },
  {
    label: "Nepal",
    value: "nepal",
  },
  {
    label: "Netherlands",
    value: "netherlands",
  },
  {
    label: "New Zealand",
    value: "new_zealand",
  },
  {
    label: "Nicaragua",
    value: "nicaragua",
  },
  {
    label: "Niger",
    value: "niger",
  },
  {
    label: "Nigeria",
    value: "nigeria",
  },
  {
    label: "North Korea",
    value: "north_korea",
  },
  {
    label: "North Macedonia",
    value: "north_macedonia",
  },
  {
    label: "Norway",
    value: "norway",
  },
  {
    label: "Oman",
    value: "oman",
  },
  {
    label: "Pakistan",
    value: "pakistan",
  },
  {
    label: "Palau",
    value: "palau",
  },
  {
    label: "Palestine",
    value: "palestine",
  },
  {
    label: "Panama",
    value: "panama",
  },
  {
    label: "Papua New Guinea",
    value: "papua_new_guinea",
  },
  {
    label: "Paraguay",
    value: "paraguay",
  },
  {
    label: "Peru",
    value: "peru",
  },
  {
    label: "Philippines",
    value: "philippines",
  },
  {
    label: "Poland",
    value: "poland",
  },
  {
    label: "Portugal",
    value: "portugal",
  },
  {
    label: "Qatar",
    value: "qatar",
  },
  {
    label: "Romania",
    value: "romania",
  },
  {
    label: "Russia",
    value: "russia",
  },
  {
    label: "Rwanda",
    value: "rwanda",
  },
  {
    label: "Saint Kitts and Nevis",
    value: "saint_kitts_and_nevis",
  },
  {
    label: "Saint Lucia",
    value: "saint_lucia",
  },
  {
    label: "Saint Vincent and the Grenadines",
    value: "saint_vincent_and_the_grenadines",
  },
  {
    label: "Samoa",
    value: "samoa",
  },
  {
    label: "San Marino",
    value: "san_marino",
  },
  {
    label: "Sao Tome and Principe",
    value: "sao_tome_and_principe",
  },
  {
    label: "Saudi Arabia",
    value: "saudi_arabia",
  },
  {
    label: "Senegal",
    value: "senegal",
  },
  {
    label: "Serbia",
    value: "serbia",
  },
  {
    label: "Seychelles",
    value: "seychelles",
  },
  {
    label: "Sierra Leone",
    value: "sierra_leone",
  },
  {
    label: "Singapore",
    value: "singapore",
  },
  {
    label: "Slovakia",
    value: "slovakia",
  },
  {
    label: "Slovenia",
    value: "slovenia",
  },
  {
    label: "Solomon Islands",
    value: "solomon_islands",
  },
  {
    label: "Somalia",
    value: "somalia",
  },
  {
    label: "South Africa",
    value: "south_africa",
  },
  {
    label: "South Korea",
    value: "south_korea",
  },
  {
    label: "South Sudan",
    value: "south_sudan",
  },
  {
    label: "Spain",
    value: "spain",
  },
  {
    label: "Sri Lanka",
    value: "sri_lanka",
  },
  {
    label: "Sudan",
    value: "sudan",
  },
  {
    label: "Suriname",
    value: "suriname",
  },
  {
    label: "Sweden",
    value: "sweden",
  },
  {
    label: "Switzerland",
    value: "switzerland",
  },
  {
    label: "Syria",
    value: "syria",
  },
  {
    label: "Taiwan",
    value: "taiwan",
  },
  {
    label: "Tajikistan",
    value: "tajikistan",
  },
  {
    label: "Tanzania",
    value: "tanzania",
  },
  {
    label: "Thailand",
    value: "thailand",
  },
  {
    label: "Timor-Leste",
    value: "timor_leste",
  },
  {
    label: "Togo",
    value: "togo",
  },
  {
    label: "Tonga",
    value: "tonga",
  },
  {
    label: "Trinidad and Tobago",
    value: "trinidad_and_tobago",
  },
  {
    label: "Tunisia",
    value: "tunisia",
  },
  {
    label: "Turkey",
    value: "turkey",
  },
  {
    label: "Turkmenistan",
    value: "turkmenistan",
  },
  {
    label: "Tuvalu",
    value: "tuvalu",
  },
  {
    label: "Uganda",
    value: "uganda",
  },
  {
    label: "Ukraine",
    value: "ukraine",
  },
  {
    label: "United Arab Emirates",
    value: "united_arab_emirates",
  },
  {
    label: "United Kingdom",
    value: "united_kingdom",
  },
  {
    label: "United States",
    value: "united_states",
  },
  {
    label: "Uruguay",
    value: "uruguay",
  },
  {
    label: "Uzbekistan",
    value: "uzbekistan",
  },
  {
    label: "Vanuatu",
    value: "vanuatu",
  },
  {
    label: "Vatican City",
    value: "vatican_city",
  },
  {
    label: "Venezuela",
    value: "venezuela",
  },
  {
    label: "Vietnam",
    value: "vietnam",
  },
  {
    label: "Yemen",
    value: "yemen",
  },
  {
    label: "Zambia",
    value: "zambia",
  },
  {
    label: "Zimbabwe",
    value: "zimbabwe",
  },
];

// Regular Expressions
export const urlRegex = new RegExp(
  "(?:https?:\\/\\/)?(?:www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})(?:\\/\\S*)?",
);

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const storePages = [
  {
    icon: <DashboardIcon />,
    destination: "dashboard",
    label: "Dashboard",
  },
  {
    icon: <ProductIcon />,
    destination: "products",
    label: "Products",
  },
  {
    icon: <SupplierIcon />,
    destination: "suppliers",
    label: "Suppliers",
  },
  {
    icon: <ImportsIcon />,
    destination: "imports",
    label: "Imports",
  },
  {
    icon: <OrderIcon />,
    destination: "orders",
    label: "Orders",
  },
  {
    icon: <PrebuiltIcon />,
    destination: "prebuilt-stores",
    label: "Prebuilt stores",
  },
  // {
  //   icon: <InboxIcon />,
  //   destination: "inbox",
  //   label: "Inbox",
  // },
  // {
  //   icon: <QuestionMarkIcon />,
  //   destination:
  //     "https://help.dropcommerce.com/en/articles/4357042-how-does-dropcommerce-work",
  //   label: "Support",
  // },
  {
    icon: <Receipt className="size-4 flex-shrink-0" />,
    destination: "billing",
    label: "Billing",
  },
  {
    icon: <SettingsIcon />,
    destination: "settings",
    label: "Settings",
  },
];

export const supplierPages = [
  {
    label: "Products",
    destination: "/products/?type=active",
    icon: <ProductIcon />,
  },
  {
    label: "Orders",
    destination: "/orders",
    icon: <OrderIcon />,
  },
  {
    label: "Inbox",
    destination: "/inbox",
    icon: <InboxIcon />,
  },
  {
    label: "Vendors",
    destination: "/vendors",
    icon: <VendorIcon />,
  },
  {
    label: "Reviews",
    destination: "/reviews",
    icon: <ReviewsIcon />,
  },
  {
    label: "Support",
    destination:
      "https://help.dropcommerce.com/en/collections/2535973-dropcommerce-for-suppliers",
    icon: <QuestionMarkIcon />,
  },
  {
    label: "Settings",
    destination: "/settings",
    icon: <SettingsIcon />,
  },
];

export const adminPages = [
  {
    label: "Metrics",
    destination: "/admin/metrics",
    icon: <MetricIcon />,
  },
  {
    label: "Users",
    destination: "/admin/users",
    icon: <ProfileIcon />,
  },
  {
    label: "Suppliers",
    destination: "/admin/suppliers",
    icon: <SupplierIcon />,
  },
  {
    label: "Prebuilt",
    destination: "/admin/prebuilts",
    icon: <ProductIcon />,
  },
];
