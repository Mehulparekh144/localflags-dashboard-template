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
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateTargetUsers } from "../actions";

export function TargetUsersSection({
  id,
  initialUsers,
}: {
  id: string;
  initialUsers: string[] | null;
}) {
  const [users, setUsers] = useState<string[]>(initialUsers || []);
  const [newUser, setNewUser] = useState("");

  async function handleSave() {
    const result = await updateTargetUsers(id, users);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  function addUser() {
    if (newUser && !users.includes(newUser)) {
      setUsers([...users, newUser]);
      setNewUser("");
    }
  }

  function removeUser(userToRemove: string) {
    setUsers(users.filter((u) => u !== userToRemove));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Users</CardTitle>
        <CardDescription>
          Whitelist specific users to always receive this feature.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter user ID"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUser();
              }
            }}
          />
          <Button onClick={addUser} variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[50px] p-4 border rounded-md bg-muted/20">
          {users.length === 0 && (
            <span className="text-muted-foreground text-sm italic">
              No users targeted.
            </span>
          )}
          {users.map((user) => (
            <Badge key={user} variant="secondary" className="pl-2 pr-1 py-1">
              {user}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-2 hover:bg-transparent hover:text-destructive"
                onClick={() => removeUser(user)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        <Button onClick={handleSave}>Save Target Users</Button>
      </CardContent>
    </Card>
  );
}
