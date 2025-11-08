import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, numeric, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const organizations = pgTable("organizations", {
  id: varchar("id").primaryKey(),
  name: text("name"),
});

export const departments = pgTable("departments", {
  id: varchar("id").primaryKey(),
  name: text("name"),
  organizationId: varchar("organization_id").references(() => organizations.id),
});

export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  partyNumber: text("party_number"),
  address: text("address"),
  taxId: text("tax_id"),
});

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address"),
});

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey(),
  invoiceNumber: text("invoice_number"),
  invoiceDate: timestamp("invoice_date"),
  deliveryDate: timestamp("delivery_date"),
  dueDate: timestamp("due_date"),
  
  vendorId: varchar("vendor_id").references(() => vendors.id),
  customerId: varchar("customer_id").references(() => customers.id),
  organizationId: varchar("organization_id").references(() => organizations.id),
  departmentId: varchar("department_id").references(() => departments.id),
  
  subTotal: numeric("sub_total", { precision: 12, scale: 2 }),
  totalTax: numeric("total_tax", { precision: 12, scale: 2 }),
  invoiceTotal: numeric("invoice_total", { precision: 12, scale: 2 }),
  currencySymbol: text("currency_symbol").default("€"),
  
  status: text("status").notNull().default("pending"),
  isValidatedByHuman: boolean("is_validated_by_human").default(false),
  
  fileName: text("file_name"),
  filePath: text("file_path"),
  fileSize: integer("file_size"),
  fileType: text("file_type"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").references(() => invoices.id).notNull(),
  
  paymentTerms: text("payment_terms"),
  bankAccountNumber: text("bank_account_number"),
  bic: text("bic"),
  accountName: text("account_name"),
  
  netDays: integer("net_days"),
  discountPercentage: numeric("discount_percentage", { precision: 5, scale: 2 }),
  discountDays: integer("discount_days"),
  discountDueDate: timestamp("discount_due_date"),
  discountedTotal: numeric("discounted_total", { precision: 12, scale: 2 }),
});

export const lineItems = pgTable("line_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").references(() => invoices.id).notNull(),
  
  srNo: integer("sr_no"),
  description: text("description"),
  quantity: numeric("quantity", { precision: 10, scale: 2 }),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }),
  totalPrice: numeric("total_price", { precision: 12, scale: 2 }),
  
  sachkonto: text("sachkonto"),
  buSchluessel: text("bu_schluessel"),
});

// Insert schemas
export const insertOrganizationSchema = createInsertSchema(organizations);
export const insertDepartmentSchema = createInsertSchema(departments);
export const insertVendorSchema = createInsertSchema(vendors).omit({ id: true });
export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true });
export const insertInvoiceSchema = createInsertSchema(invoices);
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true });
export const insertLineItemSchema = createInsertSchema(lineItems).omit({ id: true });

// Select types
export type Organization = typeof organizations.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type Vendor = typeof vendors.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type LineItem = typeof lineItems.$inferSelect;

// Insert types
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertLineItem = z.infer<typeof insertLineItemSchema>;
