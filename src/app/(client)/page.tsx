import ProductCard from '@/components/product/cards';

export default async function Home() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return <ProductCard products={data} />;
}
