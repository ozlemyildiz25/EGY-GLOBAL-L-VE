import { pgTable, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { annotations } from "./annotations";
import { users } from "./users";

export const annotationMentions = pgTable("annotation_mentions", {
  id: serial("id").primaryKey(),
  annotationId: integer("annotation_id").notNull().references(() => annotations.id),
  userId: integer("user_id").notNull().references(() => users.id),
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnnotationMentionSchema = createInsertSchema(annotationMentions).omit({
  id: true,
  createdAt: true,
});

export type AnnotationMention = typeof annotationMentions.$inferSelect;
export type InsertAnnotationMention = z.infer<typeof insertAnnotationMentionSchema>;
