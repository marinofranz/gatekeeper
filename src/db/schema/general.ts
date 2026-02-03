import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organization } from "./auth";
import { relations } from "drizzle-orm";

export const ticketStatus = pgEnum("ticket_status", [
  "pending",
  "paid",
  "cancelled",
]);

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  location: text("location").notNull(),
  startTime: timestamp("start_time").notNull(),
  capacity: integer("capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),
  userEmail: text("user_email").notNull(),
  status: ticketStatus("status").notNull().default("pending"),
  qrCodeSecret: text("qr_code_secret").notNull().unique(),
  scannedAt: timestamp("scanned_at"),
  createdAt: timestamp("created_at").notNull(),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
  organization: one(organization, {
    fields: [events.organizationId],
    references: [organization.id],
  }),
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  event: one(events, {
    fields: [tickets.eventId],
    references: [events.id],
  }),
}));
