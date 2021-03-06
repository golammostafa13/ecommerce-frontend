import {Header, Footer, Products, Cart, Checkout} from './components';
import {useEffect, useState} from 'react';
import {fetchProducts, fetchCart} from './components/api/fetchData';
import {commerce} from './lib/commerce';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProductDetail from './components/ProductDetail/ProductDetail';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	useEffect(() =>{
		const loadProducts = async ()=>{
			setProducts(await fetchProducts());
		};
		const loadCart = async ()=>{
			setCart(await fetchCart());
		}
		loadProducts();
		loadCart();
	}, []);
	const handleAddToCart = async (productId, quantity) => {
		const {cart} = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};
	const handleUpdateCart = async (productId, quantity) => {
		const {cart} = await commerce.cart.update(productId, {quantity});
		setCart(cart);
	};
	const handleRemoveFromCart = async (productId) => {
		const {cart} = await commerce.cart.remove(productId);
		setCart(cart);
	}
	const handleEmptyCart = async () => {
		const {cart} = await commerce.cart.empty();
		setCart(cart);
	}
	const loading = () => (
		<img style={{height:'100vh', width:'100vw'}} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Fmax_1200%2Fb6e0b072897469.5bf6e79950d23.gif&f=1&nofb=1' alt='loading' />
	)
	return (
		<Router>
			<Header totalItems={cart.total_items}/>
			<Switch>
				<Route exact path="/">
					{products.length ? <Products products={products} onAddCart={handleAddToCart} /> : loading}
				</Route>
				<Route exact path="/cart">
					<Cart cart={cart} onUpdateCart={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
				</Route>
				<Route exact path="/checkout">
					<Checkout cart={cart}/>
				</Route>
				<Route exact path="/productDetail/:productId">
					<ProductDetail products={products}/>
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
}
export default App;
