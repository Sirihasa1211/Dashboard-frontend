import { readFileSync } from "fs";
import { storage } from "./storage";

interface JsonInvoice {
  _id: string;
  name: string;
  filePath: string;
  fileSize: { $numberLong: string };
  fileType: string;
  status: string;
  organizationId: string;
  departmentId: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  processedAt?: { $date: string };
  isValidatedByHuman: boolean;
  extractedData: {
    llmData: {
      invoice: {
        value: {
          invoiceId: { value: string };
          invoiceDate: { value: string };
          deliveryDate: { value: string };
        };
      };
      vendor: {
        value: {
          vendorName: { value: string };
          vendorPartyNumber: { value: string };
          vendorAddress: { value: string };
          vendorTaxId: { value: string };
        };
      };
      customer: {
        value: {
          customerName: { value: string };
          customerAddress: { value: string };
        };
      };
      payment: {
        value: {
          dueDate: { value: string };
          paymentTerms: { value: string };
          bankAccountNumber: { value: string };
          BIC: { value: string };
          accountName: { value: string };
          netDays: { value: number };
          discountPercentage: { value: string };
          discountDays: { value: number };
          discountDueDate: { value: string };
          discountedTotal: { value: string };
        };
      };
      summary: {
        value: {
          subTotal: { value: number };
          totalTax: { value: number };
          invoiceTotal: { value: number };
          currencySymbol: { value: string };
        };
      };
      lineItems: {
        value: {
          items: {
            value: Array<{
              srNo: { value: number };
              description: { value: string };
              quantity: { value: number };
              unitPrice: { value: number };
              totalPrice: { value: number };
              Sachkonto: { value: string };
              BUSchluessel: { value: string };
            }>;
          };
        };
      };
    };
  };
}

async function importData() {
  console.log("Starting data import...");
  
  const jsonData = JSON.parse(
    readFileSync("attached_assets/Analytics_Test_Data_1762619379905.json", "utf-8")
  ) as JsonInvoice[];
  
  console.log(`Found ${jsonData.length} invoices to import`);
  
  const orgIds = new Set<string>();
  const deptIds = new Set<string>();
  
  for (const item of jsonData) {
    orgIds.add(item.organizationId);
    if (item.departmentId) {
      deptIds.add(item.departmentId);
    }
  }
  
  console.log(`Creating ${orgIds.size} organizations...`);
  for (const orgId of Array.from(orgIds)) {
    await storage.createOrganization({
      id: orgId,
      name: `Organization ${orgId.slice(0, 8)}`,
    });
  }
  
  console.log(`Creating ${deptIds.size} departments...`);
  for (const deptId of Array.from(deptIds)) {
    const orgId = jsonData.find(i => i.departmentId === deptId)?.organizationId;
    if (orgId) {
      await storage.createDepartment({
        id: deptId,
        name: `Department ${deptId.slice(0, 8)}`,
        organizationId: orgId,
      });
    }
  }
  
  console.log("Importing invoices...");
  let imported = 0;
  
  for (const item of jsonData) {
    try {
      const llmData = item.extractedData?.llmData;
      if (!llmData) continue;
      
      const vendorName = llmData.vendor?.value?.vendorName?.value || "Unknown Vendor";
      let vendor = await storage.getVendorByName(vendorName);
      
      if (!vendor) {
        vendor = await storage.createVendor({
          name: vendorName,
          partyNumber: llmData.vendor?.value?.vendorPartyNumber?.value || null,
          address: llmData.vendor?.value?.vendorAddress?.value || null,
          taxId: llmData.vendor?.value?.vendorTaxId?.value || null,
        });
      }
      
      const customerName = llmData.customer?.value?.customerName?.value || "Unknown Customer";
      let customer = await storage.getCustomerByName(customerName);
      
      if (!customer) {
        customer = await storage.createCustomer({
          name: customerName,
          address: llmData.customer?.value?.customerAddress?.value || null,
        });
      }
      
      const invoice = await storage.createInvoice({
        id: item._id,
        invoiceNumber: llmData.invoice?.value?.invoiceId?.value || null,
        invoiceDate: llmData.invoice?.value?.invoiceDate?.value 
          ? new Date(llmData.invoice.value.invoiceDate.value) 
          : null,
        deliveryDate: llmData.invoice?.value?.deliveryDate?.value 
          ? new Date(llmData.invoice.value.deliveryDate.value) 
          : null,
        dueDate: llmData.payment?.value?.dueDate?.value 
          ? new Date(llmData.payment.value.dueDate.value) 
          : null,
        vendorId: vendor.id,
        customerId: customer.id,
        organizationId: item.organizationId,
        departmentId: item.departmentId || null,
        subTotal: llmData.summary?.value?.subTotal?.value?.toString() || null,
        totalTax: llmData.summary?.value?.totalTax?.value?.toString() || null,
        invoiceTotal: llmData.summary?.value?.invoiceTotal?.value?.toString() || null,
        currencySymbol: llmData.summary?.value?.currencySymbol?.value || "€",
        status: item.status,
        isValidatedByHuman: item.isValidatedByHuman,
        fileName: item.name,
        filePath: item.filePath,
        fileSize: parseInt(item.fileSize?.$numberLong || "0"),
        fileType: item.fileType,
        createdAt: new Date(item.createdAt.$date),
        updatedAt: new Date(item.updatedAt.$date),
        processedAt: item.processedAt ? new Date(item.processedAt.$date) : null,
      });
      
      if (llmData.payment) {
        await storage.createPayment({
          invoiceId: invoice.id,
          paymentTerms: llmData.payment.value?.paymentTerms?.value || null,
          bankAccountNumber: llmData.payment.value?.bankAccountNumber?.value || null,
          bic: llmData.payment.value?.BIC?.value || null,
          accountName: llmData.payment.value?.accountName?.value || null,
          netDays: llmData.payment.value?.netDays?.value || null,
          discountPercentage: llmData.payment.value?.discountPercentage?.value || null,
          discountDays: llmData.payment.value?.discountDays?.value || null,
          discountDueDate: llmData.payment.value?.discountDueDate?.value 
            ? new Date(llmData.payment.value.discountDueDate.value) 
            : null,
          discountedTotal: llmData.payment.value?.discountedTotal?.value || null,
        });
      }
      
      const lineItemsData = llmData.lineItems?.value?.items?.value;
      if (lineItemsData && Array.isArray(lineItemsData)) {
        for (const lineItem of lineItemsData) {
          await storage.createLineItem({
            invoiceId: invoice.id,
            srNo: lineItem.srNo?.value || null,
            description: lineItem.description?.value || null,
            quantity: lineItem.quantity?.value?.toString() || null,
            unitPrice: lineItem.unitPrice?.value?.toString() || null,
            totalPrice: lineItem.totalPrice?.value?.toString() || null,
            sachkonto: lineItem.Sachkonto?.value || null,
            buSchluessel: lineItem.BUSchluessel?.value || null,
          });
        }
      }
      
      imported++;
      if (imported % 10 === 0) {
        console.log(`Imported ${imported}/${jsonData.length} invoices...`);
      }
    } catch (error) {
      console.error(`Error importing invoice ${item._id}:`, error);
    }
  }
  
  console.log(`✓ Import complete! Successfully imported ${imported} invoices.`);
  process.exit(0);
}

importData().catch((error) => {
  console.error("Import failed:", error);
  process.exit(1);
});
