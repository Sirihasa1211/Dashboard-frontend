import type { 
  User, InsertUser, Invoice, Vendor, Customer, LineItem, 
  InsertInvoice, InsertVendor, InsertCustomer, InsertLineItem,
  InsertOrganization, InsertDepartment, InsertPayment,
  Organization, Department, Payment
} from "@shared/schema";
import { 
  users, invoices, vendors, customers, lineItems, 
  organizations, departments, payments 
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc, and, gte } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface DashboardMetrics {
  totalSpend: number;
  totalInvoices: number;
  documentsUploaded: number;
  averageInvoiceValue: number;
}

export interface VendorSpend {
  vendor: string;
  spend: number;
}

export interface CategorySpend {
  category: string;
  value: number;
}

export interface InvoiceTrend {
  month: string;
  invoiceCount: number;
  totalValue: number;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDashboardMetrics(): Promise<DashboardMetrics>;
  getVendorSpend(limit?: number): Promise<VendorSpend[]>;
  getInvoiceTrend(): Promise<InvoiceTrend[]>;
  getAllInvoices(): Promise<Invoice[]>;
  
  createOrganization(org: InsertOrganization): Promise<Organization>;
  createDepartment(dept: InsertDepartment): Promise<Department>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  createLineItem(item: InsertLineItem): Promise<LineItem>;
  
  getVendorByName(name: string): Promise<Vendor | undefined>;
  getCustomerByName(name: string): Promise<Customer | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    throw new Error("Not implemented for MemStorage");
  }

  async getVendorSpend(): Promise<VendorSpend[]> {
    throw new Error("Not implemented for MemStorage");
  }

  async getInvoiceTrend(): Promise<InvoiceTrend[]> {
    throw new Error("Not implemented for MemStorage");
  }

  async getAllInvoices(): Promise<Invoice[]> {
    throw new Error("Not implemented for MemStorage");
  }

  async createOrganization(): Promise<Organization> {
    throw new Error("Not implemented for MemStorage");
  }

  async createDepartment(): Promise<Department> {
    throw new Error("Not implemented for MemStorage");
  }

  async createVendor(): Promise<Vendor> {
    throw new Error("Not implemented for MemStorage");
  }

  async createCustomer(): Promise<Customer> {
    throw new Error("Not implemented for MemStorage");
  }

  async createInvoice(): Promise<Invoice> {
    throw new Error("Not implemented for MemStorage");
  }

  async createPayment(): Promise<Payment> {
    throw new Error("Not implemented for MemStorage");
  }

  async createLineItem(): Promise<LineItem> {
    throw new Error("Not implemented for MemStorage");
  }

  async getVendorByName(): Promise<Vendor | undefined> {
    throw new Error("Not implemented for MemStorage");
  }

  async getCustomerByName(): Promise<Customer | undefined> {
    throw new Error("Not implemented for MemStorage");
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const result = await db.select({
      totalSpend: sql<number>`COALESCE(SUM(CAST(${invoices.invoiceTotal} AS NUMERIC)), 0)`,
      totalInvoices: sql<number>`COUNT(*)`,
      documentsUploaded: sql<number>`COUNT(DISTINCT ${invoices.fileName})`,
      averageInvoiceValue: sql<number>`COALESCE(AVG(CAST(${invoices.invoiceTotal} AS NUMERIC)), 0)`,
    }).from(invoices);
    
    return result[0];
  }

  async getVendorSpend(limit: number = 10): Promise<VendorSpend[]> {
    const result = await db
      .select({
        vendor: vendors.name,
        spend: sql<number>`COALESCE(SUM(CAST(${invoices.invoiceTotal} AS NUMERIC)), 0)`,
      })
      .from(invoices)
      .innerJoin(vendors, eq(invoices.vendorId, vendors.id))
      .groupBy(vendors.name)
      .orderBy(desc(sql`COALESCE(SUM(CAST(${invoices.invoiceTotal} AS NUMERIC)), 0)`))
      .limit(limit);
    
    return result;
  }

  async getInvoiceTrend(): Promise<InvoiceTrend[]> {
    const result = await db
      .select({
        month: sql<string>`TO_CHAR(${invoices.invoiceDate}, 'Mon')`,
        invoiceCount: sql<number>`COUNT(*)`,
        totalValue: sql<number>`COALESCE(SUM(CAST(${invoices.invoiceTotal} AS NUMERIC)), 0)`,
      })
      .from(invoices)
      .where(sql`${invoices.invoiceDate} IS NOT NULL`)
      .groupBy(sql`TO_CHAR(${invoices.invoiceDate}, 'Mon'), EXTRACT(MONTH FROM ${invoices.invoiceDate})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${invoices.invoiceDate})`);
    
    return result;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await db.select().from(invoices).orderBy(desc(invoices.invoiceDate));
  }

  async createOrganization(org: InsertOrganization): Promise<Organization> {
    const existing = await db.select().from(organizations).where(eq(organizations.id, org.id)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }
    const result = await db.insert(organizations).values(org).returning();
    return result[0];
  }

  async createDepartment(dept: InsertDepartment): Promise<Department> {
    const existing = await db.select().from(departments).where(eq(departments.id, dept.id)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }
    const result = await db.insert(departments).values(dept).returning();
    return result[0];
  }

  async createVendor(vendor: InsertVendor): Promise<Vendor> {
    const result = await db.insert(vendors).values(vendor).returning();
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values(customer).returning();
    return result[0];
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async createLineItem(item: InsertLineItem): Promise<LineItem> {
    const result = await db.insert(lineItems).values(item).returning();
    return result[0];
  }

  async getVendorByName(name: string): Promise<Vendor | undefined> {
    const result = await db.select().from(vendors).where(eq(vendors.name, name)).limit(1);
    return result[0];
  }

  async getCustomerByName(name: string): Promise<Customer | undefined> {
    const result = await db.select().from(customers).where(eq(customers.name, name)).limit(1);
    return result[0];
  }
}

export const storage = new DatabaseStorage();
