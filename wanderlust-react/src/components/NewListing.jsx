// import React, { useState } from "react";
// import axios from "axios";

// const NewListing = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//     price: "",
//     country: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("description", formData.description);
//     form.append("image", formData.image);
//     form.append("price", formData.price);
//     form.append("country", formData.country);
//     form.append("location", formData.location);

//     try {
//       await axios.post("http://localhost:8080/listings", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Listing added successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         image: null,
//         price: "",
//         country: "",
//         location: "",
//       }); // Reset form
//     } catch (error) {
//       console.error("Error creating listing:", error);
//       alert("An error occurred while creating the listing.");
//     }
//   };

//   return (
//     <div className="row mt-3">
//       <div className="col-8 offset-2">
//         <h3 className="mt-3 mb-2">Create a New Listing</h3>
//         <form
//           onSubmit={handleSubmit}
//           className="needs-validation"
//           noValidate
//           encType="multipart/form-data"
//         >
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">Title</label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               className="form-control"
//               placeholder="Add a catchy title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//             <div className="valid-feedback">Title looks good!</div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               className="form-control"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//             <div className="invalid-feedback">Please enter a short description</div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">Upload Listing Image</label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               className="form-control"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="row">
//             <div className="mb-3 col-md-4">
//               <label htmlFor="price" className="form-label">Price</label>
//               <input
//                 id="price"
//                 name="price"
//                 placeholder="1200"
//                 type="text"
//                 className="form-control"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//               <div className="invalid-feedback">Price should be valid</div>
//             </div>

//             <div className="mb-3 col-md-8">
//               <label htmlFor="country" className="form-label">Country</label>
//               <input
//                 id="country"
//                 name="country"
//                 placeholder="India"
//                 type="text"
//                 className="form-control"
//                 value={formData.country}
//                 onChange={handleChange}
//                 required
//               />
//               <div className="invalid-feedback">Country name should be valid</div>
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="location" className="form-label">Location</label>
//             <input
//               id="location"
//               name="location"
//               placeholder="Jaipur, Rajasthan"
//               type="text"
//               className="form-control"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//             <div className="invalid-feedback">Location should be valid</div>
//           </div>

//           <button className="btn btn-dark my-3 add-btn" type="submit">Add</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewListing;

import React, { useState } from "react";
import axios from "axios";

const NewListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    country: "",
    location: "",
  });

  const token = localStorage.getItem('token'); // Ensure this is a fresh, valid token.

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to create a listing.");
      return;
    }

    if (!formData.title || !formData.image || !formData.price) {
      alert("Title, Price, and Image are required fields.");
      return;
    }

    // Validate that price is a number
    if (isNaN(formData.price)) {
      alert("Price must be a valid number.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("image", formData.image);
    form.append("price", formData.price);
    form.append("country", formData.country);
    form.append("location", formData.location);

    try {
      await axios.post("http://localhost:8080/api/listings", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Include valid token
        },
      });
      alert("Listing added successfully!");
      setFormData({
        title: "",
        description: "",
        image: null,
        price: "",
        country: "",
        location: "",
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      // This error could be due to an expired token; re-login the user if needed
      alert("An error occurred while creating the listing. Please ensure you are logged in with a valid token and try again.");
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3 className="mt-3 mb-2">Create a New Listing</h3>
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Add a catchy title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Listing Image</label>
            <input
              id="image"
              name="image"
              type="file"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                id="price"
                name="price"
                placeholder="1200"
                type="text"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                id="country"
                name="country"
                placeholder="India"
                type="text"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              name="location"
              placeholder="Jaipur, Rajasthan"
              type="text"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-dark my-3 add-btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
