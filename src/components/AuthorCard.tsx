
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
  mvpBadge?: string;
}

const AuthorCard = ({ name, bio, avatar, mvpBadge }: AuthorCardProps) => {
  // Get initials from name for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border">
              {avatar && <AvatarImage src={avatar} alt={name} />}
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            {mvpBadge && (
              <div className="relative w-20 h-20">
                <img src={mvpBadge} alt="Microsoft MVP Badge" className="w-full" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2">About the Author</h3>
            <h4 className="text-xl font-medium mb-3">{name}</h4>
            <p className="text-muted-foreground">{bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
