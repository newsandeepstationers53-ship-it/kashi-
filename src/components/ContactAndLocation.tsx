import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Navigation, 
  ExternalLink, 
  Star,
  CheckCircle2,
  Building,
  ShieldCheck
} from 'lucide-react';
import { SHOP_DETAILS, TESTIMONIALS, createWhatsAppUrl } from '../data/shopData';
import { Language } from '../types';

interface ContactAndLocationProps {
  lang: Language;
}

export const ContactAndLocation: React.FC<ContactAndLocationProps> = ({ lang }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Kashi Computer Shukla Complex Rajghat Raebareli")}`;

  return (
    <div className="py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>Shukla Complex, Rajghat, Raebareli</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {lang === 'hi' ? 'दुकान का पता एवं संपर्क सूत्र' : 'Store Location & Contact Information'}
        </h2>
        <p className="text-sm text-slate-400">
          {lang === 'hi'
            ? 'शुक्ला कॉम्प्लेक्स, राजघाट, रायबरेली पर पधारें या सीधे कॉल व व्हाट्सएप करें।'
            : 'Visit our flagship computer workshop and digital service counter in the heart of Raebareli.'}
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Address */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'hi' ? 'दुकान का पता' : 'Physical Address'}
            </h3>
            <p className="text-sm text-slate-300 font-medium">
              {SHOP_DETAILS.name} ({lang === 'hi' ? SHOP_DETAILS.nameHindi : 'Kashi Computer'})
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {SHOP_DETAILS.address}, {SHOP_DETAILS.landmark}<br />
              {SHOP_DETAILS.city}, {SHOP_DETAILS.state} - {SHOP_DETAILS.pincode}
            </p>
          </div>
          <div className="pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Google Maps Directions</span>
            </a>
          </div>
        </div>

        {/* Card 2: Phone & WhatsApp */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'hi' ? 'फोन व व्हाट्सएप' : 'Direct Helpline'}
            </h3>
            <p className="text-sm text-slate-300 font-semibold">
              {SHOP_DETAILS.phoneFormatted}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Instant response for laptop repair inquiries, PC quotes, and home visits.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <a
              href={`tel:${SHOP_DETAILS.phone}`}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              <span>Call Now</span>
            </a>
            <a
              href={createWhatsAppUrl("Namaste Sandeep ji (Kashi Computer), I am reaching out through your official website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Card 3: Timings & Email */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'hi' ? 'दुकान खुलने का समय' : 'Business Hours'}
            </h3>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Monday – Saturday:</span>
                <span className="font-semibold text-slate-200">{SHOP_DETAILS.hours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sunday:</span>
                <span className="font-semibold text-emerald-400">{SHOP_DETAILS.hours.sunday}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 truncate">
              Email: {SHOP_DETAILS.email}
            </p>
          </div>
        </div>
      </div>

      {/* Map & Landmark Directions */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'रायबरेली में कैसे पहुंचें?' : 'How to reach Kashi Computer'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'hi'
              ? 'राजघाट चौराहे के समीप स्थित शुक्ला कॉम्प्लेक्स में हमारी दुकान भूतल पर आसानी से पहचानी जा सकती है।'
              : 'Our store is conveniently situated on the ground floor of Shukla Complex, right next to the Rajghat intersection in Raebareli.'}
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">From Raebareli Junction Railway Station:</span>
              <span className="font-semibold text-slate-200">~2.5 km (10 mins via Auto)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">From Supermarket / Ghanta Ghar:</span>
              <span className="font-semibold text-slate-200">~1.5 km (Straight Road)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">From Degree College / ITI:</span>
              <span className="font-semibold text-slate-200">~3.2 km</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Google Maps Navigation</span>
            </a>
          </div>
        </div>

        {/* Embedded Visual Map Card */}
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950 aspect-[16/9]">
          <iframe
            title="Kashi Computer Location Map"
            src="https://maps.google.com/maps?q=Shukla+Complex+Rajghat+Raebareli+Uttar+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-125"
            loading="lazy"
          />
          <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Kashi Computer · Shukla Complex, Rajghat</span>
          </div>
        </div>
      </div>

      {/* Local Customer Testimonials */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">
            {lang === 'hi' ? 'रायबरेली के स्थानीय ग्राहकों का भरोसा' : 'Trusted by Raebareli Locals'}
          </h3>
          <p className="text-xs text-slate-400">
            Real feedback from advocates, clinic doctors, students, and shop owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900">
                  {t.tag}
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">"{t.comment}"</p>
              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="text-[11px] text-slate-400">{t.area}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
