"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";
import { updateRollout } from "../actions";

export function RolloutPercentageSection({
  id,
  initialPercentage,
}: {
  id: string;
  initialPercentage: number;
}) {
  const [percentage, setPercentage] = useState(initialPercentage);

  async function handleSave() {
    const result = await updateRollout(id, percentage);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rollout Percentage</CardTitle>
        <CardDescription>
          Control the percentage of users who receive this feature.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Slider
            value={[percentage]}
            onValueChange={(vals) => setPercentage(vals[0])}
            max={100}
            step={10} // Step size of 10
            className="flex-1"
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={percentage}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 0 && val <= 100) {
                  setPercentage(val);
                }
              }}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
        <Button onClick={handleSave}>Save Rollout</Button>
      </CardContent>
    </Card>
  );
}
