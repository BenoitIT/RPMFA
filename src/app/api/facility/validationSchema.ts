import { z } from "zod";

const schema = z.object({
  facilityName: z.string().min(2),
  facilityCategory: z.string().min(2),
  province: z.string().min(2),
  district: z.string().min(2),
  sector: z.string().min(2),
  cell: z.string().min(2),
});

export default schema;
