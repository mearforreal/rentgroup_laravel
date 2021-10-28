import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import axios from "../../axios";
import requests from "../../apiRequest";
import { MenuItem } from "@mui/material";

function PartsForm({ newpart, setNewpart }) {
  const [manufacturer, setManufacturer] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.getManufacturers);
      setManufacturer(response.data);

      return response;
    }
    fetchData();
  }, []);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Добавить запчасть
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Наименование"
            fullWidth
            variant="standard"
            onChange={(e) => {
              const name = e.target.value;
              setNewpart({ ...newpart, ...{ name } });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
            id="manufacturer"
            select
            required
            fullWidth
            label="Производитель"
            value={newpart.manufacturer_id}
            onChange={(e) => {
              const manufacturer_id = e.target.value;
              setNewpart({ ...newpart, ...{ manufacturer_id } });
            }}
          >
            {manufacturer.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            type="number"
            label="Цена"
            fullWidth
            variant="standard"
            onChange={(e) => {
              const price = e.target.value;
              setNewpart({ ...newpart, ...{ price } });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PartsForm;
