import { localFlagsClient } from "@/lib/localflags";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DeleteFlagButton } from "../_components/delete-flag-button";
import { FlagStatusToggle } from "../_components/flag-status-toggle";
import { CheckUserSection } from "../_components/check-user-section";
import { ConditionsSection } from "../_components/conditions-section";
import { RolloutPercentageSection } from "../_components/rollout-percentage-section";
import { TargetUsersSection } from "../_components/target-users-section";

export default async function LocalFlagsIDPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const flag = await localFlagsClient.getFlag(id);

  if (!flag) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-muted/40 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/localflags">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {flag.name}
              </h1>
              <Badge variant={flag.enabled ? "default" : "secondary"}>
                {flag.enabled ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{flag.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <FlagStatusToggle id={flag.id} initialEnabled={flag.enabled} />
            <DeleteFlagButton id={flag.id} />
          </div>
        </div>

        <div className="space-y-3">
          <CheckUserSection flagName={flag.name} />
          <RolloutPercentageSection
            id={flag.id}
            initialPercentage={flag.rolloutPercentage}
          />
          <TargetUsersSection
            id={flag.id}
            initialUsers={flag.users as string[] | null}
          />
          <ConditionsSection
            id={flag.id}
            initialConditions={flag.conditions as unknown[]}
          />
        </div>
      </div>
    </div>
  );
}
