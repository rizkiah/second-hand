import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
import ListSeller from "../../components/sellerViewOption/listSeller";
import GridSeller from "../../components/sellerViewOption/gridSeller";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, res }) {
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
  let user = null;
  let allcookie = req.headers.cookie || "   ";
  let cookielist = allcookie.split("; ");
  let token = "";
  cookielist.forEach((element) => {
    if (element.startsWith("token=")) {
      token = element.substring(6, element.length);
    }
  });
  let products = [];
  let transactions = [];
  let notifications = [];

  try {
    if (token != "") {
      //mengambil data user
      const res_user = await axios({
        method: `get`,
        url: `${API}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user = res_user.data.data;
    }
    //mengambil data product
    const res_products = await axios({
      method: `get`,
      url: `${API}/products/user/id`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    products = res_products.data.data;

    //mengambil data transaksi
    const res_transactions = await axios({
      method: `get`,
      url: `${API}/users/transactions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    transactions = res_transactions.data.data;

    //mengambil data notifikasi
    const res_notifications = await axios({
      method: `get`,
      url: `${API}/users/notifications`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    notifications = res_notifications.data.data;

  } catch (error) {
    console.log(error.response);
  }

  return {
    props: {
      user,
      token,
      products,
      transactions,
      notifications,
    },
  };
}

export default function DaftarJual({
  user,
  token,
  products,
  transactions,
  notifications,
}) {
  const category = [
    ["box", "Semua Produk", () => setCategoryState(1), 1],
    ["currency-dollar", "Transaksi", () => setCategoryState(2), 2],
  ];
  const screen = useResize();
  const router = useRouter();
  const [categoryState, setCategoryState] = useState(1);

  useEffect(() => {
    if (user == null || user.user_role == 1) {
      router.replace("/");
    }
  });
  return (
    <>
      <Head>
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout user={user} notifications={notifications}>
        <div className="max-width p-2 d-flex flex-column gap-2">
          <h1>Daftar Jual Saya</h1>
          {user && (
            <OwnerCard
              foto={user.user_image}
              fotoalt={`${user.user_name}'s photo`}
              isOwner={true}
              nama={user.user_name}
              kota={user.user_regency}
            />
          )}
        </div>

        <div className={"" + (screen.md ? " max-width" : "")}>
          <div
            className={
              "container-fluid px-0 py-2 m-0" + (screen.md ? " row " : "hidden")
            }
          >
            {screen.md ? (
              <div className="col-4 px-2 py-2 m-0">
                <div
                  className="p-4 sticky-top"
                  style={{
                    boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                    borderRadius: "1rem",
                    top: "70px",
                  }}
                >
                  <h4>Kategori</h4>
                  <div className="">
                    {category.map((data, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between py-2"
                        onClick={data[2]}
                        style={{
                          cursor: "pointer",
                          color: data[3] == categoryState && "var(--purple)",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`bi bi-${data[0]}`}
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <p className="m-0 p-0">{data[1]}</p>
                        </div>
                        <i
                          className={`bi bi-chevron-right`}
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-fluid p-0 ">
                <div
                  className="overflow-auto d-flex gap-2 px-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {category.map((data, index) => (
                    <CategoryCard
                      className={"d-flex align-items-center px-3 py-1 gap-2"}
                      key={index}
                      icon={data[0]}
                      text={data[1]}
                      rad="8"
                    />
                  ))}
                </div>
              </div>
            )}
            <div
              className={
                "container-fluid m-0 row p-1 g-2" + (screen.md ? " col-8" : "")
              }
            >
              {categoryState == 1 ? (
                <GridSeller products={products} user={user} />
              ) : (
                <ListSeller transactions={transactions} token={token} />
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
