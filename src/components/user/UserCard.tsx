import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";

type UserCardProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  url: string;
};

const UserCard = ({ avatarUrl, name, bio, url }: UserCardProps) => {
  return (
    <Card className="mb-8 w-full lg:w-1/2">
      <CardHeader className="flex-row items-center gap-x-8">
        <img src={avatarUrl} alt={name} className="h-36 w-36 rounded object-cover" />
        <div className="flex flex-col gap-y-2">
          <CardTitle>{name || "Coding Addict"}</CardTitle>
          <CardDescription>{bio || "passionate about coding and technology"}</CardDescription>
          <Button asChild size={"sm"} className="mt-2 w-1/2">
            <a href={url} target="_blank" rel="noreferrer">
              Follow
            </a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
