import { useState } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons for Leaflet + bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PHARMACIES = [
  { id: 1, name: "Jan Aushadhi Kendra - Kukatpally", address: "Plot 42, KPHB Colony, Kukatpally", distance: "0.8 km", open: true, janAushadhi: true },
  { id: 2, name: "Apollo Pharmacy", address: "Miyapur X Roads, Hyderabad", distance: "1.2 km", open: true, janAushadhi: false },
  { id: 3, name: "Jan Aushadhi - Gachibowli", address: "DLF Cyber City, Gachibowli", distance: "1.5 km", open: true, janAushadhi: true },
  { id: 4, name: "MedPlus Pharmacy", address: "Madhapur Main Road", distance: "1.8 km", open: false, janAushadhi: false },
  { id: 5, name: "NetMeds Store", address: "Kondapur Circle", distance: "2.1 km", open: true, janAushadhi: false },
];

export default function NearMe() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"pharmacy" | "restaurant">("pharmacy");
  const [searchQuery, setSearchQuery] = useState("");
  const [symptom, setSymptom] = useState("");
  const [symptomResult, setSymptomResult] = useState<null | {
    medicine: string; branded: number; generic: number; janAushadhi: boolean; warning: string;
  }>(null);
  const [searching, setSearching] = useState(false);

  const filteredPharmacies = PHARMACIES.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkSymptom = () => {
    if (!symptom.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSymptomResult({
        medicine: "Ibuprofen 200mg",
        branded: 45,
        generic: 8,
        janAushadhi: true,
        warning: "Take after food. Avoid if kidney issues present.",
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search symptom or medicine..."
          className="w-full bg-card border border-border rounded-3xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        {[
          { key: "pharmacy" as const, label: "🏥 Pharmacies" },
          { key: "restaurant" as const, label: "🍽️ Restaurants" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all
              ${activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-primary text-primary"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="bg-card border border-border rounded-lg h-[300px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="text-center z-10">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Google Maps Integration</p>
          <p className="text-xs text-muted-foreground mt-1">Centered on Hyderabad (17.3850, 78.4867)</p>
          <p className="text-xs text-muted-foreground">Connect API key to enable live map</p>
        </div>
      </div>

      {/* Pharmacy list */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Nearby {activeTab === "pharmacy" ? "Pharmacies" : "Restaurants"}</h3>
        {filteredPharmacies.map(p => (
          <div key={p.id} className={`bg-card border rounded-lg p-5 shadow-sm flex items-center justify-between gap-4 ${p.janAushadhi ? "border-healix-button" : "border-border"}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${p.janAushadhi ? "bg-healix-button/10" : "bg-card"} border border-border`}>
                <MapPin className={`w-5 h-5 ${p.janAushadhi ? "text-healix-button" : "text-primary"}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground">{p.name}</p>
                  {p.janAushadhi && (
                    <span className="bg-healix-button text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">SAVE 80%</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{p.address}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{p.distance}</span>
                  <span className={`text-xs font-bold ${p.open ? "text-healix-button" : "text-destructive"}`}>
                    {p.open ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 whitespace-nowrap">
              <Navigation className="w-3 h-3" /> Directions
            </button>
          </div>
        ))}
      </div>

      {/* Symptom checker */}
      <div className="bg-background border border-border rounded-lg p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          🔍 Symptom to Medicine
        </h3>
        <textarea
          value={symptom}
          onChange={e => setSymptom(e.target.value)}
          placeholder="Describe your symptom..."
          rows={3}
          className="w-full bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
        <button
          onClick={checkSymptom}
          disabled={searching}
          className="bg-healix-button text-primary-foreground font-bold px-6 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {searching ? "Checking..." : "Get Suggestion"}
        </button>

        {symptomResult && (
          <div className="bg-card border border-border rounded-lg p-5 space-y-3 mt-4">
            <p className="font-bold text-foreground text-lg">{symptomResult.medicine}</p>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Branded</p>
                <p className="font-bold text-destructive">₹{symptomResult.branded}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Jan Aushadhi</p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-healix-button">₹{symptomResult.generic}</p>
                  <span className="bg-healix-button text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">SAVE 80%</span>
                </div>
              </div>
            </div>
            {symptomResult.warning && (
              <p className="text-xs bg-amber-50 text-amber-700 p-2 rounded-lg border border-amber-200">
                ⚠️ {symptomResult.warning}
              </p>
            )}
            <button className="bg-healix-button text-primary-foreground font-bold px-4 py-2 rounded-lg text-sm">
              Find Jan Aushadhi Near Me
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
