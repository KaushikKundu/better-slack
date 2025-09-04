import { ServerGrid } from "@/components/server-grid"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Discover Servers</h1>
              <p className="text-muted-foreground">Find and join team servers to collaborate with your colleagues</p>
            </div>
            <ServerGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
