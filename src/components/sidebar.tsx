import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hash, Settings, Search, Plus, Home, Star, Clock } from "lucide-react"

export function Sidebar() {
  const myServers = [
    { name: "Design Team", members: 12, unread: 3 },
    { name: "Engineering", members: 24, unread: 0 },
    { name: "Marketing", members: 8, unread: 1 },
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-sidebar-foreground">TeamChat</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 bg-sidebar-accent text-sidebar-accent-foreground"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Search className="h-4 w-4" />
            Discover
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Star className="h-4 w-4" />
            Favorites
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Clock className="h-4 w-4" />
            Recent
          </Button>
        </div>

        {/* My Servers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-sidebar-foreground">My Servers</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {myServers.map((server) => (
              <div
                key={server.name}
                className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar-accent group cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Hash className="h-4 w-4 text-sidebar-foreground flex-shrink-0" />
                  <span className="text-sm text-sidebar-foreground truncate">{server.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {server.unread > 0 && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-accent text-accent-foreground">
                      {server.unread}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{server.members}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
