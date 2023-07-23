import Carousel from "react-bootstrap/Carousel";
import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log(products);
  return isLoading ? null : error ? (
    <Alert variant="danger">There is some error</Alert>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
