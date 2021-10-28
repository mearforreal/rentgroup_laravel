import { Button } from "@mui/material";
import { React, useEffect, useState } from "react";
import PartDialog from "./PartDialog";
import ShopCard from "./ShopCard";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";
import axios from "../../axios";
import requests from "../../apiRequest";
import Logout from "../logout/Logout";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Наименование",
    width: 200,
  },

  {
    field: "manufacturer",
    headerName: "Производитель",
    sortable: false,
    width: 200,
    valueFormatter: (params) => params.value.name,
  },
  {
    field: "price",
    type: "number",
    headerName: "Цена",
    width: 150,
  },
];

function Shop() {
  const [partRows, setPartRows] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response_parts = await axios.get(requests.getOwnedParts);
      const response_requests = await axios.get(requests.getRequestedParts);
      setPartRows(response_parts.data);
      setUserRequests(response_requests.data);
    }
    fetchData();
  }, [added]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div className="shop_conatinaer">
      <div className="header_btns_container">
        <Button variant="contained" onClick={handleClickOpen}>
          Добавить запчасть
        </Button>
        <Logout />
      </div>

      <div style={{ height: 400, margin: "30px auto", width: "50%" }}>
        <DataGrid
          rows={partRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      <div className="request__wrapper">
        <h1>Запрос на запчасти</h1>
        <div className="request_card_wrapper">
          {userRequests.map((req) => (
            <ShopCard
              key={req.id}
              author={req.author}
              manufacturer={req.manufacturer.name}
              date={req.created_at}
              image={req.image}
              part={req.parts_name}
              priceFrom={req.price_from}
              priceTo={req.price_to}
            />
          ))}
        </div>
      </div>

      <PartDialog
        open={open}
        onClose={handleClose}
        setAdded={setAdded}
        added={added}
      />
    </div>
  );
}

export default Shop;
