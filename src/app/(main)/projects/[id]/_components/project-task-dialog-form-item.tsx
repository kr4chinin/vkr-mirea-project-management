import { type ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

interface Props {
  label: string;
  children: ReactNode;
}

export function ProjectTaskDialogFormItem(props: Props) {
  const { label, children } = props;

  return (
    <FormItem className="flex flex-col gap-1">
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>

      <FormMessage />
    </FormItem>
  );
}
