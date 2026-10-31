import { ShopDetails, RepairTicket, Product, PCComponent, PCPreset, ServiceItem, CSCService } from '../types';

export const SHOP_DETAILS: ShopDetails = {
  name: "Kashi Computer",
  nameHindi: "काशी कम्प्यूटर",
  tagline: "Sales, Laptop & Desktop Repair, Custom PC & Digital Services",
  taglineHindi: "लैपटॉप-कंप्यूटर रिपेयर, पार्ट्स बिक्री, कस्टम पीसी एवं डिजिटल ई-सेवाएं",
  phone: "7398396002",
  phoneFormatted: "+91 7398396002",
  address: "Shukla Complex, Rajghat",
  addressHindi: "शुक्ला कॉम्प्लेक्स, राजघाट",
  landmark: "Near Rajghat Crossing, Supermarket Road",
  city: "Raebareli",
  state: "Uttar Pradesh",
  pincode: "229001",
  email: "newsandeepstationers53@gmail.com",
  hours: {
    weekdays: "09:30 AM – 08:30 PM",
    sunday: "10:00 AM – 04:30 PM",
  },
  mapCoords: {
    lat: 26.2236,
    lng: 81.2409,
  },
};

export const createWhatsAppUrl = (text: string) => {
  return `https://wa.me/917398396002?text=${encodeURIComponent(text)}`;
};

export const INITIAL_REPAIR_TICKETS: RepairTicket[] = [
  {
    id: "KC-1082",
    customerName: "Mohit Verma",
    customerPhone: "9838112233",
    customerAddress: "Civil Lines, Raebareli",
    deviceType: "laptop",
    brand: "Dell",
    model: "Inspiron 15 3511",
    issueDescription: "Flickering screen & damaged left hinge. Display hinges jammed.",
    receivedDate: "2026-10-29",
    estimatedDate: "2026-11-01",
    status: "in_repair",
    technicianNotes: "New 15.6 FHD 30-pin matte panel installed. Re-fabricating internal metal hinge bracket with epoxy reinforcement.",
    estimatedCost: 3850,
    advancePaid: 1000,
    isPriority: false,
    updates: [
      { date: "2026-10-29 11:30 AM", status: "received", note: "Device checked in at Shukla Complex counter by Sandeep ji." },
      { date: "2026-10-29 03:00 PM", status: "diagnostic", note: "Panel ribbon cable verified OK, panel internal backlight LED damaged, left chassis hinge broken." },
      { date: "2026-10-30 10:15 AM", status: "waiting_approval", note: "Customer approved genuine panel replacement for ₹3850." },
      { date: "2026-10-30 04:20 PM", status: "in_repair", note: "Display mounted and currently aligning hinge tension." },
    ]
  },
  {
    id: "KC-1085",
    customerName: "Adv. Rajesh Shukla",
    customerPhone: "7398396002",
    customerAddress: "Kutchery Road, Raebareli",
    deviceType: "printer",
    brand: "HP",
    model: "LaserJet 1020 Plus",
    issueDescription: "Paper jamming frequently and faded black streak on right margin.",
    receivedDate: "2026-10-30",
    estimatedDate: "2026-10-31",
    status: "ready",
    technicianNotes: "Paper pickup roller replaced with original HP Teflon sleeve. Cartridge 12A refilled with high-density magnetic toner.",
    estimatedCost: 850,
    advancePaid: 0,
    isPriority: true,
    updates: [
      { date: "2026-10-30 01:00 PM", status: "received", note: "Printer received for urgent court document printing turnaround." },
      { date: "2026-10-30 02:45 PM", status: "in_repair", note: "Teflon sleeve replaced and pickup roller cleaned." },
      { date: "2026-10-30 06:10 PM", status: "testing", note: "Test print of 50 consecutive legal pages completed smoothly." },
      { date: "2026-10-31 09:40 AM", status: "ready", note: "Ready for pickup at Shukla Complex desk. Final bill ₹850." },
    ]
  },
  {
    id: "KC-1088",
    customerName: "Pooja Srivastava",
    customerPhone: "8765432109",
    customerAddress: "Indira Nagar, Raebareli",
    deviceType: "laptop",
    brand: "Lenovo",
    model: "ThinkPad E14 Gen 2",
    issueDescription: "Extremely slow boot (taking 8 mins), 100% disk usage on Windows 11.",
    receivedDate: "2026-10-30",
    estimatedDate: "2026-11-01",
    status: "testing",
    technicianNotes: "Upgraded from old slow mechanical HDD to Crucial P3 500GB NVMe PCIe Gen3 SSD. Cloned existing licensed OS and user files.",
    estimatedCost: 3200,
    advancePaid: 1500,
    isPriority: false,
    updates: [
      { date: "2026-10-30 04:00 PM", status: "received", note: "Customer brought laptop complaining about freezing during college lectures." },
      { date: "2026-10-30 05:30 PM", status: "diagnostic", note: "1TB mechanical drive has bad sectors. Recommended SSD upgrade." },
      { date: "2026-10-31 11:00 AM", status: "in_repair", note: "SSD mounted, thermal paste refreshed, clean clone performed." },
      { date: "2026-10-31 03:00 PM", status: "testing", note: "Boot time now 12 seconds! Running burn-in battery and sleep tests." },
    ]
  },
  {
    id: "KC-1090",
    customerName: "Amit Kumar",
    customerPhone: "9450123456",
    customerAddress: "Sultanpur Road, Raebareli",
    deviceType: "desktop",
    brand: "Assembled PC",
    model: "Core i5 10th Gen Gaming Rig",
    issueDescription: "No display on monitor, 3 continuous beeps from motherboard speaker.",
    receivedDate: "2026-10-31",
    estimatedDate: "2026-11-02",
    status: "diagnostic",
    technicianNotes: "Testing RAM slots and CMOS battery voltage. Checking auxiliary 12V 8-pin CPU rail.",
    estimatedCost: 1200,
    advancePaid: 0,
    isPriority: false,
    updates: [
      { date: "2026-10-31 10:00 AM", status: "received", note: "CPU tower received without peripherals." },
      { date: "2026-10-31 12:15 PM", status: "diagnostic", note: "RAM channel B slot oxidised. Cleaning contact pins with isopropyl alcohol." },
    ]
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: "prod-1",
    name: "Crucial BX500 500GB 3D NAND SATA 2.5-inch Internal SSD",
    nameHindi: "क्रूशियल 500GB हाई स्पीड SSD",
    category: "storage",
    brand: "Crucial",
    price: 2850,
    originalPrice: 3800,
    inStock: true,
    warranty: "3 Years Manufacturer Warranty",
    features: ["Speeds up to 540 MB/s", "Ideal for laptops & old desktops", "Free cloning assistance in shop"],
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-2",
    name: "Kingston NV2 1TB M.2 2280 NVMe PCIe 4.0 Internal SSD",
    nameHindi: "किंग्स्टन 1TB अल्ट्रा फास्ट NVMe SSD",
    category: "storage",
    brand: "Kingston",
    price: 5200,
    originalPrice: 6500,
    inStock: true,
    warranty: "3 Years Warranty",
    features: ["Up to 3,500 MB/s Read Speed", "PCIe 4.0 x4 NVMe", "Best for gaming & video editing"],
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-3",
    name: "Logitech MK240 Nano Wireless Keyboard and Mouse Combo",
    nameHindi: "लॉजिटेक वायरलेस कीबोर्ड एवं माउस कॉम्बो",
    category: "accessory",
    brand: "Logitech",
    price: 1550,
    originalPrice: 2095,
    inStock: true,
    warranty: "3 Years Hardware Warranty",
    features: ["Compact space-saving layout", "Up to 36-month battery life", "2.4 GHz wireless nano receiver"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-4",
    name: "HP LaserJet 1020 Plus Single Function Monochrome Laser Printer",
    nameHindi: "एचपी लेज़रजेट 1020 प्लस लेज़र प्रिंटर",
    category: "printer",
    brand: "HP",
    price: 14800,
    originalPrice: 16500,
    inStock: true,
    warranty: "1 Year Onsite Warranty",
    features: ["Legendary 12A cartridge reliability", "Up to 14 ppm print speed", "Lowest running cost per page"],
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-5",
    name: "Epson EcoTank L3210 All-in-One Ink Tank Color Printer",
    nameHindi: "एप्सन ईकोटैंक L3210 कलर प्रिंटर + स्कैनर",
    category: "printer",
    brand: "Epson",
    price: 13200,
    originalPrice: 14999,
    inStock: true,
    warranty: "1 Year or 30,000 pages warranty",
    features: ["Print, Scan, Copy", "Super low cost: 9 paise black / 24 paise color", "Spill-free ink refilling"],
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-6",
    name: "Corsair Vengeance LPX 16GB (1x16GB) DDR4 3200MHz RAM",
    nameHindi: "कॉर्सेयर 16GB हाई-स्पीड गेमिंग रैम",
    category: "component",
    brand: "Corsair",
    price: 3100,
    originalPrice: 4200,
    inStock: true,
    warranty: "10 Years Limited Warranty",
    features: ["Pure aluminum heat spreader", "XMP 2.0 support", "Low profile design"],
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-7",
    name: "Dell 24-inch (60.45 cm) Full HD IPS Monitor (S2421HN)",
    nameHindi: "डेल 24 इंच फुल एचडी आईपीएस मॉनिटर",
    category: "accessory",
    brand: "Dell",
    price: 9400,
    originalPrice: 12500,
    inStock: true,
    warranty: "3 Years Advanced Exchange Service",
    features: ["1920 x 1080 Full HD IPS Panel", "75Hz Refresh Rate with AMD FreeSync", "Dual HDMI ports"],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-8",
    name: "CP Plus 4 Channel Full HD CCTV Security Camera Kit",
    nameHindi: "सीपी प्लस 4 चैनल फुल एचडी सीसीटीवी कैमरा किट",
    category: "cctv",
    brand: "CP Plus",
    price: 9900,
    originalPrice: 13500,
    inStock: true,
    warranty: "2 Years Camera & DVR Warranty",
    features: ["2 Outdoor Bullet + 2 Indoor Dome cameras", "4 Channel DVR with mobile app viewing", "Night vision up to 20m"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-9",
    name: "APC Back-UPS 600VA / 360W 230V UPS with Battery Backup",
    nameHindi: "एपीसी 600VA कंप्यूटर यूपीएस",
    category: "accessory",
    brand: "APC Schneider",
    price: 3350,
    originalPrice: 4100,
    inStock: true,
    warranty: "2 Years Repair or Replace",
    features: ["Battery backup & surge protection", "Automatic Voltage Regulation (AVR)", "Generator compatible"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-10",
    name: "TP-Link Archer C6 AC1200 Dual Band Gigabit Wi-Fi Router",
    nameHindi: "टीपी-लिंक ड्यूल बैंड हाई-स्पीड वाई-फाई राउटर",
    category: "accessory",
    brand: "TP-Link",
    price: 2399,
    originalPrice: 3299,
    inStock: true,
    warranty: "3 Years Warranty",
    features: ["867 Mbps at 5GHz + 300 Mbps at 2.4GHz", "4 External antennas for wide coverage", "Gigabit WAN & LAN Ports"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-11",
    name: "Lenovo IdeaPad Slim 3 12th Gen Intel Core i3 (8GB/512GB SSD)",
    nameHindi: "लेनोवो आइडियापैड स्लिम 3 लैपटॉप",
    category: "laptop",
    brand: "Lenovo",
    price: 36500,
    originalPrice: 44000,
    inStock: true,
    warranty: "1 Year Onsite Warranty + Accidental Damage",
    features: ["Intel Core i3 1215U 6-Cores", "8GB DDR4 RAM + 512GB SSD", "15.6 FHD Anti-glare Display"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "prod-12",
    name: "Certified Refurbished Dell Latitude 7490 Core i5 8th Gen (8GB/256GB SSD)",
    nameHindi: "सर्टिफाइड रिफर्बिश्ड डेल लैटिट्यूड प्रीमियम लैपटॉप",
    category: "laptop",
    brand: "Dell",
    price: 18500,
    originalPrice: 28000,
    inStock: true,
    warranty: "6 Months Kashi Computer Replacement Warranty",
    features: ["Intel Core i5 8th Gen, 8GB RAM, 256GB SSD", "Full HD IPS Screen, Backlit Keyboard", "Excellent battery health & tested grade A+"],
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  }
];

export const PC_COMPONENTS: PCComponent[] = [
  // CPUs
  { id: "cpu-1", category: "cpu", brand: "Intel", name: "Intel Core i3 12100F (4 Cores / 8 Threads)", price: 6800, specs: "Base 3.3 GHz, Boost 4.3 GHz, LGA 1700, 12MB Cache", wattage: 65, socket: "LGA1700" },
  { id: "cpu-2", category: "cpu", brand: "Intel", name: "Intel Core i5 12400F (6 Cores / 12 Threads)", price: 10900, specs: "Base 2.5 GHz, Boost 4.4 GHz, LGA 1700, 18MB Cache", wattage: 65, socket: "LGA1700" },
  { id: "cpu-3", category: "cpu", brand: "Intel", name: "Intel Core i5 13400 (10 Cores / 16 Threads + UHD 730)", price: 18500, specs: "Integrated Graphics, Boost up to 4.6 GHz", wattage: 65, socket: "LGA1700" },
  { id: "cpu-4", category: "cpu", brand: "AMD", name: "AMD Ryzen 5 5600 (6 Cores / 12 Threads)", price: 11200, specs: "Base 3.5 GHz, Boost 4.4 GHz, AM4 Socket, 35MB Cache", wattage: 65, socket: "AM4" },
  { id: "cpu-5", category: "cpu", brand: "AMD", name: "AMD Ryzen 5 7600 (6 Cores / 12 Threads)", price: 18900, specs: "Base 3.8 GHz, Boost 5.1 GHz, AM5 Socket, DDR5 only", wattage: 65, socket: "AM5" },
  { id: "cpu-6", category: "cpu", brand: "Intel", name: "Intel Core i3 10105 (4 Cores with UHD 630 Graphics)", price: 6200, specs: "Budget champion with built-in display, LGA1200", wattage: 65, socket: "LGA1200" },

  // Motherboards
  { id: "mb-1", category: "motherboard", brand: "Gigabyte", name: "Gigabyte H610M H V2 DDR4", price: 6100, specs: "LGA 1700, PCIe 4.0, NVMe M.2, HDMI/VGA, USB 3.2", socket: "LGA1700", memoryType: "DDR4" },
  { id: "mb-2", category: "motherboard", brand: "MSI", name: "MSI PRO B760M-P DDR4", price: 9800, specs: "LGA 1700, 4x DDR4 slots, Dual M.2 PCIe 4.0, Steel Armor", socket: "LGA1700", memoryType: "DDR4" },
  { id: "mb-3", category: "motherboard", brand: "ASUS", name: "ASUS Prime B550M-K (AMD AM4)", price: 7900, specs: "AM4 Socket, PCIe 4.0 M.2, HDMI/DVI/D-Sub, Realtek Gb LAN", socket: "AM4", memoryType: "DDR4" },
  { id: "mb-4", category: "motherboard", brand: "MSI", name: "MSI PRO A620M-E (AMD AM5 DDR5)", price: 8400, specs: "AM5 Socket for 7000/8000 series, DDR5 6400MHz+ OC", socket: "AM5", memoryType: "DDR5" },
  { id: "mb-5", category: "motherboard", brand: "H61", name: "Frontech / Zebronics H61/H81 Budget Board", price: 2800, specs: "Legacy DDR3/LGA1155 entry level budget board", socket: "LGA1155", memoryType: "DDR4" },

  // RAM
  { id: "ram-1", category: "ram", brand: "Crucial", name: "Crucial 8GB DDR4 3200MHz Desktop RAM", price: 1650, specs: "CL22, 1.2V, Single stick, Lifetime warranty" },
  { id: "ram-2", category: "ram", brand: "Corsair", name: "Corsair Vengeance LPX 16GB (1x16GB) DDR4 3200MHz", price: 3100, specs: "Anodized aluminum heat spreader, XMP 2.0" },
  { id: "ram-3", category: "ram", brand: "G.Skill", name: "G.Skill Ripjaws V 32GB (2x16GB) DDR4 3600MHz Dual Kit", price: 6400, specs: "Dual channel kit for heavy 4K editing and gaming" },
  { id: "ram-4", category: "ram", brand: "Kingston", name: "Kingston Fury Beast 16GB (1x16GB) DDR5 5600MHz", price: 4600, specs: "Next-gen DDR5 speed with on-die ECC" },

  // Primary Storage (SSDs)
  { id: "ssd-1", category: "storage_primary", brand: "Crucial", name: "Crucial BX500 500GB SATA 2.5-inch SSD", price: 2850, specs: "SATA 6Gb/s, 540MB/s Read, High endurance" },
  { id: "ssd-2", category: "storage_primary", brand: "Western Digital", name: "WD Green SN350 500GB NVMe M.2 SSD", price: 3300, specs: "M.2 NVMe PCIe Gen3, up to 2,400 MB/s speed" },
  { id: "ssd-3", category: "storage_primary", brand: "Kingston", name: "Kingston NV2 1TB PCIe 4.0 NVMe M.2 SSD", price: 5200, specs: "Blazing fast 3,500 MB/s read speed, 1000GB" },
  { id: "ssd-4", category: "storage_primary", brand: "Samsung", name: "Samsung 980 1TB PCIe 3.0 NVMe M.2 SSD", price: 7400, specs: "DRAM-less architecture with Full Power Mode" },

  // Secondary Storage (Optional)
  { id: "hdd-none", category: "storage_secondary", brand: "None", name: "No Secondary Storage (Only Primary SSD)", price: 0, specs: "Zero extra cost" },
  { id: "hdd-1", category: "storage_secondary", brand: "Seagate", name: "Seagate BarraCuda 1TB 7200 RPM 3.5-inch Internal HDD", price: 3400, specs: "64MB Cache, ideal for storing heavy files & movies" },
  { id: "hdd-2", category: "storage_secondary", brand: "Western Digital", name: "WD Blue 2TB 7200 RPM 3.5-inch Internal HDD", price: 5200, specs: "High capacity storage for shop records, raw photos & videos" },

  // Graphics Cards (GPU)
  { id: "gpu-none", category: "gpu", brand: "Integrated", name: "Integrated Graphics (No Dedicated GPU)", price: 0, specs: "Included with CPU for office, billing, YouTube & online study", wattage: 0 },
  { id: "gpu-1", category: "gpu", brand: "ASUS", name: "ASUS GeForce GT 730 2GB GDDR5", price: 4300, specs: "Basic multi-display output for stocks and multi-monitor setup", wattage: 38 },
  { id: "gpu-2", category: "gpu", brand: "ZOTAC", name: "ZOTAC Gaming GeForce GTX 1650 4GB GDDR6", price: 11900, specs: "Runs GTA V, Valorant, CS2, Premier Pro 1080p smoothly", wattage: 75 },
  { id: "gpu-3", category: "gpu", brand: "ZOTAC", name: "ZOTAC Gaming GeForce RTX 3060 12GB GDDR6", price: 24800, specs: "Ray Tracing, DLSS, 12GB VRAM perfect for 3D & 4K editing", wattage: 170 },
  { id: "gpu-4", category: "gpu", brand: "Gigabyte", name: "Gigabyte GeForce RTX 4060 WINDFORCE OC 8GB", price: 28500, specs: "Ada Lovelace architecture, DLSS 3 frame generation", wattage: 115 },

  // Cabinets
  { id: "cab-1", category: "cabinet", brand: "Zebronics", name: "Zebronics Classic Micro-ATX Black Cabinet", price: 1150, specs: "Compact office cabinet, Front USB & Audio, Solid build" },
  { id: "cab-2", category: "cabinet", brand: "Ant Esports", name: "Ant Esports ICE-112 Mid-Tower RGB Gaming Cabinet", price: 2650, specs: "Transparent acrylic side panel, 4 Rainbow LED fans included" },
  { id: "cab-3", category: "cabinet", brand: "Circle", name: "Circle Gaming Elegant Tempered Glass ARGB Cabinet", price: 3850, specs: "Tempered glass, Mesh front for maximum airflow, ARGB hub" },

  // Power Supplies (SMPS)
  { id: "psu-1", category: "psu", brand: "Frontech", name: "Frontech 450W Standard Desktop SMPS", price: 750, specs: "Reliable power for basic office & study PCs", wattage: 450 },
  { id: "psu-2", category: "psu", brand: "Ant Esports", name: "Ant Esports VS450L 450W Gaming Power Supply", price: 1650, specs: "Continuous power, 120mm silent fan, black flat cables", wattage: 450 },
  { id: "psu-3", category: "psu", brand: "DeepCool", name: "DeepCool PK550D 550W 80 PLUS Bronze Certified SMPS", price: 3400, specs: "80 Plus Bronze efficiency, 5 years warranty, GPU ready", wattage: 550 },
  { id: "psu-4", category: "psu", brand: "Corsair", name: "Corsair CV650 650W 80 PLUS Bronze Power Supply", price: 4700, specs: "Clean DC-DC power for mid-to-high tier gaming GPUs", wattage: 650 },

  // Monitors
  { id: "mon-none", category: "monitor", brand: "None", name: "No Monitor (I already have a display)", price: 0, specs: "Skip monitor" },
  { id: "mon-1", category: "monitor", brand: "Frontech", name: "Frontech 19-inch LED Monitor (HDMI/VGA)", price: 3600, specs: "HD display, compact for shop billing counter" },
  { id: "mon-2", category: "monitor", brand: "Acer", name: "Acer EK220Q 21.5-inch Full HD 100Hz Frameless Monitor", price: 5800, specs: "1920x1080, 100Hz refresh rate, AMD FreeSync, Eye care" },
  { id: "mon-3", category: "monitor", brand: "Dell", name: "Dell 24-inch S2421HN Full HD IPS Display", price: 9400, specs: "Crisp IPS panel, 75Hz, Dual HDMI, Ultra-thin bezel" },

  // Peripherals / Combos
  { id: "acc-none", category: "accessories", brand: "None", name: "None (Just the PC tower)", price: 0, specs: "Peripherals not required" },
  { id: "acc-1", category: "accessories", brand: "Zebronics", name: "Zebronics USB Keyboard + Optical Mouse Combo", price: 450, specs: "Durable silent keys, 1000 DPI mouse" },
  { id: "acc-2", category: "accessories", brand: "Logitech", name: "Logitech MK215 Wireless Keyboard & Mouse Combo", price: 1350, specs: "Compact wireless setup with long battery life" },
  { id: "acc-3", category: "accessories", brand: "Ant Esports", name: "Ant Esports KM500W RGB Gaming Combo + Mousepad", price: 1450, specs: "Backlit RGB keys, 3200 DPI gaming mouse with weights" },
  { id: "acc-4", category: "accessories", brand: "APC", name: "APC 600VA Line-Interactive UPS with Battery", price: 3350, specs: "Protects against sudden UP power cuts, saves data" },
];

export const PC_PRESETS: PCPreset[] = [
  {
    id: "preset-student",
    title: "Student & Online Study PC",
    titleHindi: "छात्र एवं ऑनलाइन पढ़ाई पीसी",
    tag: "Budget Champion",
    tagHindi: "सबसे किफायती",
    description: "Perfect for school, college online classes, coding, MS Office, YouTube tutorials, and general browsing.",
    targetPrice: 19850,
    components: {
      cpu: "cpu-6", // i3 10105
      motherboard: "mb-5", // Budget board
      ram: "ram-1", // 8GB DDR4
      storage_primary: "ssd-1", // 500GB SSD
      cabinet: "cab-1",
      psu: "psu-1",
      monitor: "mon-1", // 19 inch
      accessories: "acc-1"
    }
  },
  {
    id: "preset-office",
    title: "Business & Tally Shop Billing PC",
    titleHindi: "दुकान बिलिंग, टैली एवं ऑफिस पीसी",
    tag: "Workhorse",
    tagHindi: "दुकानों व ऑफिस हेतु बेस्ट",
    description: "Built for speed and zero lag in Tally Prime, Marg, GST billing, multi-tab browsing, and high-volume printing.",
    targetPrice: 28900,
    components: {
      cpu: "cpu-1", // i3 12100F / i3
      motherboard: "mb-1", // H610
      ram: "ram-2", // 16GB DDR4
      storage_primary: "ssd-2", // 500GB NVMe
      gpu: "gpu-none",
      cabinet: "cab-1",
      psu: "psu-2",
      monitor: "mon-2", // 21.5 inch Acer
      accessories: "acc-2"
    }
  },
  {
    id: "preset-creator",
    title: "Video Editing & Content Creator PC",
    titleHindi: "वीडियो एडिटिंग एवं ग्राफिक डिज़ाइन पीसी",
    tag: "Creator Special",
    tagHindi: "यूट्यूब व 4K एडिटिंग",
    description: "Effortlessly handle Adobe Premiere Pro, Photoshop, CorelDraw, 4K rendering, and multi-tasking.",
    targetPrice: 56900,
    components: {
      cpu: "cpu-2", // i5 12400F
      motherboard: "mb-2", // B760
      ram: "ram-2", // 16GB
      storage_primary: "ssd-3", // 1TB NVMe
      storage_secondary: "hdd-1", // 1TB HDD
      gpu: "gpu-2", // GTX 1650 4GB
      cabinet: "cab-2", // RGB
      psu: "psu-3", // 550W Bronze
      monitor: "mon-3", // Dell 24 IPS
      accessories: "acc-2"
    }
  },
  {
    id: "preset-gaming",
    title: "High Performance Gaming Rig",
    titleHindi: "अल्ट्रा हाई गेमिंग बीस्ट",
    tag: "Pure Power",
    tagHindi: "फुल एफपीएस गेमिंग",
    description: "Max out FPS in GTA V, Cyberpunk, Valorant, Call of Duty, and AAA games with RTX Ray Tracing and DLSS.",
    targetPrice: 83500,
    components: {
      cpu: "cpu-4", // Ryzen 5 5600
      motherboard: "mb-3", // B550M
      ram: "ram-3", // 32GB Kit
      storage_primary: "ssd-3", // 1TB NVMe
      gpu: "gpu-3", // RTX 3060 12GB
      cabinet: "cab-3", // ARGB
      psu: "psu-4", // 650W CV650
      monitor: "mon-3", // Dell 24
      accessories: "acc-3"
    }
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Laptop Screen & Hinge Replacement",
    titleHindi: "लैपटॉप स्क्रीन एवं हिंज रिपेयर",
    category: "Hardware Repair",
    description: "Cracked or dead screen? Broken body corner? We replace broken LCD/LED panels with genuine brand displays and repair broken chassis hinges using precision steel-reinforcement.",
    descriptionHindi: "टूटी हुई स्क्रीन, झिलमिलाहट या टूटा हुआ बॉडी हिंज ठीक कराएं। ओरिजिनल पैनल और सटीक फैब्रिकेशन।",
    turnaround: "Same Day or 24 Hours",
    startingPrice: 1200,
    iconName: "Monitor",
    warranty: "3 to 6 Months Warranty"
  },
  {
    id: "srv-2",
    title: "Motherboard Chip-Level Repair",
    titleHindi: "मदरबोर्ड चिप-लेवल रिपेयर",
    category: "Chip Level",
    description: "Laptop not powering on, water/liquid spill damage, short-circuit, or charging IC fault? Our certified technicians perform micro-soldering, capacitor replacement, and BGA re-balling.",
    descriptionHindi: "लैपटॉप ऑन न होना, पानी गिरना, शार्ट-सर्किट या चार्जिंग न लेने की समस्या का चिप-लेवल समाधान।",
    turnaround: "24 – 48 Hours",
    startingPrice: 1500,
    iconName: "Cpu",
    warranty: "90 Days Warranty"
  },
  {
    id: "srv-3",
    title: "SSD Speed Boost & Cloning",
    titleHindi: "एसएसडी अपग्रेड एवं 10x स्पीड बूस्ट",
    category: "Upgrade",
    description: "Make your 5-year-old slow laptop or desktop 10x faster than new! We install superfast SSD and clone all your Windows, software, and files without any data loss.",
    descriptionHindi: "धीमे कंप्यूटर को बनाएं सुपरफास्ट। बिना किसी डेटा नुकसान के पुरानी हार्ड डिस्क से नया एसएसडी क्लोनिंग।",
    turnaround: "1 to 2 Hours",
    startingPrice: 1850,
    iconName: "Zap",
    warranty: "3 Years SSD Warranty"
  },
  {
    id: "srv-4",
    title: "Printer Repair & Cartridge Refill",
    titleHindi: "प्रिंटर रिपेयर एवं टोनर कार्ट्रिज रिफिल",
    category: "Printer",
    description: "Paper jam issue, roller wear, faded printing, printer head clogging, error codes on HP LaserJet, Epson, Canon. High-yield dark black toner refilling on the spot.",
    descriptionHindi: "पेपर जाम, प्रिंटर रोलर बदलना, हेड सफाई और लेज़र टोनर रिफिलिंग हाथ के हाथ।",
    turnaround: "30 Mins to 3 Hours",
    startingPrice: 350,
    iconName: "Printer",
    warranty: "Guaranteed Print Clarity"
  },
  {
    id: "srv-5",
    title: "Data Recovery (HDD / SSD / Pen Drive)",
    titleHindi: "डेटा रिकवरी (डिलीट या करप्ट डेटा)",
    category: "Recovery",
    description: "Accidental format, deleted family photos, corrupted partition, clicking hard drive, unreadable SD card or pen drive? Professional deep raw recovery services.",
    descriptionHindi: "गलती से डिलीट या करप्ट हुई जरूरी फाइलें, फोटो, बिलिंग डेटा सुरक्षित रिकवर करवाएं।",
    turnaround: "24 – 72 Hours",
    startingPrice: 800,
    iconName: "HardDrive",
    warranty: "No Data = Minimal Diagnostic Fee"
  },
  {
    id: "srv-6",
    title: "CCTV Camera Installation & DVR Setup",
    titleHindi: "सीसीटीवी कैमरा इंस्टालेशन एवं सेटअप",
    category: "Security",
    description: "Complete security surveillance for shops, godowns, schools, and homes in Raebareli. Night vision cameras, wiring, mobile live viewing setup on Android & iPhone.",
    descriptionHindi: "दुकान, घर, गोदाम के लिए सीसीटीवी कैमरा इंस्टॉलेशन और मोबाइल पर लाइव देखने की सुविधा।",
    turnaround: "Same Day Site Visit",
    startingPrice: 2500,
    iconName: "ShieldCheck",
    warranty: "1 Year Free Service Support"
  }
];

export const CSC_SERVICES: CSCService[] = [
  {
    id: "csc-1",
    title: "UP Police, SSC & Govt Job Online Forms",
    titleHindi: "सरकारी नौकरी ऑनलाइन फॉर्म (UP Police, SSC, Railway)",
    department: "Employment & Recruitment",
    fee: "₹70 – ₹100 per form",
    turnaround: "Instant (15 mins)",
    requiredDocuments: ["Aadhaar Card", "High School & Inter Marksheet", "Passport Photo & Signature", "Caste / Domicile Certificate (if applicable)"],
    description: "Error-free online application submission with verified photo-signature dimensions, payment receipts, and printouts."
  },
  {
    id: "csc-2",
    title: "PAN Card New & Correction",
    titleHindi: "नया पैन कार्ड एवं संशोधन",
    department: "Income Tax Dept / NSDL",
    fee: "₹150 (Govt fees extra)",
    turnaround: "e-PAN in 48 hrs / Physical card in 10-15 days",
    requiredDocuments: ["Aadhaar Card with mobile linked", "2 Passport Size Photos"],
    description: "Apply for a fresh instant e-PAN or correct name, father's name, DOB, or photo mismatch on old PAN."
  },
  {
    id: "csc-3",
    title: "Aadhaar Smart PVC Card Printing",
    titleHindi: "आधार स्मार्ट पीवीसी कार्ड प्रिंटिंग",
    department: "UIDAI",
    fee: "₹50 only",
    turnaround: "Ready in 5 Minutes",
    requiredDocuments: ["Aadhaar Number or Registered OTP / e-Aadhaar PDF"],
    description: "Waterproof, durable, high-definition plastic PVC smart card with QR code, same size as ATM card."
  },
  {
    id: "csc-4",
    title: "Income, Caste & Domicile Certificates (आय/जाति/निवास)",
    titleHindi: "आय, जाति, निवास प्रमाण पत्र",
    department: "UP eDistrict Portal",
    fee: "₹80 – ₹120",
    turnaround: "5 to 7 Working Days",
    requiredDocuments: ["Aadhaar Card", "Ration Card or Parivar Register Nakal", "Self-declaration form / Swapr प्रमाणित घोषणा पत्र"],
    description: "Legally verified digital certificates approved by Tehsildar / Lekhpal for scholarships and govt schemes."
  },
  {
    id: "csc-5",
    title: "Urgent Passport Size Photos (Instant 5 Mins)",
    titleHindi: "अर्जेंट पासपोर्ट साइज फोटो (तुरंत 5 मिनट में)",
    department: "Studio & Print",
    fee: "₹50 for 8 photos",
    turnaround: "5 Minutes",
    requiredDocuments: ["Walk-in to Shukla Complex shop"],
    description: "High-resolution glossy photo prints with white or blue background, custom-sized for all job and exam forms."
  },
  {
    id: "csc-6",
    title: "Electricity, Water & Municipal Bill Payment",
    titleHindi: "बिजली बिल भुगतान एवं रसीद",
    department: "UPPCL / Madhyanchal",
    fee: "Nil / Nominal ₹10",
    turnaround: "Instant receipt",
    requiredDocuments: ["10-digit Account Number / Consumer ID"],
    description: "Instant bill payment with authentic computerized stamped receipt to avoid late penalties."
  }
];

export const TESTIMONIALS = [
  {
    name: "Dr. Alok Srivastava",
    area: "Civil Lines, Raebareli",
    comment: "My clinic desktop stopped displaying in the morning with patients waiting. Kashi Computer at Shukla Complex diagnosed the RAM slot issue and delivered it back in 3 hours. Genuine pricing!",
    rating: 5,
    tag: "Desktop Repair"
  },
  {
    name: "Sunil Tripathi",
    area: "Supermarket, Raebareli",
    comment: "Got an editing PC built with RTX 3060 for our photography studio. Sandeep ji explained every component transparently and gave the best wholesale rate in Raebareli.",
    rating: 5,
    tag: "Custom PC Build"
  },
  {
    name: "Praveen Yadav",
    area: "Rajghat, Raebareli",
    comment: "Always visit Kashi Computer for government online forms and PVC card printing. No queue mistakes and very polite behavior.",
    rating: 5,
    tag: "CSC Services"
  }
];
