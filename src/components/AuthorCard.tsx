
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
}

const AuthorCard = ({ name, bio, avatar }: AuthorCardProps) => {
  // Get initials from name for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-16 w-16 border">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold mb-2">About the Author</h3>
            <h4 className="font-medium mb-2">{name}</h4>
            <p className="text-muted-foreground text-sm">{bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
