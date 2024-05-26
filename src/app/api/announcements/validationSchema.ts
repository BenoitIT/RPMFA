import { z } from "zod";

const schema = z.object({
  subject: z.string().min(2),
  announcementbody: z.string().min(2),
});

export default schema;
