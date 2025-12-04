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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { checkFlagUser } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

export function CheckUserSection({ flagName }: { flagName: string }) {
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState<{
    checked: boolean;
    isEnabled?: boolean;
    message?: string;
  }>({ checked: false });

  async function handleCheck() {
    try {
      // Construct a simple context with just the user ID
      const context = { id: userId };
      const response = await checkFlagUser(flagName, context);

      if (response.success) {
        setResult({
          checked: true,
          isEnabled: response.isEnabled,
        });
      } else {
        setResult({
          checked: true,
          message: response.message,
        });
      }
    } catch {
      setResult({
        checked: true,
        message: "Error checking flag",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check User</CardTitle>
        <CardDescription>
          Check if a specific user evaluates to true for this flag.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <div className="flex gap-2">
            <Input
              id="userId"
              placeholder="e.g. user-123"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCheck();
                }
              }}
            />
            <Button onClick={handleCheck}>Check</Button>
          </div>
        </div>

        {result.checked && (
          <div className="mt-4">
            {result.message ? (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            ) : (
              <Alert variant={result.isEnabled ? "default" : "destructive"}>
                {result.isEnabled ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  Result: {result.isEnabled ? "Enabled" : "Disabled"}
                </AlertTitle>
                <AlertDescription>
                  The flag is {result.isEnabled ? "enabled" : "disabled"} for
                  user <span className="font-mono font-bold">{userId}</span>.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
