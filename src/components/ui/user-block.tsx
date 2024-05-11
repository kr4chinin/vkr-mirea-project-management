import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface Props {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function UserBlock(props: Props) {
  const { imageUrl, firstName, lastName } = props;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      {firstName} {lastName}
    </div>
  );
}
