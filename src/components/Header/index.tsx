interface Props {
  status: string;
}

const Header = ({ status }: Props) => {
  return (
    <header className='mx-auto mb-10 flex max-w-2xl items-center justify-between px-2 sm:px-4'>
      <h1 className='text-3xl font-semibold tracking-tight text-zinc-800 dark:text-white'>
        🍅 番茄专注
      </h1>
      <span className='text-sm text-zinc-500 dark:text-zinc-400'>
        状态：
        <span
          className={
            status === 'active'
              ? 'font-medium text-green-600 dark:text-green-400'
              : status === 'paused'
                ? 'font-medium text-yellow-500 dark:text-yellow-400'
                : 'font-medium text-gray-400 dark:text-zinc-500'
          }
        >
          {status === 'active'
            ? '专注中'
            : status === 'paused'
              ? '已暂停'
              : '未开始'}
        </span>
      </span>
    </header>
  );
};

export default Header;
