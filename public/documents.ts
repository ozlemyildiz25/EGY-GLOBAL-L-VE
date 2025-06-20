import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./users";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  fileType: text("file_type").notNull(), // pdf, docx, jpg, xlsx vb.
  fileSize: integer("file_size").notNull(),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
  category: text("category").notNull(), // TCK 191, Adli Tıp Raporu vb.
  institution: text("institution"),
  documentDate: timestamp("document_date"),
  metadata: jsonb("metadata"),
  userId: integer("user_id").references(() => users.id).notNull(),
});

export const insertDocumentSchema = createInsertSchema(docum
