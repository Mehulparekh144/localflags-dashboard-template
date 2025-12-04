"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleFlag } from "../actions";
import { toast } from "sonner";
import { useState } from "react";

export function FlagStatusToggle({
  id,
  initialEnabled,
}: {
  id: string;
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);

  async function handleToggle(checked: boolean) {
    // Optimistic update
    setEnabled(checked);

    const result = await toggleFlag(id, checked);
    if (result.success) {
      toast.success(result.message);
    } else {
      // Revert on failure
      setEnabled(!checked);
      toast.error(result.message);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="flag-status"
        checked={enabled}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="flag-status">{enabled ? "Enabled" : "Disabled"}</Label>
    </div>
  );
}
