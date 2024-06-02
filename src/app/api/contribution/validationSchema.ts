import { string, z } from "zod";

const schema = z.object({
  contributionAmount: z.number(),
  depositRecieptNumber: z.string().min(4),
  depositReciept: z.array(string()),
  facilityId:z.number()
});

export default schema;