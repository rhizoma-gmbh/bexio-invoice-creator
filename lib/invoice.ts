import { FluentIterable } from "fluent-iterable";
import type * as schema from "./schema";

export class Invoice {
  #invoice: schema.InvoiceCreate;

  private constructor(invoice: schema.InvoiceCreate) {
    this.#invoice = invoice;
  }

  public static create(invoice: schema.InvoiceCreate) {
    return new Invoice(invoice);
  }

  public addPositions(position: FluentIterable<schema.PositionCreate>) {
    this.#invoice.positions.push(...position);
    return this;
  }

  public toJSON() {
    return this.#invoice;
  }
}
