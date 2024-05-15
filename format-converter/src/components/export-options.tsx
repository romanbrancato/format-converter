import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DelimiterSelector} from "@/components/delimiter-selector";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Pencil2Icon, Share2Icon} from "@radix-ui/react-icons";
import * as React from "react";

export function ExportOptions() {
    return (
        <div className="flex flex-col">
            <Tabs defaultValue="csv" className="md:mb-5">
                <div className="text-sm font-medium space-y-1 mb-3">
                    <span> Export As </span>
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="csv">
                            .csv
                        </TabsTrigger>
                        <TabsTrigger value="txt">
                            .txt
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="csv">
                    <div className="text-sm font-medium space-y-1">
                        <span>Delimiter</span>
                        <DelimiterSelector/>
                    </div>
                </TabsContent>
                <TabsContent value="txt" className="space-y-2">
                    <div className="text-sm font-medium space-y-1">
                        <span>Configure</span>
                        <Dialog>
                            <DialogTrigger className="w-full">
                                <Button variant="outline" size="sm" className="w-full border-dashed mb-2">
                                    <Pencil2Icon className="mr-2"/>
                                    Define Widths
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[800px]">
                                <DialogHeader>
                                    <DialogTitle>Define Widths</DialogTitle>
                                    <DialogDescription>
                                        Define the widths of each column in characters.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="text-sm font-medium space-y-1">
                        <span>Padding Symbol</span>
                        <DelimiterSelector/>
                    </div>
                </TabsContent>
            </Tabs>
            <Button className="mt-5 md:mt-auto">
                <Share2Icon className="mr-2"/>
                Export File
            </Button>
        </div>
    )
}