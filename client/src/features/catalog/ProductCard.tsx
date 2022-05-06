import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";


interface Props {
    product: Product;
}

export default function ProductCard ({product}: Props)  {
  // const [loading, setLoading] = useState(false);
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  // function handleAddItem(productId: number){
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //          .then(basket => dispatch(setBasket(basket)))
  //          .catch(error => console.log(error))
  //          .finally(()=> setLoading(false));
  // }

  return (    

     <Card >
      <CardHeader 
        avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
                {product.name.charAt(0).toLocaleUpperCase()}
            </Avatar>            
        }
        title={product.name}
         titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
         }}
      />   
      <CardMedia 
        sx={{ height: 200 ,backgroundSize: 'contain', bgcolor: 'primary.light'}}  
          
        component="img"        
        image={product.pictureUrl}
        title={product.name}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5" >
          {/* ${(product.price /100).toFixed(2)} */}
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={status.includes('pendingAddItem' + product.id)} 
          onClick={() =>dispatch(addBasketItemAsync({productId: product.id}))}
          size="small">Add to cart</LoadingButton>
        <Button  component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}


