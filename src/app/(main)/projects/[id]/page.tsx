import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Subheader } from '../../_components/Subheader/Subheader';

export default function ProjectPage({ params: { id } }: { params: Params }) {
  return (
    <div className="flex-1 flex-col">
      <Subheader>
        <h2 className="text-lg font-bold text-gray-800">Project {id}</h2>
      </Subheader>

      <div className="p-4">Some project content here!</div>
    </div>
  );
}
