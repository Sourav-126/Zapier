import { z } from "zod";

export const SignupData = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const SigninData = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const zapSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
