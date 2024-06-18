import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject:z.string().min(2),
  message:z.string().min(2),
});

export default schema;
