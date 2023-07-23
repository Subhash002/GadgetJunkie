import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading } = useGetProductsQuery({ keyword, pageNumber });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      <Row>
        {data?.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ""}
      />
    </>
  );
};

export default HomeScreen;
