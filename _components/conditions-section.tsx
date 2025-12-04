"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { updateConditions } from "../actions";
import { toast } from "sonner";

export function ConditionsSection({
  id,
  initialConditions,
}: {
  id: string;
  initialConditions: unknown[];
}) {
  const [conditions, setConditions] = useState(
    JSON.stringify(initialConditions || [], null, 2)
  );

  async function handleSave() {
    try {
      const parsedConditions = JSON.parse(conditions);
      const result = await updateConditions(id, parsedConditions);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Invalid JSON format for conditions");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conditions</CardTitle>
        <CardDescription>
          Define complex rollout conditions using JSON.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          className="font-mono min-h-[200px]"
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder='[{"role" : "admin"}, {"group" : "developers"}, {"country" : "US"}]'
        />
        <Button onClick={handleSave}>Save Conditions</Button>
      </CardContent>
    </Card>
  );
}
