import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { H3 } from '~/components/ui/typography/h3';
import { UserBlock } from '~/components/ui/user-block';
import { api } from '~/trpc/server';

export async function UsersBreakdown() {
  const usersBreakdown = await api.analytics.getUsersBreakdown();

  return (
    <div className="flex flex-col gap-4">
      <H3>Пользователи системы</H3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ответственный</TableHead>
            <TableHead>Участвует в проектах</TableHead>
            <TableHead>Открытые задачи</TableHead>
            <TableHead>Выполненные задачи</TableHead>
            <TableHead>Просроченные задачи</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersBreakdown.map(u => (
            <TableRow key={u.user.id}>
              <TableCell className="font-medium">
                <UserBlock
                  imageUrl={u.user.imageUrl}
                  lastName={u.user.lastName ?? 'Неизвестно'}
                  firstName={u.user.firstName ?? 'Неизвестно'}
                />
              </TableCell>
              <TableCell>{u.projectsCount}</TableCell>
              <TableCell>{u.openTasksCount}</TableCell>
              <TableCell>{u.completedTasksCount}</TableCell>
              <TableCell>{u.overdueTasksCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
