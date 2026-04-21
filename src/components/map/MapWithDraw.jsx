import React from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import MapDrawControl from "./MapDrawControl";
import DrawingToolbar from "./DrawingToolbar";
import { useMapDraw } from "@/hooks/useMapDraw";
import { DRAW_STYLES } from "@/constants/drawStyles";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapWithDraw() {
  const mapRef = React.useRef(null);
  const [drawMode, setDrawMode] = React.useState("simple_select");

  const {
    selectedIds,
    setDrawInstance,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSelectionChange,
    changeMode,
    deleteSelected
  } = useMapDraw({
    resetMode: () => setDrawMode('')
  });

  const handleDrawModeChange = (mode) => {
    setDrawMode(mode);
    changeMode(mode);
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Mapbox token missing
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Add <code>VITE_MAPBOX_TOKEN</code> to your .env file to enable the map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col font-['Gantari',sans-serif]">
      <main className="relative flex-1 bg-gray-100">
        <Map
          ref={mapRef}
          reuseMaps
          initialViewState={{
            latitude: 31.5113,
            longitude: -98.3372,
            zoom: 10,
          }}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <NavigationControl position="bottom-right" />

          <MapDrawControl
            position="top-left"
            onInstanceCreated={setDrawInstance}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onSelectionChange={handleSelectionChange}
            displayControlsDefault={false}
            controls={{}}
            styles={DRAW_STYLES}
          />
        </Map>

        <DrawingToolbar
          onModeChange={handleDrawModeChange}
          activeMode={drawMode}
          onDelete={deleteSelected}
          selectedCount={selectedIds.length}
          selectedIds={selectedIds}
        />
      </main>
    </div>
  );
}
