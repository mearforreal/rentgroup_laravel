import React, { useRef, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, MenuItem, TextField } from "@mui/material";
import "./request.css";

import axios from "../../axios";
import requests from "../../apiRequest";
import Logout from "../logout/Logout";

function Request() {
  const [newRequest, setNewRequest] = useState({
    manufacturer_id: 0,
    price_from: 0,
    price_to: 0,
    parts_name: "",
    image: null,
  });

  const [manufacturer, setManufacturer] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.getManufacturers);
      setManufacturer(response.data);

      return response;
    }
    fetchData();
  }, []);

  const imageRef = useRef({});
  const uploadImage = (e) => {
    imageRef.current = { imageFile: e.target.files[0] };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("manufacturer_id", newRequest.manufacturer_id);
    formData.append("price_from", newRequest.price_from);
    formData.append("price_to", newRequest.price_to);
    formData.append("parts_name", newRequest.parts_name);
    formData.append(
      "image",
      imageRef.current.imageFile,
      imageRef.current.imageFile.name
    );

    axios({
      method: "post",
      url: requests.searchForParts,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      alert("Запрос успешно отправлен");
      console.log(res.data);
    });
  };

  return (
    <div className="request_wrapper">
      <CssBaseline />

      <Container maxWidth="sm">
        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
          <h2>Отправьте запрос, чтобы найти запчасти</h2>
          <Box
            display="grid"
            gridTemplateRows="repeat(3, 1fr)"
            gap={3}
            sx={{
              bgcolor: "#fff",
              height: "100%",
              width: "100%",
              padding: "30px",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Наименование запчасти"
              onChange={(e) => {
                const parts_name = e.target.value;
                setNewRequest({ ...newRequest, ...{ parts_name } });
              }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Производитель"
              value={newRequest.manufacturer_id}
              onChange={(e) => {
                const manufacturer_id = e.target.value;
                setNewRequest({ ...newRequest, ...{ manufacturer_id } });
              }}
            >
              {manufacturer.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <TextField
                id="outlined-number"
                label="Цена от"
                type="number"
                required
                onChange={(e) => {
                  const price_from = e.target.value;
                  setNewRequest({ ...newRequest, ...{ price_from } });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-number"
                label="Цена до"
                type="number"
                required
                onChange={(e) => {
                  const price_to = e.target.value;
                  setNewRequest({ ...newRequest, ...{ price_to } });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <input type="file" onChange={uploadImage} />
            <Button type="submit" variant="contained">
              Отправить
            </Button>
            <Logout />
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default Request;
