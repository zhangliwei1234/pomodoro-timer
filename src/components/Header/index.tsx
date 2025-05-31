
const Header = () => {
    return (
        <header className="flex justify-between items-center max-w-2xl mx-auto mb-10 px-2 sm:px-4">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-white">
                🍅 番茄专注
            </h1>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
        状态：<span className="font-medium text-green-600 dark:text-green-400">专注中</span>
      </span>
        </header>
    );
};

export default Header;
