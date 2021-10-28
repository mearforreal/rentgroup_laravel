import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";

function ShopCard(props) {
  const { author, manufacturer, date, image, part, priceFrom, priceTo } = props;
  function toJSONLocal(date) {
    var date = new Date();
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={author.name}
          subheader={`${author.email}  ${toJSONLocal(date)}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={
            image
              ? `http://localhost:8000/api/image/${image}`
              : `https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png`
          }
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <ul>
              <li>
                <b> Наименование: {part}</b>
              </li>
              <li>
                <b> Цена: {`${priceFrom}-${priceTo}тг`} </b>
              </li>
              <li>
                <b> Производитель: {manufacturer}</b>
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShopCard;
