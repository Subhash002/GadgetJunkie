import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Spinner from "react-bootstrap/Spinner";

import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { useParams } from "react-router";
import Paginate from "../../components/Paginate";
const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { error: createError, isLoading: loadingCreate }] =
    useCreateProductMutation();
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to add this product")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error || createError.data, { theme: "colored" });
      }
    }
  };
  const [deleteProduct, { error: deleteError, isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || deleteError?.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && (
        <Spinner
          animation="border"
          style={{ margin: "auto", display: "flex", placeItems: "center" }}
        />
      )}
      {loadingDelete && (
        <Spinner
          animation="border"
          style={{ margin: "auto", display: "flex", placeItems: "center" }}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message text={error} variant={"danger"} />
      ) : (
        <>
          <Table striped responsive bordered variant="light">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="lighter" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "whitesmoke" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
