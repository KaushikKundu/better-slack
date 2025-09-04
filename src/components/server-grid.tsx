import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Hash, Star, Clock } from "lucide-react"

const servers = [
  {
    id: 1,
    name: "Product Development",
    description: "Collaborate on product roadmaps, feature planning, and development cycles",
    members: 156,
    channels: 12,
    category: "Development",
    isPopular: true,
    lastActive: "2 hours ago",
    avatar: "/product-team-logo.jpg",
  },
  {
    id: 2,
    name: "Design System",
    description: "Share design resources, discuss UI/UX patterns, and maintain brand consistency",
    members: 89,
    channels: 8,
    category: "Design",
    isPopular: false,
    lastActive: "5 minutes ago",
    avatar: "/design-team-logo.png",
  },
  {
    id: 3,
    name: "Sales & Marketing",
    description: "Coordinate campaigns, share leads, and align on go-to-market strategies",
    members: 234,
    channels: 15,
    category: "Business",
    isPopular: true,
    lastActive: "1 hour ago",
    avatar: "/sales-team-logo.jpg",
  },
]

const categories = ["All", "Development", "Design", "Business", "Support", "Analytics"]

export function ServerGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Card
            key={server.id}
            className="hover:shadow-md transition-shadow duration-200 border-border bg-card group hover:border-accent/50"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={server.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{server.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg truncate">{server.name}</CardTitle>
                    {server.isPopular && <Star className="h-4 w-4 text-accent fill-accent" />}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {server.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-4">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4">
                {server.description}
              </CardDescription>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{server.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  <span>{server.channels}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{server.lastActive}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Join Server</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
