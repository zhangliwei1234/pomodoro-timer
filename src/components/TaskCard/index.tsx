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
    const [tasks, setTasks] = useState(tasksData);

    const handleDelete = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const firstPendingIndex = tasks.findIndex((t) => t.status !== "done");

    return (
        <div className="max-w-md mx-auto mt-6 space-y-5">
            {tasks.length === 0 ? (
                <div className="text-center text-zinc-400 dark:text-zinc-500 py-10 text-sm">
                    <Icon icon="fluent-emoji:tomato" width={28} className="mx-auto mb-2" />
                    暂无任务，添加一个吧 🍅
                </div>
            ) : (
                tasks.map(({ id, title, totalPomodoros, completedPomodoros, status }, index) => {
                    const isDone = status === "done";
                    const isActive = index === firstPendingIndex && !isDone;

                    return (
                        <Card
                            key={id}
                            className={`relative group transition-all duration-300
                                bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md
                                border border-zinc-200 dark:border-zinc-800
                                rounded-2xl shadow-md
                                p-4
                                ${isDone ? "opacity-50" : ""}
                                ${isActive ? "ring-2 ring-red-500/60" : ""}
                            `}
                        >
                            {/* 删除按钮 */}
                            <button
                                onClick={() => handleDelete(id)}
                                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 transition-opacity opacity-0 group-hover:opacity-100"
                                title="删除任务"
                            >
                                <Icon icon="lucide:trash-2" width="16" />
                            </button>

                            <CardHeader className="p-0 mb-3">
                                <CardTitle
                                    className={`text-base font-medium tracking-tight 
                                        ${isDone ? "line-through text-zinc-400" : "text-zinc-900 dark:text-white"}`}
                                >
                                    {title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex items-center justify-between p-0">
                                {isDone ? (
                                    <Badge
                                        variant="outline"
                                        className="text-zinc-500 border-zinc-300 dark:border-zinc-700 text-xs"
                                    >
                                        已完成
                                    </Badge>
                                ) : (
                                    <div className="flex space-x-1.5">
                                        {[...Array(totalPomodoros)].map((_, i) => (
                                            <Icon
                                                key={i}
                                                icon="fluent-emoji:tomato"
                                                width="18"
                                                className={`transition-opacity duration-200 ${
                                                    i < completedPomodoros
                                                        ? "opacity-100"
                                                        : "opacity-30"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </div>
    );
}
