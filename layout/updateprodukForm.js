import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormData from "form-data";
import axios from "axios";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";
import Swal from "sweetalert2";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function EditProdukLayout({ product, token }) {

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    product_name: product.product_name || "",
    product_price: product.product_price,
    product_description: product.product_description,
    product_image: product.product_image,
    category_id: product.category_id,
  });

  const getCategories = async (e) => {
    const categories = await axios.get(`${API}/categories`);
    setCategories(categories.data.data);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append("product_name", productData.product_name);
    data.append("product_price", Number(productData.product_price));
    data.append("product_description", productData.product_description);
    data.append("product_image", productData.product_image);
    data.append("category_id", Number(productData.category_id));
    try {
      await axios({
        method: "put",
        url: `${API}/products/${product.id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Update Produk Berhasil',
        showConfirmButton: false,
        timer: 2000,
      })

      router.replace(`/produk/${product.id}`);

    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleChangeFile = (e) => {
    setProductData((prev) => ({ ...prev, product_image: e.target.files[0] }));
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-3 d-flex flex-column">
          <div className="col-12 mt-2">
            <label>Nama Produk</label>
            <InputBox
              type="text"
              name="product_name"
              className="form-control mt-2"
              placeholder="Nama Produk" value={productData.product_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 mt-2">
            <label>Harga Produk</label>
            <InputBox
              type="text"
              name="product_price"
              className="form-control mt-2"
              placeholder="Rp 0,00" value={productData.product_price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 mt-2">
            <label>Kategori</label>
            <select name="category_id"
              className="form-select mt-2"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option selected={category.id == productData.category_id} value={`${category.id}`} key={category.id}>{category.category_name}</option>
              ))}

            </select>
          </div>
          <div className="col-12 mt-2">
            <label>Deskripsi</label>
            <textarea
              className="form-control mt-2"
              name="product_description"
              rows="2"
              placeholder="Contoh: Jalan Ikan Hiu 33" value={productData.product_description}
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                background: "#FFFFFF",
                display: "flex",
              }}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="col-12 mt-2">
            <label>Foto Produk</label>
            <div>
              <img width="200px" src={productData.product_image} />
            </div>
            <InputBox
              type="file"
              name="product_image"
              className="form-control mt-2"
              placeholder="Rp 0,00"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
          <div className="col-12 mt-5 mb-5 fw-bold">
            <div className="d-flex flex-row gap-2">

              <CategoryCard
                type="submit"
                className="p-3 flex-grow-1"
                text="Perbarui"
                rad="16"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProdukLayout;
