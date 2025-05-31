// src/pages/Home.tsx
import {Button} from "../components/ui/button";
import Header from "../components/Header";
import CenterCard from "../components/CenterCard";
import CompletedCard from "../components/CompletedCard";
import CumulativeCard from "../components/CumulativeCard";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "../components/ui/drawer";
import {Plus} from "lucide-react";
import AppleStackedTasks from "../components/TaskCard";
import {Icon} from '@iconify/react';
import {useState} from "react";

const Home = () => {
    const [taskName, setTaskName] = useState("");
    const [pomodoroCount, setPomodoroCount] = useState(4);
    const MAX_POMODOROS = 5;

    return (
        <div
            className="bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white px-4 py-8 min-h-screen">
            <Header/>

            {/* 中心计时卡片 */}
            <CenterCard/>

            {/* 添加任务按钮 */}
            <div className="max-w-xl mx-auto mt-8">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            className="rounded-xl w-full flex items-center justify-center gap-2 text-base font-medium">
                            <Plus className="w-4 h-4"/>
                            添加任务
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm p-4">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 space-y-4">
                                <h2 className="text-lg font-semibold">添加新任务</h2>
                                <input
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="请输入任务名称..."
                                />
                                <div className="space-y-1">
                                    <label
                                        htmlFor="pomodoroCount"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        番茄数量：{pomodoroCount}
                                    </label>
                                    <div
                                        id="pomodoroCount"
                                        role="group"
                                        aria-label="番茄数量选择器"
                                        className="flex space-x-2 justify-start"
                                    >
                                        {Array.from({length: MAX_POMODOROS}).map((_, i) => (
                                            <Icon
                                                key={i}
                                                icon="fluent-emoji:tomato"
                                                width="20"
                                                className={`cursor-pointer transition-opacity ${
                                                    i < pomodoroCount ? "opacity-100" : "opacity-30"
                                                }`}
                                                onClick={() => setPomodoroCount(i + 1)}
                                                aria-pressed={i < pomodoroCount}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full rounded-xl">确认添加</Button>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* 今日统计卡片 */}
            <div className="max-w-2xl mx-auto mt-8 grid grid-cols-2 gap-4">
                <CompletedCard/>
                <CumulativeCard/>
            </div>

            <AppleStackedTasks></AppleStackedTasks>
        </div>
    );
};

export default Home;
