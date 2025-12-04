"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Plus, XCircle } from "lucide-react";
import { useState } from "react";
import { createNewFlag } from "../actions";
import { Alert } from "@/components/ui/alert";

export function AddFlagModal() {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  async function clientAction(formData: FormData) {
    const result = await createNewFlag(formData);
    if (result.success) {
      setResponse(result);
      setOpen(false);
    } else {
      setResponse(result);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Flag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Flag</DialogTitle>
        </DialogHeader>
        <form action={clientAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Flag Name</Label>
            <Input id="name" name="name" placeholder="Flag Name" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Flag Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Flag Description"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
        {response.message && (
          <Alert variant={response.success ? "default" : "destructive"}>
            {response.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {response.message}
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
