import Link from "next/link";
import React from "react";
import ItemCard from "../itemCard";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


function GridSeller({ products, user }) {

  const router = useRouter();

  const handleAddProduct = (e) => {
    if (user.user_regency != null) {
      router.replace("/add-produk");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lengkapi Profil Terlebih Dahulu',
      })
      router.replace("/info-profile");
    }
  }

  return (
    <>
      <div className="col-6 col-md-4 d-flex">
        {/* <Link href={"/add-produk"}> */}
        <button onClick={handleAddProduct}
          className="flex-fill d-flex flex-column justify-content-center rounded"
          style={{
            borderStyle: "dashed",
            borderWidth: "2px",
            borderColor: "lightgray",
            color: "gray",
          }}
        >
          <i className="bi bi-plus mx-auto" style={{ fontSize: "2rem" }}></i>
          <p className="mx-auto">Tambah Produk</p>
        </button>
        {/* </Link> */}
      </div>
      {products.map((product, key) => (
        <div key={key} className="col-6 col-md-4">
          <Link
            href={{
              pathname: "/produk/[id]",
              query: {
                // product: product,
                user: user,
              },
            }}
            as={`produk/${product.id}`}
          >
            <a className={styles.produk} key={product.id}>
              <ItemCard
                name={product.product_name}
                price={product.product_price}
                category={product.Category.category_name}
                image={product.product_image}
              />
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}

export default GridSeller;
