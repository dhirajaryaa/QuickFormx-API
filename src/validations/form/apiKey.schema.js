export const apiKeySchema = z
  .string()
  .length(64, {
    message: "API key must be exactly 64 characters long.",
  })
  .regex(/^[a-f0-9]{64}$/i, {
    message: "API key must be a valid 64-character hex string.",
  });

