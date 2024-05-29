import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone:z.string().min(10),
});

export default schema;
