import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SymbolSelector } from "@/components/symbol-selector";
import { DefineWidthsButton } from "@/components/define-widths-button";
import { DataContext } from "@/context/data-context";
import { useContext, useEffect, useState } from "react";
import { PresetContext } from "@/context/preset-context";
import { PadPositionRadio } from "@/components/pad-position-radio";

export function ExportOptions() {
  const { data } = useContext(DataContext);
  const { preset, setExport } = useContext(PresetContext);
  const [tab, setTab] = useState<"csv" | "txt">(preset.export);

  useEffect(() => {
    setTab(preset.export);
  }, [preset.export]);

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setExport(value)}
      className="mb-5 md:w-[175px]"
    >
      <div className="text-sm font-medium space-y-1">
        <span> Export As </span>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="csv" disabled={data.length === 0}>
            .csv
          </TabsTrigger>
          <TabsTrigger value="txt" disabled={data.length === 0}>
            .txt
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="csv">
        <div className="text-sm font-medium space-y-1">
          <span>Delimiter</span>
          <SymbolSelector />
        </div>
      </TabsContent>
      <TabsContent value="txt" className="space-y-2">
        <div className="text-sm font-medium space-y-1">
          <span>Widths</span>
          <DefineWidthsButton />
        </div>
        <div className="text-sm font-medium space-y-1">
          <span>Padding Symbol</span>
          <SymbolSelector />
        </div>
        <div className="text-sm font-medium space-y-1">
          <span>Pad Position</span>
          <PadPositionRadio />
        </div>
      </TabsContent>
    </Tabs>
  );
}
