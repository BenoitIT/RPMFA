import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(8),
  email: z.string().email(),
});

export default schema;
