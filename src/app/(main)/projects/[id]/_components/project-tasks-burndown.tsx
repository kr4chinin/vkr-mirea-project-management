'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { type ProjectTasksBurndownData } from '~/lib/models/ProjectTasksBurndownData';
import { suppressDefaultPropsWarning } from '~/lib/utils';

suppressDefaultPropsWarning();

interface Props {
  data: ProjectTasksBurndownData[];
}

export function ProjectTasksBurndown(props: Props) {
  const { data } = props;

  if (data.length === 0)
    return <div className="text-slate-400">Недостаточно данных для построения графика.</div>;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
