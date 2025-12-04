"use server";

import { localFlagsClient } from "@/lib/localflags";
import { revalidatePath } from "next/cache";

export async function createNewFlag(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await localFlagsClient.createFlag({
      name: name,
      description: description,
    });

    revalidatePath("/localflags");

    return {
      success: true,
      message: "Flag created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create flag",
    };
  }
}
export async function deleteFlag(_id: string) {
  try {
    await localFlagsClient.deleteFlag(_id);

    revalidatePath("/localflags");
    return { success: true, message: "Flag deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete flag" };
  }
}

export async function toggleFlag(_id: string, enabled: boolean) {
  try {
    await localFlagsClient.updateFlag(_id, { enabled });

    revalidatePath(`/localflags/${_id}`);
    revalidatePath("/localflags");
    return {
      success: true,
      message: `Flag ${enabled ? "enabled" : "disabled"} successfully`,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update flag status" };
  }
}

export async function updateConditions(_id: string, _conditions: unknown[]) {
  try {
    // TODO: Implement your update conditions logic here
    // await localFlagsClient.updateFlag(id, { conditions });

    revalidatePath(`/localflags/${_id}`);
    return { success: true, message: "Conditions updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update conditions" };
  }
}

export async function updateRollout(_id: string, _percentage: number) {
  try {
    // TODO: Implement your update rollout logic here
    await localFlagsClient.updateFlag(_id, { rolloutPercentage: _percentage });

    revalidatePath(`/localflags/${_id}`);
    return {
      success: true,
      message: "Rollout percentage updated successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update rollout percentage" };
  }
}

export async function updateTargetUsers(_id: string, _users: string[]) {
  try {
    // TODO: Implement your update target users logic here
    // await localFlagsClient.updateFlag(id, { users });

    revalidatePath(`/localflags/${_id}`);
    return { success: true, message: "Target users updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update target users" };
  }
}

export async function checkFlagUser(_flagName: string, _context: unknown) {
  try {
    // TODO: Implement your check flag user logic here
    // const isEnabled = await localFlagsClient.isEnabled(flagName, context);

    // Mock response
    return { success: true, isEnabled: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to evaluate flag" };
  }
}
