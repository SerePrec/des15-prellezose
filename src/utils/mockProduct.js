import faker from "faker";
faker.locale = "es";

function generateMockProduct(id) {
  const product = {
    id,
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(100, 100, "any", true)
  };
  return product;
}

function generateNMockProduct(n) {
  const mockProductos = [];
  for (let i = 1; i <= n; i++) {
    mockProductos.push(generateMockProduct(i));
  }
  return mockProductos;
}

export { generateNMockProduct };
