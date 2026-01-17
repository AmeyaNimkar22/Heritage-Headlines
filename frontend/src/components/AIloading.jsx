const AILoading = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>

      <div className="space-y-3">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-11/12"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-10/12"></div>
      </div>

      <div className="space-y-3 pt-6">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
        AI is analyzing historical context, cultural impact, and conservation…
      </p>
    </div>
  );
};

export default AILoading;
