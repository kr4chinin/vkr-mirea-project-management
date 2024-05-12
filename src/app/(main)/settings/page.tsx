import { H2 } from '~/components/ui/typography/h2';
import { H3 } from '~/components/ui/typography/h3';
import { UserBlock } from '~/components/ui/user-block';
import { api } from '~/trpc/server';

export default async function SettingsPage() {
  const users = await api.user.getAll();

  return (
    <div className="flex flex-col gap-6 p-4">
      <H2>Настройки</H2>

      <H3>Пользователи системы</H3>

      <ol className="flex flex-col gap-4">
        {users.map((u, idx) => (
          <li key={u.id} className="flex items-center gap-4">
            <span>{idx + 1}.</span>
            <UserBlock imageUrl={u.imageUrl} lastName={u.lastName} firstName={u.firstName} />
          </li>
        ))}
      </ol>
    </div>
  );
}
