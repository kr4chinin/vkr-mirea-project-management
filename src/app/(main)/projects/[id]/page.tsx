import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Subheader } from '../../_components/Subheader/Subheader';
import { api } from '~/trpc/server';

export default async function ProjectPage({ params: { id } }: { params: Params }) {
  const project = await api.project.getOne({ id: Number(id) });

  return (
    <div className="flex-1 flex-col">
      <Subheader>
        <h2 className="text-lg font-bold text-gray-800">
          {project?.name} {project?.id}
        </h2>
      </Subheader>

      <div className="p-4">Some project content here!</div>
    </div>
  );
}
