import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { H2 } from '~/components/ui/typography/h2';
import { ProjectTab } from '~/lib/models/project-tab';
import { api } from '~/trpc/server';
import { Subheader } from '../../_components/subheader';
import { ProjectCompleteButton } from './_components/project-complete-button';
import { ProjectContent } from './_components/project-content';
import { ProjectMonitoring } from './_components/project-monitoring';
import { ProjectTasks } from './_components/project-tasks';

export default async function ProjectPage({ params: { id } }: { params: Params }) {
  const projectId = Number(id);

  const users = await api.user.getAll();

  const project = await api.project.getOne({ id: projectId });
  const tasksCount = await api.task.getProjectTasksCount({ projectId });
  const projectCreator = users.find(u => u.id === project.createdBy);

  return (
    <Tabs
      defaultValue={ProjectTab.OVERVIEW}
      className="h-[calc(100dvh-var(--header-height))] w-full flex-1 flex-col overflow-hidden truncate"
    >
      <Subheader>
        <div className="flex w-full items-center justify-between gap-4 p-4">
          <div className="flex w-full items-center gap-4 truncate">
            <H2 className="truncate" title={project.name}>
              {project.name}
            </H2>

            <TabsList>
              <TabsTrigger value={ProjectTab.OVERVIEW}>Обзор</TabsTrigger>
              <TabsTrigger value={ProjectTab.TASKS}>Задачи ({tasksCount})</TabsTrigger>
              <TabsTrigger value={ProjectTab.MONITORING}>Панель мониторинга</TabsTrigger>
            </TabsList>
          </div>

          <ProjectCompleteButton id={projectId} isCompleted={project.isCompleted} />
        </div>
      </Subheader>

      <div className="h-[calc(100%-var(--subheader-height))]">
        <TabsContent value={ProjectTab.OVERVIEW} className="h-full">
          {projectCreator && (
            <ProjectContent
              users={users}
              project={project}
              creatorImageUrl={projectCreator.imageUrl}
              creatorLastName={projectCreator.lastName}
              creatorFirstName={projectCreator.firstName}
            />
          )}
        </TabsContent>

        <TabsContent value={ProjectTab.TASKS} className="h-full">
          <ProjectTasks projectId={projectId} />
        </TabsContent>

        <TabsContent value={ProjectTab.MONITORING} className="h-full">
          <ProjectMonitoring projectId={projectId} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
