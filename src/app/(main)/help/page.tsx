import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { H2 } from '~/components/ui/typography/h2';

export default async function HelpPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <H2>Справка</H2>

      <Button asChild>
        <Link href="https://github.com/kr4chinin/vkr_mirea" className="flex items-center gap-2">
          <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center">
            <GitHubLogoIcon width={16} height={16} />
          </span>
          GitHub
        </Link>
      </Button>
    </div>
  );
}
