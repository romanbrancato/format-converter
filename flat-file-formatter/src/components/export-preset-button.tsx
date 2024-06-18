import React, { useContext } from "react";
import { PresetContext } from "@/context/preset-context";
import { download } from "@/lib/utils";

interface ExportPresetButtonProps {
  trigger: React.ReactNode;
}

export function ExportPresetButton({ trigger }: ExportPresetButtonProps) {
  const { preset } = useContext(PresetContext);
  const exportPreset = () => {
    const dataStr = JSON.stringify(preset, null, 2);
    download(dataStr, preset.name || "preset", "json");
  };

  return React.cloneElement(
    React.Children.only(trigger as React.ReactElement),
    { onClick: exportPreset },
  );
}
