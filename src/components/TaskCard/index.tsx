import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Icon } from "@iconify/react";

const tasksData = [
    {
        id: 1,
        title: "写项目文档",
        totalPomodoros: 4,
        completedPomodoros: 1,
        status: "pending",
    },
    {
        id: 2,
        title: "设计UI界面",
        totalPomodoros: 3,
        completedPomodoros: 0,
        status: "pending",
    },
    {
        id: 3,
        title: "代码重构",
        totalPomodoros: 2,
        completedPomodoros: 2,
        status: "done",
    },
];

export default function PomodoroTaskCards() {
    const [tasks] = useState(tasksData);

    const firstPendingIndex = tasks.findIndex((t) => t.status !== "done");

    return (
        <div className="max-w-md mx-auto mt-8 space-y-4">
            {tasks.map(({ id, title, totalPomodoros, completedPomodoros, status }, index) => {
                const isDone = status === "done";
                const isActive = index === firstPendingIndex && !isDone;

                return (
                    <Card
                        key={id}
                        className={`bg-white/70 backdrop-blur-lg border border-gray-200 
                ${isDone ? "opacity-60" : ""}
                ${isActive ? "ring-2 ring-red-500" : ""}
                p-2
                rounded-2xl
                shadow-sm
                `}
                    >
                        <CardHeader className="py-1 px-2">
                            <CardTitle className={`text-sm ${isDone ? "line-through text-gray-500" : ""}`}>
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between py-1 px-2">
                            {isDone ? (
                                <Badge variant="outline" className="text-gray-500 text-xs">
                                    完成
                                </Badge>
                            ) : (
                                <div className="flex space-x-1">
                                    {[...Array(totalPomodoros)].map((_, i) => (
                                        <Icon
                                            key={i}
                                            icon="fluent-emoji:tomato"
                                            width="16"
                                            className={i < completedPomodoros ? "opacity-100" : "opacity-30"}
                                        />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
