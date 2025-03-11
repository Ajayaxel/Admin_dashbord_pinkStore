import { motion } from "framer-motion";
import { Edit, Search, Trash2, Check, Plus } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200, image: "https://avtechworld.in/wp-content/uploads/2024/05/Black-White-Coming-Soon-Instagram-Post-8.png" },
	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800, image: "https://avtechworld.in/wp-content/uploads/2024/05/Black-White-Coming-Soon-Instagram-Post-8.png" },
	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650, image: "https://avtechworld.in/wp-content/uploads/2024/05/Black-White-Coming-Soon-Instagram-Post-8.png" },
	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950, image: "https://avtechworld.in/wp-content/uploads/2024/05/Black-White-Coming-Soon-Instagram-Post-8.png" },
	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720, image: "https://avtechworld.in/wp-content/uploads/2024/05/Black-White-Coming-Soon-Instagram-Post-8.png" },
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState(PRODUCT_DATA);
	const [showForm, setShowForm] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [formMode, setFormMode] = useState("create"); // "create" or "edit"
	const [formValues, setFormValues] = useState({
		id: null,
		name: "",
		image: "",
		category: "",
		price: "",
		stock: "",
		sales: ""
	});

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter(
			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);
		setProducts(filtered);
	};

	const handleDelete = (id) => {
		setProducts(products.filter((product) => product.id !== id));
	};

	const handleEdit = (product) => {
		setFormMode("edit");
		setFormValues({
			id: product.id,
			name: product.name,
			category: product.category,
			price: product.price,
			stock: product.stock,
			sales: product.sales,
			image: product.image // Added image field
		});
		setShowForm(true);
	};

	const handleAddProduct = () => {
		setFormMode("create");
		setFormValues({
			id: null,
			name: "",
			category: "",
			price: "",
			stock: "",
			sales: "",
			image: "" // Added image field
		});
		setShowForm(true);
	};

	const handleFormChange = (e, field) => {
		setFormValues({ ...formValues, [field]: e.target.value });
	};

	const handleSave = (e) => {
		e.preventDefault();

		if (formMode === "create") {
			// Create new product
			const newId = Math.max(...products.map(p => p.id)) + 1;
			const newProduct = {
				id: newId,
				name: formValues.name,
				category: formValues.category,
				price: parseFloat(formValues.price),
				stock: parseInt(formValues.stock),
				sales: parseInt(formValues.sales),
				image: formValues.image // Added image to new product
			};
			setProducts([...products, newProduct]);
		} else {
			// Update existing product
			setProducts(products.map((product) =>
				product.id === formValues.id ?
					{
						...formValues,
						price: parseFloat(formValues.price),
						stock: parseInt(formValues.stock),
						sales: parseInt(formValues.sales)
					} : product
			));
		}

		setShowForm(false);
	};

	const handleCancel = () => {
		setShowForm(false);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			{showForm && (
				<motion.div
					className='mb-6 p-4 bg-gray-700 rounded-lg'
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
				>
					<h3 className='text-lg font-medium text-gray-100 mb-4'>
						{formMode === "create" ? "Add New Product" : "Edit Product"}
					</h3>
					<form onSubmit={handleSave}>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
							<div>
								<label className='block text-sm text-gray-400 mb-1'>Name</label>
								<input
									type='text'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.name}
									onChange={(e) => handleFormChange(e, "name")}
									required
								/>
							</div>

							<div>
								<label className='block text-sm text-gray-400 mb-1'>Category</label>
								<input
									type='text'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.category}
									onChange={(e) => handleFormChange(e, "category")}
									required
								/>
							</div>

							<div>
								<label className='block text-sm text-gray-400 mb-1'>Image URL</label>
								<input
									type='text'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.image}
									onChange={(e) => handleFormChange(e, "image")}
									required
								/>
							</div>

							<div>
								<label className='block text-sm text-gray-400 mb-1'>Price</label>
								<input
									type='number'
									step='0.01'
									min='0'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.price}
									onChange={(e) => handleFormChange(e, "price")}
									required
								/>
							</div>
							<div>
								<label className='block text-sm text-gray-400 mb-1'>Stock</label>
								<input
									type='number'
									min='0'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.stock}
									onChange={(e) => handleFormChange(e, "stock")}
									required
								/>
							</div>
							<div>
								<label className='block text-sm text-gray-400 mb-1'>Sales</label>
								<input
									type='number'
									min='0'
									className='w-full bg-gray-800 text-white rounded p-2'
									value={formValues.sales}
									onChange={(e) => handleFormChange(e, "sales")}
									required
								/>
							</div>
						</div>
						
						{formValues.image && (
							<div className="mb-4">
								<label className='block text-sm text-gray-400 mb-1'>Image Preview</label>
								<img 
									src={formValues.image} 
									alt="Product preview" 
									className="w-32 h-32 object-cover rounded border border-gray-600"
								/>
							</div>
						)}
						
						<div className='flex justify-end gap-2'>
							<button
								type='button'
								className='bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded'
								onClick={handleCancel}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded'
							>
								{formMode === "create" ? "Create Product" : "Save Changes"}
							</button>
						</div>
					</form>
				</motion.div>
			)}

			<div className='flex justify-end mb-4'>
				<button
					className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center'
					onClick={handleAddProduct}
				>
					<Plus size={18} className="mr-1" /> Add Product
				</button>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Image</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Category</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Price</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Stock</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Sales</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{products.map((product) => (
							<motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									<img src={product.image} alt={product.name} className='w-12 h-12 rounded object-cover' />
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									{product.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									$ {product.price}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.stock}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.sales}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<div className='flex space-x-2'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleEdit(product)}>
											<Edit size={18} />
										</button>
										<button className='text-red-400 hover:text-red-300' onClick={() => handleDelete(product.id)}>
											<Trash2 size={18} />
										</button>
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default ProductsTable;
