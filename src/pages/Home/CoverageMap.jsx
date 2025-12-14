import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CoverageMap = () => {
  const position = [23.8041, 90.4152];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2">
          <h2 className="md:text-4xl text-2xl text-center font-bold mb-6">
            Service Coverage Area
          </h2>
          <p className="text-primary-content/60 mb-4">
            We currently provide our premium decoration services across Dhaka
            City and surrounding areas. Check the map to see if your venue falls
            within our free delivery zone.
          </p>
          <ul className="list-disc list-inside space-y-2 text-primary-content/60">
            <li>Gulshan & Banani</li>
            <li>Dhanmondi & Mohammadpur</li>
            <li>Uttara Model Town</li>
            <li>Bashundhara R/A</li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={position}
            zoom={11}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                StyleDecor HQ <br /> We operate from here.
              </Popup>
            </Marker>

            <Circle
              center={position}
              pathOptions={{ fillColor: "blue", color: "blue" }}
              radius={12000}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;
