export class Product {
  id: number;
  userId: number;
  name: string;
  quantityPerUnit: string;
  unitPrice: number;
  quantity: number;

  constructor(product: {
    id?: number, userId?: number,
    name?: string, quantityPerUnit?: string,
    unitPrice?: number, quantity?: number}) {
    this.id = product.id || 0;
    this.userId = product.userId || 0;
    this.name = product.name || '';
    this.quantityPerUnit = product.quantityPerUnit || '';
    this.unitPrice = product.unitPrice || 0;
    this.quantity = product.quantity || 0;
  }
}
