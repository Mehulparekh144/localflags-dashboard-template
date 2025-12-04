import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { localFlagsClient } from "@/lib/localflags";
import { FeatureFlag } from "@/prisma/generated/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { AddFlagModal } from "./_components/add-flag-modal";

const user = {
  id: "1",
  email: "mparekh@localflags.com",
  name: "Mehul Parekh",
  image: "https://github.com/shadcn.png", // Placeholder image
  isAllowed: true,
};

export default async function LocalFlagsPage() {
  // You would implement this logic in your auth system
  if (!user.isAllowed) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Shield className="h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Unauthorized Access</h1>
          <p className="text-muted-foreground">
            You do not have permission to view this page.
          </p>
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const flags = (await localFlagsClient.getAllFlags()) as FeatureFlag[];

  return (
    <div className="min-h-screen w-full bg-muted/40 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your feature flags and rollout strategies.
            </p>
          </div>
        </header>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-xl">Feature Flags</CardTitle>
              <CardDescription>
                A list of all feature flags in your project.
              </CardDescription>
            </div>
            <AddFlagModal />
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rollout</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flags.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No feature flags found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    flags.map((flag) => (
                      <TableRow key={flag.id} className="group">
                        <TableCell className="font-medium">
                          <Link
                            href={`/localflags/${flag.id}`}
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            {flag.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={flag.enabled ? "default" : "secondary"}
                            className={
                              flag.enabled
                                ? "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-200"
                            }
                          >
                            {flag.enabled ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${flag.rolloutPercentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {flag.rolloutPercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-[300px] truncate">
                          {flag.description}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground tabular-nums">
                          {new Date(flag.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
