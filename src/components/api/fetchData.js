import {commerce} from '../../lib/commerce';

export const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    return data;
}
export const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    return data;
}