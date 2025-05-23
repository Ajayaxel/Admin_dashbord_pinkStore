

// import React, { useState } from "react";
// import { BASE_URL } from "../../utils/api";

// const AddProductForm = () => {
//   const [formData, setFormData] = useState({
//     sku: "",
//     dateAdded: "",
//     brand: "",
//     weight: "",
//     productName: "",
//     category: "",
//     deliveryTime: "",
//     shortDescription: "",
//     shortDescription2: "",
//     images: [],
//     sizeVariants: [""],
//     colorVariants: [""],
//     material: [""],
//     stockQuantity: 0,
//     price: 0,
//     discount: 0,
//     productDescription: "",
//     careInstructions: "",
//   });

//   const [previewImages, setPreviewImages] = useState([]);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["sizeVariants", "colorVariants", "material"].includes(name)) {
//       setFormData((prev) => ({ ...prev, [name]: [value] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       images: files,
//     }));

//     const previews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages(previews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setMessage("❌ No token found. Please log in first.");
//       return;
//     }

//     try {
//       const form = new FormData();
//       for (const key in formData) {
//         if (Array.isArray(formData[key])) {
//           if (key === "images") {
//             formData.images.forEach((file) => form.append("images", file));
//           } else {
//             form.append(key, JSON.stringify(formData[key]));
//           }
//         } else {
//           form.append(key, formData[key]);
//         }
//       }

//       const response = await fetch(`${BASE_URL}/products/add`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: form,
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setMessage("✅ Product added successfully!");
//         setFormData({
//           sku: "",
//           dateAdded: "",
//           brand: "",
//           weight: "",
//           productName: "",
//           category: "",
//           deliveryTime: "",
//           shortDescription: "",
//           shortDescription2: "",
//           images: [],
//           sizeVariants: [""],
//           colorVariants: [""],
//           material: [""],
//           stockQuantity: 0,
//           price: 0,
//           discount: 0,
//           productDescription: "",
//           careInstructions: "",
//         });
//         setPreviewImages([]);
//       } else {
//         throw new Error(result.message || "API error");
//       }
//     } catch (error) {
//       setMessage("❌ Error: " + error.message);
//     }
//   };

//   const fields = [
//     "sku",
//     "dateAdded",
//     "brand",
//     "weight (g)",
//     "productName",
//     "category",
//     "deliveryTime",
//     "shortDescription",
//     "shortDescription2",
//     "sizeVariants",
//     "colorVariants",
//     "material",
//     "stockQuantity",
//     "price",
//     "discount %",
//     "productDescription",
//     "careInstructions",
//   ];

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-8 mt-10 bg-gray-600 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300">
//       <h2 className="text-3xl font-bold text-center text-white mb-8">🛍️ Add New Product</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {fields.map((field) => (
//           <div key={field} className="flex flex-col">
//             <label className="mb-2 text-sm text-gray-400">
//               {field.replace(/([A-Z])/g, " $1")}
//             </label>
//             <input
//               type={
//                 ["stockQuantity", "price", "discount"].includes(field)
//                   ? "number"
//                   : field === "dateAdded"
//                   ? "date"
//                   : "text"
//               }
//               name={field}
//               value={Array.isArray(formData[field]) ? formData[field][0] : formData[field]}
//               onChange={handleChange}
//               className="w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
//               required
//             />
//           </div>
//         ))}

//         <div className="md:col-span-2">
//           <label className="mb-2 block text-sm text-gray-400">Upload Images</label>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
//             required
//           />
//         </div>

//         {previewImages.length > 0 && (
//           <div className="md:col-span-2">
//             <label className="block mb-2 text-gray-100 font-semibold">Image Preview</label>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {previewImages.map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   alt={`preview-${index}`}
//                   className="w-full h-40 object-cover rounded-lg border border-gray-300"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition"
//           >
//             Add Product
//           </button>
//         </div>
//       </form>

//       {message && (
//         <div className="mt-6 text-center text-lg font-medium">
//           <p className={message.startsWith("✅") ? "text-green-500" : "text-red-500"}>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProductForm;



import React, { useState } from "react";
import { BASE_URL } from "../../utils/api";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    sku: "",
    brand: "",
    weight: "",
    productName: "",
    category: "",
    deliveryTime: "",
    shortDescription: "",
    productDescription: "",
    careInstructions: "",
    stockQuantity: 0,
    price: 0,
    discount: 0,
    colorVariants: [""],
    material: [""],
    sizeVariants: {
      indian: [],
      pakistan: [],
    },
    images: [],
    // Fashion-specific fields
    neck: "",
    topDesignStyling: "",
    topFabric: "",
    bottomFabric: "",
    dupattaFabric: "",
    weavePattern: "",
    stitch: "",
    printOrPattern: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["colorVariants", "material"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeChange = (region, size) => {
    setFormData((prev) => {
      const currentSizes = prev.sizeVariants[region];
      const updatedSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size];

      return {
        ...prev,
        sizeVariants: {
          ...prev.sizeVariants,
          [region]: updatedSizes,
        },
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ No token found. Please log in.");
      return;
    }

    try {
      const form = new FormData();

      for (const key in formData) {
        if (key === "images") {
          formData.images.forEach((file) => form.append("images", file));
        } else if (key === "sizeVariants") {
          form.append("sizeVariants[indian]", formData.sizeVariants.indian.join(","));
          form.append("sizeVariants[pakistan]", formData.sizeVariants.pakistan.join(","));
        } else if (Array.isArray(formData[key])) {
          form.append(key, formData[key].join(","));
        } else {
          form.append(key, formData[key]);
        }
      }

      const response = await fetch(`${BASE_URL}/products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("✅ Product added successfully!");
        setFormData({
          sku: "",
          brand: "",
          weight: "",
          productName: "",
          category: "",
          deliveryTime: "",
          shortDescription: "",
          productDescription: "",
          careInstructions: "",
          stockQuantity: 0,
          price: 0,
          discount: 0,
          colorVariants: [""],
          material: [""],
          sizeVariants: { indian: [], pakistan: [] },
          images: [],
          neck: "",
          topDesignStyling: "",
          topFabric: "",
          bottomFabric: "",
          dupattaFabric: "",
          weavePattern: "",
          stitch: "",
          printOrPattern: "",
        });
        setPreviewImages([]);
      } else {
        throw new Error(result.message || "API error");
      }
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  const indianSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
  const pakistanSizes = ["36", "38", "40", "42", "44", "46"];

  const fashionFields = [
    { name: "neck", label: "Neck" },
    { name: "topDesignStyling", label: "Top Design Styling" },
    { name: "topFabric", label: "Top Fabric" },
    { name: "bottomFabric", label: "Bottom Fabric" },
    { name: "dupattaFabric", label: "Dupatta Fabric" },
    { name: "weavePattern", label: "Weave Pattern" },
    { name: "stitch", label: "Stitch" },
    { name: "printOrPattern", label: "Print or Pattern" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 mt-10 bg-gray-600 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-white mb-8">🛍️ Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...[
          { name: "sku", label: "SKU" },
          { name: "brand", label: "Brand" },
          { name: "weight", label: "Weight (g)" },
          { name: "productName", label: "Product Name" },
          { name: "category", label: "Category" },
          { name: "deliveryTime", label: "Delivery Time" },
          { name: "shortDescription", label: "Short Description" },
          { name: "productDescription", label: "Product Description" },
          { name: "careInstructions", label: "Care Instructions" },
          { name: "stockQuantity", label: "Stock Quantity", type: "number" },
          { name: "price", label: "Price", type: "number" },
          { name: "discount", label: "Discount (%)", type: "number" },
        ], ...fashionFields].map(({ name, label, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
              required={name === "productName" || name === "price"}
            />
          </div>
        ))}

        {["colorVariants", "material"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field].join(",")}
              onChange={handleChange}
              placeholder="Comma separated e.g. Red,Blue"
              className="w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
            />
          </div>
        ))}

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400 font-medium">Size Variants (Indian)</label>
            <div className="flex flex-wrap gap-2">
              {indianSizes.map((size) => (
                <label key={size} className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={formData.sizeVariants.indian.includes(size)}
                    onChange={() => handleSizeChange("indian", size)}
                    className="form-checkbox h-4 w-4 text-purple-600"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400 font-medium">Size Variants (Pakistan)</label>
            <div className="flex flex-wrap gap-2">
              {pakistanSizes.map((size) => (
                <label key={size} className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={formData.sizeVariants.pakistan.includes(size)}
                    onChange={() => handleSizeChange("pakistan", size)}
                    className="form-checkbox h-4 w-4 text-purple-600"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-gray-400">Upload Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
            required
          />
        </div>

        {previewImages.length > 0 && (
          <div className="md:col-span-2">
            <label className="block mb-2 text-gray-100 font-semibold">Image Preview</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="w-full h-40 object-cover rounded-lg border border-gray-300"
                />
              ))}
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition"
          >
            Add Product
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-6 text-center text-lg font-medium">
          <p className={message.startsWith("✅") ? "text-green-500" : "text-red-500"}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
