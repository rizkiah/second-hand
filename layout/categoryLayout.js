/* eslint-disable react/jsx-key */
import React from "react";
import CategoryCard from "../components/categoryCard";
import ItemCard from "../components/itemCard";
import UlCategoryLayout from "./ulcategorylayout";

function CategoryLayout({ products, products_hobi, products_kesehatan, products_elektronik, products_baju, products_kendaraan }) {
  return (
    <>
      <div className="card border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Telusuri Kategori</h5>
          <UlCategoryLayout>
            <button
              style={{ borderRadius: "16px" }}
              className="pill active m-2"
              id="pills-semua-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-semua"
              type="button"
              role="tab"
              aria-controls="pills-semua"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Semua
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-hobi-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-hobi"
              type="button"
              role="tab"
              aria-controls="pills-hobi"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Hobi
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-kendaraan-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-kendaraan"
              type="button"
              role="tab"
              aria-controls="pills-kendaraan"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Kendaraan
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-baju-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-baju"
              type="button"
              role="tab"
              aria-controls="pills-baju"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Baju
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-elektronik-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-elektronik"
              type="button"
              role="tab"
              aria-controls="pills-elektronik"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Elektronik
            </button>
            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-kesehatan-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-kesehatan"
              type="button"
              role="tab"
              aria-controls="pills-kesehatan"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Kesehatan
            </button>
          </UlCategoryLayout>

          {/* tab masing-masing kategori */}
          <div className="tab-content pt-2" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="pills-semua"
              role="tabpanel"
              aria-labelledby="semua-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products.map((product) => (
                  <div className="col-2 mt-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      category={product.Category.category_name}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-hobi"
              role="tabpanel"
              aria-labelledby="hobi-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_hobi.map((product) => (
                  <div className="col-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-kendaraan"
              role="tabpanel"
              aria-labelledby="kendaraan-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_kendaraan.map((product) => (
                  <div className="col-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-baju"
              role="tabpanel"
              aria-labelledby="baju-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_baju.map((product) => (
                  <div className="col-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-elektronik"
              role="tabpanel"
              aria-labelledby="elektronik-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_elektronik.map((product) => (
                  <div className="col-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-kesehatan"
              role="tabpanel"
              aria-labelledby="kesehatan-tab"
            >

              <div className="row d-flex px-3 mt-2">
                {products_kesehatan.map((product) => (
                  <div className="col-2">
                    <ItemCard
                      name={product.product_name}
                      price={product.product_price}
                      image={product.product_image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryLayout;
