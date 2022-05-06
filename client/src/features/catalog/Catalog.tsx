
import {  useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productselectors } from "./catalogSlice";
import ProductList from "./ProductList";



export default function Catalog(){
    const products = useAppSelector(productselectors.selectAll);
    const {productsLoaded , status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

useEffect(() =>{
    if(!productsLoaded) dispatch(fetchProductsAsync());
},[productsLoaded, dispatch])

if (status.includes('pending')) return <LoadingComponent message='Loading product...'/>
    return(
        <>
        <ProductList products={products} />
     
        </>

    )
}

