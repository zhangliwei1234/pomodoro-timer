import {Card, CardContent} from "../ui/card.tsx";

const CompletedCard = () => {
    return (
        <Card
            className="bg-white/50 dark:bg-zinc-900/30 backdrop-blur-lg border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg transition duration-300 ">
            <CardContent className="p-6 text-center">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">番茄完成</p>
                <p className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                    3 个
                </p>
            </CardContent>
        </Card>
    );
};

export default CompletedCard;
