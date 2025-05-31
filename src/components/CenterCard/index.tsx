import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Button } from "../ui/button.tsx";
import { Pause, RotateCcw } from "lucide-react";

const CenterCard = () => {
    return (
        <Card className="backdrop-blur-lg bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-7xl font-mono text-zinc-800 dark:text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-300">
                    25:00
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    当前任务：<span className="font-medium">任务名称</span>
                </p>

                <div className="flex gap-4">
                    <Button className="px-6 py-2 rounded-xl text-lg shadow-md hover:shadow-lg transition">
                        <Pause className="w-4 h-4 mr-2" />
                        开始
                    </Button>
                    <Button
                        variant="outline"
                        className="px-6 py-2 rounded-xl text-lg shadow-md hover:shadow-lg transition"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        重置
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CenterCard;
