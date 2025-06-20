import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { documents } from "./documents";
import { users } from "./users";

export const annotations = pgTable("annotations", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull().references(() => documents.id),
  type: text("type").notNull(), // contradiction, verification, error, note, relation, highlight, comment
  content: text("content").notNull(),
  position: jsonb("position"), // {x, y, width, height, page}
  tags: text("tags").array(), // Etiket listesi
  isPrivate: boolean("is_private").default(false),
  parentId: integer("parent_id"), // İsteğe bağlı, yanıt veya alt yorum için
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: integer("resolved_by").references(() => users.id),
  priority: text("priority").default("normal"), // low, normal, high, urgent
  assignedTo: integer("assigned_to").references(() => users.id),
  dueDate:
