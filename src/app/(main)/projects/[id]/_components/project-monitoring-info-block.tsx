interface Props {
  title: string;
  value: number;
}

export function ProjectMonitoringInfoBlock(props: Props) {
  const { title, value } = props;

  return (
    <div className="flex w-[264px] shrink-0 flex-col items-center justify-center gap-6 rounded-md border border-slate-800 px-6 py-8">
      <p className="text-sm font-semibold text-gray-800">{title}</p>

      <span className="font-mono text-4xl font-extrabold text-gray-900">{value}</span>
    </div>
  );
}
