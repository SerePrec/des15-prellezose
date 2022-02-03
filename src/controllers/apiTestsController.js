import { generateNMockProduct } from "../utils/mockProduct.js";

export const getProductosTest = (req, res) => {
  res.json(generateNMockProduct(5));
};
