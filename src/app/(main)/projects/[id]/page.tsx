import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { api } from '~/trpc/server';
import { Subheader } from '../../_components/Subheader/Subheader';
import { CompleteButton } from './_components/complete-button';
import { ProjectContent } from './_components/project-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ProjectTasks } from './_components/project-tasks';

export default async function ProjectPage({ params: { id } }: { params: Params }) {
  const projectId = Number(id);

  const project = await api.project.getOne({ id: projectId });

  return (
    <Tabs defaultValue="overview" className="flex-1 flex-col">
      <Subheader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>

            <TabsList>
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="tasks">Задачи</TabsTrigger>
            </TabsList>
          </div>

          <CompleteButton id={projectId} isCompleted={project.isCompleted} />
        </div>
      </Subheader>

      <TabsContent value="overview">
        <ProjectContent project={project} />
      </TabsContent>

      <TabsContent value="tasks">
        <ProjectTasks projectId={projectId} />
      </TabsContent>
    </Tabs>
  );
}
