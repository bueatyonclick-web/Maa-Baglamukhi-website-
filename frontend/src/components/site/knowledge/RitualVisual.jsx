import React, { memo } from "react";
import SamohanSpiralVisual from "./ritual-visuals/SamohanSpiralVisual";
import StambhanShaktiVisual from "./ritual-visuals/StambhanShaktiVisual";
import MantraDhyanaVisual from "./ritual-visuals/MantraDhyanaVisual";

const MAP = {
  samohan: SamohanSpiralVisual,
  stambhan: StambhanShaktiVisual,
  dhyana: MantraDhyanaVisual,
};

function RitualVisual({ type }) {
  const Comp = MAP[type] || StambhanShaktiVisual;
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-black/40 p-4 shadow-[inset_0_1px_0_rgba(255,246,229,0.06),0_0_48px_rgba(245,158,11,0.08)] backdrop-blur-md sm:p-6">
      <Comp />
    </div>
  );
}

export default memo(RitualVisual);
