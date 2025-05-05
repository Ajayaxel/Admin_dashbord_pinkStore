import { motion } from "framer-motion";

import Header from "../components/common/Header";
import AddProductForm from "../components/products/AddProduct";

const AddproductPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Add Product' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <AddProductForm />
			</main>
		</div>
	);
};
export default AddproductPage;