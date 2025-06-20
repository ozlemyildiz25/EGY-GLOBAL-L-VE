import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // free, pro, kurumsal
  description: text("description"),
  maxFileSize: integer("max_file_size").default(10485760), // byte cinsinden (10 MB)
  maxDocuments: integer("max_documents").default(100),
  maxCollaborators: integer("max_collaborators").default(5),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
  createdAt: true,
});

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = z.infer<typeof insertPlanSchema>;
