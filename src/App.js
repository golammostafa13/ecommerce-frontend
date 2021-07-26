import {Header, Footer, Products, Cart, Checkout} from './components';
import {useEffect, useState} from 'react';
import {fetchProducts, fetchCart} from './components/api/fetchData';
import {commerce} from './lib/commerce';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
	return (
		<Router>
			<Header totalItems={cart.total_items}/>
			<Switch>
				<Route exact path="/">
					<Products products={products} onAddCart={handleAddToCart} />
				</Route>
				<Route exact path="/cart">
					<Cart cart={cart} onUpdateCart={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
				</Route>
				<Route exact path="/checkout">
					<Checkout cart={cart}/>
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
}
export default App;
