import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Phone,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS_CATALOG, SHOP_DETAILS, createWhatsAppUrl } from '../data/shopData';

interface ProductCatalogProps {
  lang: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  const categories = [
    { id: 'all', labelEn: 'All Products', labelHi: 'सभी सामान' },
    { id: 'laptop', labelEn: 'Laptops', labelHi: 'लैपटॉप' },
    { id: 'storage', labelEn: 'SSDs & Storage', labelHi: 'एसएसडी व स्टोरेज' },
    { id: 'printer', labelEn: 'Printers & Inks', labelHi: 'प्रिंटर व इंक' },
    { id: 'accessory', labelEn: 'Keyboards & Displays', labelHi: 'कीबोर्ड व मॉनिटर' },
    { id: 'cctv', labelEn: 'CCTV & Security', labelHi: 'सीसीटीवी कैमरा' },
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.nameHindi && prod.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = prod.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>In-Store Stock & Fast Delivery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'कंप्यूटर पार्ट्स एवं हार्डवेयर स्टोर' : 'Hardware, Laptops & Accessories Catalog'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'शुक्ला कॉम्प्लेक्स, राजघाट दुकान पर उपलब्ध ओरिजिनल पार्ट्स। तुरंत व्हाट्सएप पर रेट और उपलब्धता कन्फर्म करें।'
            : 'Genuine laptops, NVMe SSDs, LaserJet printers, and CCTV systems available at our Shukla Complex counter.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'प्रोडक्ट या ब्रांड खोजें (उदा. SSD, Dell, HP)...' : 'Search product or brand (e.g. SSD, Crucial, HP)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lang === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const discountPct = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          const whatsappMessage = `Namaste Kashi Computer, I am interested in purchasing *${product.name}* priced at ₹${product.price.toLocaleString('en-IN')}. Is this in stock at Shukla Complex, Rajghat shop?`;

          return (
            <div
              key={product.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all group shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discountPct > 0 && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
                      {discountPct}% OFF
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded shadow">
                      Popular
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold uppercase tracking-wider text-indigo-400">{product.brand}</span>
                    <span className="text-emerald-400 font-medium">In Stock</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
                    {lang === 'hi' && product.nameHindi ? product.nameHindi : product.name}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-1 text-xs text-slate-400 pt-1">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action Bottom */}
              <div className="p-4 pt-2 border-t border-slate-800/80 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {product.warranty}
                  </span>
                </div>

                <a
                  href={createWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Inquire on WhatsApp'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 max-w-lg mx-auto space-y-3">
          <p className="text-slate-300 font-medium text-sm">
            No products matched your search.
          </p>
          <p className="text-xs text-slate-500">
            Looking for something specific? Contact Kashi Computer directly.
          </p>
          <a
            href={createWhatsAppUrl(`Namaste Sandeep ji, I am looking for a computer product not listed on the website: ${searchQuery}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask for Custom Stock on WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
};
