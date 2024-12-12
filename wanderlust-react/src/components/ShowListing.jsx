// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // const ShowListing = () => {

// //     const [listing, setListing] = useState(null);
// //     const [reviews, setReviews] = useState([]);
// //     const [newReview, setNewReview] = useState({
// //         rating: 1,
// //         comment: '',
// //     });
// //     // console.log(listing)

// // const currentUser =localStorage.getItem('token')
// // const userid =localStorage.getItem('userid')
// // console.log('user id:' + userid)
// //     // const id = match.params.id;
// //     const { id } = useParams();
// //     // console.log(id)

// //     useEffect(() => {
// //         // Fetch listing data
// //         axios.get(`http://localhost:8080/api/listings/${id}`)
// //             .then(response => {
// //                 setListing(response.data);
// //                 setReviews(response.data.reviews);
// //                 console.log(listing)
// //             })
// //             .catch(error => console.error('Error fetching listing:', error));
// //     }, [id]);
// // console.log(listing)
// //     const handleReviewChange = (e) => {
// //         const { name, value } = e.target;
// //         setNewReview(prevState => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     const handleReviewSubmit = (e) => {
// //         e.preventDefault();
// //         if (currentUser) {
// //             axios.post(`http://localhost:8080/listings/${id}/reviews`, {
// //                 rating: newReview.rating,
// //                 comment: newReview.comment,
// //             })
// //             .then(response => {
// //                 setReviews([...reviews, response.data]);
// //                 setNewReview({ rating: 1, comment: '' });
// //             })
// //             .catch(error => console.error('Error submitting review:', error));
// //         }
// //     };

// //     const handleDeleteReview = (reviewId) => {
// //         axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`)
// //             .then(() => {
// //                 setReviews(reviews.filter(review => review._id !== reviewId));
// //             })
// //             .catch(error => console.error('Error deleting review:', error));
// //     };

// //     const handleDeleteListing = () => {
// //         axios.delete(`http://localhost:8080/api/listings/${id}`,{
// //             headers: {
// //               Authorization: `Bearer ${currentUser}`, // Send the token in the Authorization header
// //             },
// //           })
// //             .then(() => {
// //                 // Redirect or handle after deletion
// //                 alert('Listing deleted');
// //                 window.location.href="/listings"
// //             })
// //             .catch(error => console.error('Error deleting listing:', error));
// //     };

// //     if (!listing) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="container">
// //             <div className="row mt-3">
// //                 <div className="col-8 offset-3">
// //                     <h3>{listing.title}</h3>
// //                 </div>

// //                 <div className="card col-6 offset-3 show-card listing-card">
// //                     <img
// //                         src={`${listing.image.url}`}
// //                         className="card-img-top show-img"
// //                         alt="listing_image"
// //                     />
// //                     <div className="card-body">
// //                         <p className="card-text">Owned by <i>{listing.owner.username}</i></p>
// //                         <p className="card-text">{listing.description}</p>
// //                         <p className="card-text">&#8377; {listing.price.toLocaleString("en-IN")}</p>
// //                         <p className="card-text">{listing.location}</p>
// //                         <p className="card-text">{listing.country}</p>
// //                     </div>
// //                 </div>
// //             </div>

// //             {currentUser && listing.owner._id === userid && (
// //                 <div className="btns">
// //                     <a href={`/listings/${listing._id}/edit`} className="btn btn-dark col-1 offset-3 edit-btn">
// //                         Edit
// //                     </a>
// //                     <button onClick={handleDeleteListing} className="btn btn-dark offset-4">
// //                         Delete
// //                     </button>
// //                 </div>
// //             )}

// //             <div className="col-8 offset-3 mb-3">
// //                 <hr />
// //                 {currentUser && (
// //                     <>
// //                         <h4>Leave a Review</h4>
// //                         <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="rating" className="form-label">Rating</label>
// //                                 <fieldset className="starability-heart">
// //                                     {[1, 2, 3, 4, 5].map((star) => (
// //                                         <React.Fragment key={star}>
// //                                             <input
// //                                                 type="radio"
// //                                                 id={`rate-${star}`}
// //                                                 name="rating"
// //                                                 value={star}
// //                                                 checked={newReview.rating === star}
// //                                                 onChange={handleReviewChange}
// //                                             />
// //                                             <label htmlFor={`rate-${star}`} title={`${star} star`}>
// //                                                 {star} star{star > 1 && 's'}
// //                                             </label>
// //                                         </React.Fragment>
// //                                     ))}
// //                                 </fieldset>
// //                             </div>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="comment" className="form-label">Comments</label>
// //                                 <textarea
// //                                     name="comment"
// //                                     id="comment"
// //                                     cols="30"
// //                                     rows="5"
// //                                     className="form-control"
// //                                     value={newReview.comment}
// //                                     onChange={handleReviewChange}
// //                                     required
// //                                 ></textarea>
// //                                 <div className="invalid-feedback">
// //                                     Please add some comments for review
// //                                 </div>
// //                             </div>
// //                             <button className="btn btn-outline-dark">Submit</button>
// //                         </form>
// //                         <hr />
// //                     </>
// //                 )}

// //                 <p><b>All Reviews</b></p>

// //                 <div className="row">
// //                     {reviews.map((review) => (
// //                         <div className="card col-5 ms-3 mb-3" key={review._id}>
// //                             <div className="card-body">
// //                                 <h5 className="card-title">@{review.author.username}</h5>
// //                                 <p className="starability-result card-text" data-rating={review.rating}></p>
// //                                 <p className="card-text">{review.comment}</p>
// //                             </div>
// //                             {currentUser && review.author._id === currentUser._id && (
// //                                 <form
// //                                     onSubmit={(e) => {
// //                                         e.preventDefault();
// //                                         handleDeleteReview(review._id);
// //                                     }}
// //                                     className="mb-3"
// //                                 >
// //                                     <button type="submit" className="btn btn-sm btn-dark">Delete</button>
// //                                 </form>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ShowListing;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';

// // const ShowListing = () => {
// //     const [listing, setListing] = useState(null);
// //     const [reviews, setReviews] = useState([]);
// //     const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
// //     const [isEditing, setIsEditing] = useState(false); // Track if we are in editing mode
// //     const [updatedListing, setUpdatedListing] = useState({
// //         title: '',
// //         description: '',
// //         price: '',
// //         location: '',
// //         country: '',
// //     });

// //     const currentUser = localStorage.getItem('token');
// //     const userid = localStorage.getItem('userid');
// //     const { id } = useParams();
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Fetch listing data
// //         axios.get(`http://localhost:8080/api/listings/${id}`)
// //             .then(response => {
// //                 setListing(response.data);
// //                 setReviews(response.data.reviews);
// //                 setUpdatedListing({
// //                     title: response.data.title,
// //                     description: response.data.description,
// //                     price: response.data.price,
// //                     location: response.data.location,
// //                     country: response.data.country,
// //                 });
// //             })
// //             .catch(error => console.error('Error fetching listing:', error));
// //     }, [id]);

// //     const handleReviewChange = (e) => {
// //         const { name, value } = e.target;
// //         setNewReview(prevState => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     const handleReviewSubmit = (e) => {
// //         e.preventDefault();
// //         if (currentUser) {
// //             axios.post(`http://localhost:8080/listings/${id}/reviews`, {
// //                 rating: newReview.rating,
// //                 comment: newReview.comment,
// //             })
// //                 .then(response => {
// //                     setReviews([...reviews, response.data]);
// //                     setNewReview({ rating: 1, comment: '' });
// //                 })
// //                 .catch(error => console.error('Error submitting review:', error));
// //         }
// //     };

// //     const handleDeleteReview = (reviewId) => {
// //         axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`)
// //             .then(() => {
// //                 setReviews(reviews.filter(review => review._id !== reviewId));
// //             })
// //             .catch(error => console.error('Error deleting review:', error));
// //     };

// //     const handleDeleteListing = () => {
// //         axios.delete(`http://localhost:8080/api/listings/${id}`, {
// //             headers: { Authorization: `Bearer ${currentUser}` }
// //         })
// //             .then(() => {
// //                 alert('Listing deleted');
// //                 window.location.href = "/listings";
// //             })
// //             .catch(error => console.error('Error deleting listing:', error));
// //     };

// //     const handleUpdateListing = (e) => {
// //         e.preventDefault();
// //         if (currentUser) {
// //             axios.put(`http://localhost:8080/api/listings/${id}`, updatedListing, {
// //                 headers: { Authorization: `Bearer ${currentUser}` }
// //             })
// //                 .then(response => {
// //                     setListing(response.data); // Update the listing in state
// //                     setIsEditing(false); // Exit editing mode
// //                     alert('Listing updated successfully');
// //                     navigate(`/listings/${id}`); // Redirect to the updated listing page
// //                 })
// //                 .catch(error => console.error('Error updating listing:', error));
// //         }
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setUpdatedListing((prevState) => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     if (!listing) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="container">
// //             <div className="row mt-3">
// //                 <div className="col-8 offset-3">
// //                     <h3>{listing.title}</h3>
// //                 </div>

// //                 <div className="card col-6 offset-3 show-card listing-card">
// //                     <img
// //                         src={`${listing.image.url}`}
// //                         className="card-img-top show-img"
// //                         alt="listing_image"
// //                     />
// //                     <div className="card-body">
// //                         {isEditing ? (
// //                             <form onSubmit={handleUpdateListing}>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="title" className="form-label">Title</label>
// //                                     <input
// //                                         type="text"
// //                                         id="title"
// //                                         name="title"
// //                                         className="form-control"
// //                                         value={updatedListing.title}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="description" className="form-label">Description</label>
// //                                     <textarea
// //                                         id="description"
// //                                         name="description"
// //                                         className="form-control"
// //                                         value={updatedListing.description}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="price" className="form-label">Price</label>
// //                                     <input
// //                                         type="number"
// //                                         id="price"
// //                                         name="price"
// //                                         className="form-control"
// //                                         value={updatedListing.price}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="location" className="form-label">Location</label>
// //                                     <input
// //                                         type="text"
// //                                         id="location"
// //                                         name="location"
// //                                         className="form-control"
// //                                         value={updatedListing.location}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="country" className="form-label">Country</label>
// //                                     <input
// //                                         type="text"
// //                                         id="country"
// //                                         name="country"
// //                                         className="form-control"
// //                                         value={updatedListing.country}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <button className="btn btn-dark">Update Listing</button>
// //                             </form>
// //                         ) : (
// //                             <>
// //                                 <p className="card-text">Owned by <i>{listing.owner.username}</i></p>
// //                                 <p className="card-text">{listing.description}</p>
// //                                 <p className="card-text">&#8377; {listing.price.toLocaleString("en-IN")}</p>
// //                                 <p className="card-text">{listing.location}</p>
// //                                 <p className="card-text">{listing.country}</p>
// //                             </>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>

// //             {currentUser && listing.owner._id === userid && !isEditing && (
// //                 <div className="btns">
// //                     <button onClick={() => setIsEditing(true)} className="btn btn-dark offset-4">
// //                         Edit
// //                     </button>
// //                     <button onClick={handleDeleteListing} className="btn btn-dark offset-4">
// //                         Delete
// //                     </button>
// //                 </div>
// //             )}

// //             {isEditing && (
// //                 <div className="col-8 offset-3 mb-3">
// //                     <hr />
// //                     <button onClick={() => setIsEditing(false)} className="btn btn-outline-dark">
// //                         Cancel
// //                     </button>
// //                 </div>
// //             )}

// //             <div className="col-8 offset-3 mb-3">
// //                 <hr />
// //                 {currentUser && (
// //                     <>
// //                         <h4>Leave a Review</h4>
// //                         <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="rating" className="form-label">Rating</label>
// //                                 <fieldset className="starability-heart">
// //                                     {[1, 2, 3, 4, 5].map((star) => (
// //                                         <React.Fragment key={star}>
// //                                             <input
// //                                                 type="radio"
// //                                                 id={`rate-${star}`}
// //                                                 name="rating"
// //                                                 value={star}
// //                                                 checked={newReview.rating === star}
// //                                                 onChange={handleReviewChange}
// //                                             />
// //                                             <label htmlFor={`rate-${star}`} title={`${star} star`}>
// //                                                 {star} star{star > 1 && 's'}
// //                                             </label>
// //                                         </React.Fragment>
// //                                     ))}
// //                                 </fieldset>
// //                             </div>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="comment" className="form-label">Comments</label>
// //                                 <textarea
// //                                     name="comment"
// //                                     id="comment"
// //                                     cols="30"
// //                                     rows="5"
// //                                     className="form-control"
// //                                     value={newReview.comment}
// //                                     onChange={handleReviewChange}
// //                                     required
// //                                 ></textarea>
// //                                 <div className="invalid-feedback">
// //                                     Please add some comments for review
// //                                 </div>
// //                             </div>
// //                             <button className="btn btn-outline-dark">Submit</button>
// //                         </form>
// //                         <hr />
// //                     </>
// //                 )}

// //                 <p><b>All Reviews</b></p>

// //                 <div className="row">
// //                     {reviews.map((review) => (
// //                         <div className="card col-5 ms-3 mb-3" key={review._id}>
// //                             <div className="card-body">
// //                                 <h5 className="card-title">@{review.author.username}</h5>
// //                                 <p className="starability-result card-text" data-rating={review.rating}></p>
// //                                 <p className="card-text">{review.comment}</p>
// //                             </div>
// //                             {currentUser && review.author._id === currentUser._id && (
// //                                 <form
// //                                     onSubmit={(e) => {
// //                                         e.preventDefault();
// //                                         handleDeleteReview(review._id);
// //                                     }}
// //                                     className="mb-3"
// //                                 >
// //                                     <button type="submit" className="btn btn-sm btn-danger">Delete</button>
// //                                 </form>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ShowListing;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';

// // const ShowListing = () => {
// //     const [listing, setListing] = useState(null);
// //     const [reviews, setReviews] = useState([]);
// //     // console.log(reviews)
// //     console.log(listing)
// //     const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [updatedListing, setUpdatedListing] = useState({
// //         title: '',
// //         description: '',
// //         price: '',
// //         location: '',
// //         country: '',
// //         image: null, // For the updated image
// //     });

// //     const currentUser = localStorage.getItem('token');
// //     const userid = localStorage.getItem('userid');
// //     const { id } = useParams();
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Fetch listing data
// //         axios.get(`http://localhost:8080/api/listings/${id}`)
// //             .then(response => {
// //                 setListing(response.data);
// //                 setReviews(response.data.reviews);
// //                 setUpdatedListing({
// //                     title: response.data.title,
// //                     description: response.data.description,
// //                     price: response.data.price,
// //                     location: response.data.location,
// //                     country: response.data.country,
// //                     image: response.data.image.url, // Set the initial image URL
// //                 });
// //             })
// //             .catch(error => console.error('Error fetching listing:', error));
// //     }, [newReview]);

// //     const handleReviewChange = (e) => {
// //         const { name, value } = e.target;
// //         setNewReview(prevState => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     // const handleReviewSubmit = (e) => {
// //     //     e.preventDefault();
// //     //     if (currentUser) {
// //     //         axios.post(`http://localhost:8080/listings/${id}/reviews`, {
// //     //             rating: newReview.rating,
// //     //             comment: newReview.comment,
// //     //         })
// //     //             .then(response => {
// //     //                 setReviews([...reviews, response.data]);
// //     //                 setNewReview({ rating: 1, comment: '' });
// //     //             })
// //     //             .catch(error => console.error('Error submitting review:', error));
// //     //     }
// //     // };

// //     const handleReviewSubmit = (e) => {
// //         e.preventDefault();
// //         if (currentUser) {
// //             axios.post(`http://localhost:8080/api/reviews/${id}`, {
// //                 rating: newReview.rating,
// //                 comment: newReview.comment,
// //             }, {
// //                 headers: { Authorization: `Bearer ${currentUser}` }
// //             })
// //                 .then(response => {
// //                     setReviews([...reviews, response.data]);
// //                     setNewReview({ rating: 1, comment: '' });
// //                 })
// //                 .catch(error => console.error('Error submitting review:', error));
// //         }
// //     };

// //     const handleDeleteReview = (reviewId) => {
// //         axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`, {
// //             headers: { Authorization: `Bearer ${currentUser}` }
// //         })
// //             .then(() => {
// //                 setReviews(reviews.filter(review => review._id !== reviewId));
// //             })
// //             .catch(error => console.error('Error deleting review:', error));
// //     };

// //     const handleDeleteListing = () => {
// //         axios.delete(`http://localhost:8080/api/listings/${id}`, {
// //             headers: { Authorization: `Bearer ${currentUser}` }
// //         })
// //             .then(() => {
// //                 alert('Listing deleted');
// //                 window.location.href = "/listings";
// //             })
// //             .catch(error => console.error('Error deleting listing:', error));
// //     };

// //     const handleUpdateListing = (e) => {
// //         e.preventDefault();
// //         const formData = new FormData();
// //         formData.append('title', updatedListing.title);
// //         formData.append('description', updatedListing.description);
// //         formData.append('price', updatedListing.price);
// //         formData.append('location', updatedListing.location);
// //         formData.append('country', updatedListing.country);
// //         if (updatedListing.image) {
// //             formData.append('image', updatedListing.image);
// //         }

// //         if (currentUser) {
// //             axios.put(`http://localhost:8080/api/listings/${id}`, formData, {
// //                 headers: {
// //                     'Authorization': `Bearer ${currentUser}`,
// //                     'Content-Type': 'multipart/form-data',
// //                 }
// //             })
// //                 .then(response => {
// //                     setListing(response.data);
// //                     setIsEditing(false);
// //                     alert('Listing updated successfully');
// //                     // window.location.href('/listings')
// //                     // setTimeout()
// //                     navigate("/listings")

// //                 })
// //                 .catch(error => console.error('Error updating listing:', error));
// //         }
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setUpdatedListing((prevState) => ({
// //             ...prevState,
// //             [name]: value,
// //         }));
// //     };

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             setUpdatedListing((prevState) => ({
// //                 ...prevState,
// //                 image: file,
// //             }));
// //         }
// //     };

// //     if (!listing) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="container">
// //             <div className="row mt-3">
// //                 <div className="col-8 offset-3">
// //                     <h3>{listing.title}</h3>
// //                 </div>

// //                 <div className="card col-6 offset-3 show-card listing-card">
// //                     <img
// //                         src={listing.image?.url}
// //                         className="card-img-top show-img"
// //                         alt="listing_image"
// //                     />
// //                     <div className="card-body">
// //                         {isEditing ? (
// //                             <form onSubmit={handleUpdateListing} encType="multipart/form-data">
// //                                 <div className="mb-3">
// //                                     <label htmlFor="title" className="form-label">Title</label>
// //                                     <input
// //                                         type="text"
// //                                         id="title"
// //                                         name="title"
// //                                         className="form-control"
// //                                         value={updatedListing.title}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="description" className="form-label">Description</label>
// //                                     <textarea
// //                                         id="description"
// //                                         name="description"
// //                                         className="form-control"
// //                                         value={updatedListing.description}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="price" className="form-label">Price</label>
// //                                     <input
// //                                         type="number"
// //                                         id="price"
// //                                         name="price"
// //                                         className="form-control"
// //                                         value={updatedListing.price}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="location" className="form-label">Location</label>
// //                                     <input
// //                                         type="text"
// //                                         id="location"
// //                                         name="location"
// //                                         className="form-control"
// //                                         value={updatedListing.location}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="country" className="form-label">Country</label>
// //                                     <input
// //                                         type="text"
// //                                         id="country"
// //                                         name="country"
// //                                         className="form-control"
// //                                         value={updatedListing.country}
// //                                         onChange={handleChange}
// //                                         required
// //                                     />
// //                                 </div>
// //                                 <div className="mb-3">
// //                                     <label htmlFor="image" className="form-label">Upload Image</label>
// //                                     <input
// //                                         type="file"
// //                                         id="image"
// //                                         name="image"
// //                                         className="form-control"
// //                                         onChange={handleImageChange}
// //                                     />
// //                                 </div>
// //                                 <button className="btn btn-dark">Update Listing</button>
// //                             </form>
// //                         ) : (
// //                             <>
// //                                 <p className="card-text">Owned by <i>{listing.owner?.username}</i></p>
// //                                 <p className="card-text">{listing.description}</p>
// //                                 <p className="card-text">&#8377; {listing.price.toLocaleString("en-IN")}</p>
// //                                 <p className="card-text">{listing.location}</p>
// //                                 <p className="card-text">{listing.country}</p>
// //                             </>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //             <div className="row">
// //                 {currentUser && listing.owner?._id === userid && !isEditing && (
// //                     <div className="btns">
// //                         <button onClick={() => setIsEditing(true)} className="btn btn-dark offset-3">
// //                             Edit
// //                         </button>
// //                         <button onClick={handleDeleteListing} className="btn btn-danger offset-4">
// //                             Delete
// //                         </button>
// //                     </div>
// //                 )}
// //             </div>
// //             {isEditing && (
// //                 <div className="col-8 offset-3 mb-3">
// //                     <hr />
// //                     <button onClick={() => setIsEditing(false)} className="btn btn-outline-dark">
// //                         Cancel
// //                     </button>
// //                 </div>
// //             )}

// //             <div className="col-8 offset-3 mb-3">
// //                 <hr />
// //                 {currentUser && (
// //                     <>
// //                         <h4>Leave a Review</h4>
// //                         <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="rating" className="form-label">Rating</label>
// //                                 <fieldset className="starability-heart">
// //                                     {[1, 2, 3, 4, 5].map((star) => (
// //                                         <React.Fragment key={star}>
// //                                             <input
// //                                                 type="radio"
// //                                                 id={`rate-${star}`}
// //                                                 name="rating"
// //                                                 value={star}
// //                                                 checked={newReview.rating === star}
// //                                                 onChange={handleReviewChange}
// //                                             />
// //                                             <label htmlFor={`rate-${star}`} title={`${star} star`}>
// //                                                 {star} star{star > 1 && 's'}
// //                                             </label>
// //                                         </React.Fragment>
// //                                     ))}
// //                                 </fieldset>
// //                             </div>
// //                             <div className="mb-3 mt-3">
// //                                 <label htmlFor="comment" className="form-label">Comments</label>
// //                                 <textarea
// //                                     name="comment"
// //                                     id="comment"
// //                                     cols="30"
// //                                     rows="5"
// //                                     className="form-control"
// //                                     value={newReview.comment}
// //                                     onChange={handleReviewChange}
// //                                     required
// //                                 ></textarea>
// //                                 <div className="invalid-feedback">
// //                                     Please add some comments for review
// //                                 </div>
// //                             </div>
// //                             <button className="btn btn-outline-dark">Submit</button>
// //                         </form>
// //                         <hr />
// //                     </>
// //                 )}

// //                 <p><b>All Reviews</b></p>

// //                 <div className="row">
// //                     {reviews.map((review) => (
// //                         <div key={review._id} className="card col-5 ms-3 mb-3" >
// //                             <div className="card-body">
// //                                 <h5 className="card-title">@{review.author?.username}</h5>
// //                                 <p className="starability-result card-text" data-rating={review.rating}></p>
// //                                 <p className="card-text">{review.comment}</p>
// //                             </div>
// //                             {currentUser && review.author?._id === currentUser && (
// //                                 <form
// //                                     onSubmit={(e) => {
// //                                         e.preventDefault();
// //                                         handleDeleteReview(review._id);
// //                                     }}
// //                                     className="mb-3"
// //                                 >
// //                                     <button type="submit" className="btn btn-sm btn-danger">Delete</button>
// //                                 </form>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ShowListing;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ShowListing = () => {
//     const [listing, setListing] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     // console.log(reviews)
//     console.log(listing)
//     const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
//     const [isEditing, setIsEditing] = useState(false);
//     const [updatedListing, setUpdatedListing] = useState({
//         title: '',
//         description: '',
//         price: '',
//         location: '',
//         country: '',
//         image: null, // For the updated image
//     });

//     const currentUser = localStorage.getItem('token');
//     const userid = localStorage.getItem('userid');
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch listing data
//         axios.get(`http://localhost:8080/api/listings/${id}`)
//             .then(response => {
//                 setListing(response.data);
//                 setReviews(response.data.reviews);
//                 setUpdatedListing({
//                     title: response.data.title,
//                     description: response.data.description,
//                     price: response.data.price,
//                     location: response.data.location,
//                     country: response.data.country,
//                     image: response.data.image.url, // Set the initial image URL
//                 });
//             })
//             .catch(error => console.error('Error fetching listing:', error));
//     }, [newReview]);

//     const handleReviewChange = (e) => {
//         const { name, value } = e.target;
//         setNewReview(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // const handleReviewSubmit = (e) => {
//     //     e.preventDefault();
//     //     if (currentUser) {
//     //         axios.post(`http://localhost:8080/listings/${id}/reviews`, {
//     //             rating: newReview.rating,
//     //             comment: newReview.comment,
//     //         })
//     //             .then(response => {
//     //                 setReviews([...reviews, response.data]);
//     //                 setNewReview({ rating: 1, comment: '' });
//     //             })
//     //             .catch(error => console.error('Error submitting review:', error));
//     //     }
//     // };

//     const handleReviewSubmit = (e) => {
//         e.preventDefault();
//         if (currentUser) {
//             axios.post(`http://localhost:8080/api/reviews/${id}`, {
//                 rating: newReview.rating,
//                 comment: newReview.comment,
//             }, {
//                 headers: { Authorization: `Bearer ${currentUser}` }
//             })
//                 .then(response => {
//                     setReviews([...reviews, response.data]);
//                     setNewReview({ rating: 1, comment: '' });
//                 })
//                 .catch(error => console.error('Error submitting review:', error));
//         }
//     };

//     const handleDeleteReview = (reviewId) => {
//         axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`, {
//             headers: { Authorization: `Bearer ${currentUser}` }
//         })
//             .then(() => {
//                 setReviews(reviews.filter(review => review._id !== reviewId));
//             })
//             .catch(error => console.error('Error deleting review:', error));
//     };

//     const handleDeleteListing = () => {
//         axios.delete(`http://localhost:8080/api/listings/${id}`, {
//             headers: { Authorization: `Bearer ${currentUser}` }
//         })
//             .then(() => {
//                 alert('Listing deleted');
//                 window.location.href = "/listings";
//             })
//             .catch(error => console.error('Error deleting listing:', error));
//     };

//     const handleUpdateListing = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', updatedListing.title);
//         formData.append('description', updatedListing.description);
//         formData.append('price', updatedListing.price);
//         formData.append('location', updatedListing.location);
//         formData.append('country', updatedListing.country);
//         if (updatedListing.image) {
//             formData.append('image', updatedListing.image);
//         }

//         if (currentUser) {
//             axios.put(`http://localhost:8080/api/listings/${id}`, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${currentUser}`,
//                     'Content-Type': 'multipart/form-data',
//                 }
//             })
//                 .then(response => {
//                     setListing(response.data);
//                     setIsEditing(false);
//                     alert('Listing updated successfully');
//                     // window.location.href('/listings')
//                     // setTimeout()
//                     navigate("/listings")

//                 })
//                 .catch(error => console.error('Error updating listing:', error));
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedListing((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setUpdatedListing((prevState) => ({
//                 ...prevState,
//                 image: file,
//             }));
//         }
//     };

//     if (!listing) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container">
//             <div className="row mt-3">
//                 <div className="col-8 offset-3">
//                     <h3>{listing.title}</h3>
//                 </div>

//                 <div className="card col-6 offset-3 show-card listing-card">
//                     <img
//                         src={listing.image?.url}
//                         className="card-img-top show-img"
//                         alt="listing_image"
//                     />
//                     <div className="card-body">
//                         {isEditing ? (
//                             <form onSubmit={handleUpdateListing} encType="multipart/form-data">
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title</label>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         name="title"
//                                         className="form-control"
//                                         value={updatedListing.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description</label>
//                                     <textarea
//                                         id="description"
//                                         name="description"
//                                         className="form-control"
//                                         value={updatedListing.description}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="price" className="form-label">Price</label>
//                                     <input
//                                         type="number"
//                                         id="price"
//                                         name="price"
//                                         className="form-control"
//                                         value={updatedListing.price}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="location" className="form-label">Location</label>
//                                     <input
//                                         type="text"
//                                         id="location"
//                                         name="location"
//                                         className="form-control"
//                                         value={updatedListing.location}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="country" className="form-label">Country</label>
//                                     <input
//                                         type="text"
//                                         id="country"
//                                         name="country"
//                                         className="form-control"
//                                         value={updatedListing.country}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="image" className="form-label">Upload Image</label>
//                                     <input
//                                         type="file"
//                                         id="image"
//                                         name="image"
//                                         className="form-control"
//                                         onChange={handleImageChange}
//                                     />
//                                 </div>
//                                 <button className="btn btn-dark">Update Listing</button>
//                             </form>
//                         ) : (
//                             <>
//                                 <p className="card-text">Owned by <i>{listing.owner?.username}</i></p>
//                                 <p className="card-text">{listing.description}</p>
//                                 <p className="card-text">&#8377; {listing.price.toLocaleString("en-IN")}</p>
//                                 <p className="card-text">{listing.location}</p>
//                                 <p className="card-text">{listing.country}</p>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 {currentUser && listing.owner?._id === userid && !isEditing && (
//                     <div className="btns">
//                         <button onClick={() => setIsEditing(true)} className="btn btn-dark offset-3">
//                             Edit
//                         </button>
//                         <button onClick={handleDeleteListing} className="btn btn-danger offset-4">
//                             Delete
//                         </button>
//                     </div>
//                 )}
//             </div>
//             {isEditing && (
//                 <div className="col-8 offset-3 mb-3">
//                     <hr />
//                     <button onClick={() => setIsEditing(false)} className="btn btn-outline-dark">
//                         Cancel
//                     </button>
//                 </div>
//             )}

//             <div className="col-8 offset-3 mb-3">
//                 <hr />
//                 {currentUser && (
//                     <>
//                         <h4>Leave a Review</h4>
//                         <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
//                             <div className="mb-3 mt-3">
//                                 <label htmlFor="rating" className="form-label">Rating</label>
//                                 <fieldset className="starability-heart">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <React.Fragment key={star}>
//                                             <input
//                                                 type="radio"
//                                                 id={`rate-${star}`}
//                                                 name="rating"
//                                                 value={star}
//                                                 checked={newReview.rating === star}
//                                                 onChange={handleReviewChange}
//                                             />
//                                             <label htmlFor={`rate-${star}`} title={`${star} star`}>
//                                                 {star} star{star > 1 && 's'}
//                                             </label>
//                                         </React.Fragment>
//                                     ))}
//                                 </fieldset>
//                             </div>
//                             <div className="mb-3 mt-3">
//                                 <label htmlFor="comment" className="form-label">Comments</label>
//                                 <textarea
//                                     name="comment"
//                                     id="comment"
//                                     cols="30"
//                                     rows="5"
//                                     className="form-control"
//                                     value={newReview.comment}
//                                     onChange={handleReviewChange}
//                                     required
//                                 ></textarea>
//                                 <div className="invalid-feedback">
//                                     Please add some comments for review
//                                 </div>
//                             </div>
//                             <button className="btn btn-outline-dark">Submit</button>
//                         </form>
//                         <hr />
//                     </>
//                 )}

//                 <p><b>All Reviews</b></p>

//                 <div className="row">
//                     {reviews.map((review) => (
//                         <div key={review._id} className="card col-5 ms-3 mb-3" >
//                             <div className="card-body">
//                                 <h5 className="card-title">@{review.author?.username}</h5>
//                                 <p className="starability-result card-text" data-rating={review.rating}></p>
//                                 <p className="card-text">{review.comment}</p>
//                             </div>
//                             {currentUser && review.author?._id === currentUser && (
//                                 <form
//                                     onSubmit={(e) => {
//                                         e.preventDefault();
//                                         handleDeleteReview(review._id);
//                                     }}
//                                     className="mb-3"
//                                 >
//                                     <button type="submit" className="btn btn-sm btn-danger">Delete</button>
//                                 </form>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShowListing;



// frontend/src/components/ShowListing.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ShowListing = () => {
//     const [listing, setListing] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
//     const [isEditing, setIsEditing] = useState(false);
//     const [updatedListing, setUpdatedListing] = useState({
//         title: '',
//         description: '',
//         price: '',
//         location: '',
//         country: '',
//         image: null, // For the updated image
//     });
//     const [error, setError] = useState(null);

//     const currentUserToken = localStorage.getItem('token'); // JWT token
//     const userId = localStorage.getItem('userid'); // User ID
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch listing data
//         axios.get(`http://localhost:8080/api/listings/${id}`)
//             .then(response => {
//                 if (response.data.listing) {
//                     setListing(response.data.listing);
//                     setReviews(response.data.listing.reviews);
//                     setUpdatedListing({
//                         title: response.data.listing.title,
//                         description: response.data.listing.description,
//                         price: response.data.listing.price,
//                         location: response.data.listing.location,
//                         country: response.data.listing.country,
//                         image: null, // Reset image; will handle separately
//                     });
//                 } else {
//                     setError('Listing data is unavailable.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching listing:', error);
//                 setError('Failed to fetch listing. Please try again later.');
//             });
//     }, [id]);

//     const handleReviewChange = (e) => {
//         const { name, value } = e.target;
//         setNewReview(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleReviewSubmit = (e) => {
//         e.preventDefault();
//         if (currentUserToken) {
//             axios.post(`http://localhost:8080/api/reviews/${id}`, {
//                 rating: newReview.rating,
//                 comment: newReview.comment,
//             }, {
//                 headers: { Authorization: `Bearer ${currentUserToken}` }
//             })
//                 .then(response => {
//                     setReviews([...reviews, response.data.review]); // Assuming API returns the created review
//                     setNewReview({ rating: 1, comment: '' });
//                 })
//                 .catch(error => {
//                     console.error('Error submitting review:', error);
//                     alert('Failed to submit review. Please try again.');
//                 });
//         } else {
//             alert('You must be logged in to submit a review.');
//         }
//     };

//     const handleDeleteReview = (reviewId) => {
//         if (window.confirm('Are you sure you want to delete this review?')) {
//             axios.delete(`http://localhost:8080/api/reviews/${reviewId}`, {
//                 headers: { Authorization: `Bearer ${currentUserToken}` }
//             })
//                 .then(() => {
//                     setReviews(reviews.filter(review => review._id !== reviewId));
//                 })
//                 .catch(error => {
//                     console.error('Error deleting review:', error);
//                     alert('Failed to delete review. Please try again.');
//                 });
//         }
//     };

//     const handleDeleteListing = () => {
//         if (window.confirm('Are you sure you want to delete this listing?')) {
//             axios.delete(`http://localhost:8080/api/listings/${id}`, {
//                 headers: { Authorization: `Bearer ${currentUserToken}` }
//             })
//                 .then(() => {
//                     alert('Listing deleted successfully.');
//                     navigate('/listings');
//                 })
//                 .catch(error => {
//                     console.error('Error deleting listing:', error);
//                     alert('Failed to delete listing. Please try again.');
//                 });
//         }
//     };

//     const handleUpdateListing = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', updatedListing.title);
//         formData.append('description', updatedListing.description);
//         formData.append('price', updatedListing.price);
//         formData.append('location', updatedListing.location);
//         formData.append('country', updatedListing.country);
//         if (updatedListing.image) {
//             formData.append('image', updatedListing.image);
//         }

//         if (currentUserToken) {
//             axios.put(`http://localhost:8080/api/listings/${id}`, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${currentUserToken}`,
//                     'Content-Type': 'multipart/form-data',
//                 }
//             })
//                 .then(response => {
//                     setListing(response.data.listing);
//                     setIsEditing(false);
//                     alert('Listing updated successfully.');
//                     navigate(`/listings/${id}`); // Redirect to the updated listing
//                 })
//                 .catch(error => {
//                     console.error('Error updating listing:', error);
//                     alert('Failed to update listing. Please try again.');
//                 });
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedListing((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setUpdatedListing((prevState) => ({
//                 ...prevState,
//                 image: file,
//             }));
//         }
//     };

//     // Determine if the current user is the owner of the listing
//     const isOwner = listing && listing.owner && listing.owner._id === userId;

//     if (error) {
//         return <div className="container"><p className="error">{error}</p></div>;
//     }

//     if (!listing) {
//         return <div className="container"><p>Loading listing...</p></div>;
//     }

//     return (
//         <div className="container">
//             <div className="row mt-3">
//                 <div className="col-8 offset-3">
//                     <h3>{listing.title}</h3>
//                 </div>

//                 <div className="card col-6 offset-3 show-card listing-card">
//                     <img
//                         src={listing.image?.url || "https://via.placeholder.com/400"} // Placeholder if image.url is undefined
//                         className="card-img-top show-img"
//                         alt={listing.title}
//                         style={{ height: "20rem", objectFit: "cover" }}
//                     />
//                     <div className="card-body">
//                         {isEditing ? (
//                             <form onSubmit={handleUpdateListing} encType="multipart/form-data">
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title</label>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         name="title"
//                                         className="form-control"
//                                         value={updatedListing.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description</label>
//                                     <textarea
//                                         id="description"
//                                         name="description"
//                                         className="form-control"
//                                         value={updatedListing.description}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="price" className="form-label">Price (per night)</label>
//                                     <input
//                                         type="number"
//                                         id="price"
//                                         name="price"
//                                         className="form-control"
//                                         value={updatedListing.price}
//                                         onChange={handleChange}
//                                         required
//                                         min="0"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="location" className="form-label">Location</label>
//                                     <input
//                                         type="text"
//                                         id="location"
//                                         name="location"
//                                         className="form-control"
//                                         value={updatedListing.location}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="country" className="form-label">Country</label>
//                                     <input
//                                         type="text"
//                                         id="country"
//                                         name="country"
//                                         className="form-control"
//                                         value={updatedListing.country}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="image" className="form-label">Upload Image</label>
//                                     <input
//                                         type="file"
//                                         id="image"
//                                         name="image"
//                                         className="form-control"
//                                         onChange={handleImageChange}
//                                         accept="image/*"
//                                     />
//                                 </div>
//                                 <button className="btn btn-dark">Update Listing</button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary ms-2"
//                                     onClick={() => setIsEditing(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         ) : (
//                             <>
//                                 <p className="card-text">Owned by <i>{listing.owner?.username || 'Unknown'}</i></p>
//                                 <p className="card-text">{listing.description}</p>
//                                 <p className="card-text">&#8377; {listing.price ? listing.price.toLocaleString("en-IN") : "N/A"} / night</p>
//                                 <p className="card-text">{listing.location}</p>
//                                 <p className="card-text">{listing.country}</p>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Edit and Delete Buttons */}
//             {isOwner && !isEditing && (
//                 <div className="row mt-3">
//                     <div className="col-6 offset-3 d-flex justify-content-start">
//                         <button onClick={() => setIsEditing(true)} className="btn btn-dark me-2">
//                             Edit
//                         </button>
//                         <button onClick={handleDeleteListing} className="btn btn-danger">
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Reviews Section */}
//             <div className="row mt-4">
//                 <div className="col-8 offset-3">
//                     <hr />
//                     {currentUserToken && (
//                         <>
//                             <h4>Leave a Review</h4>
//                             <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
//                                 <div className="mb-3 mt-3">
//                                     <label htmlFor="rating" className="form-label">Rating</label>
//                                     <fieldset className="starability-heart">
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <React.Fragment key={star}>
//                                                 <input
//                                                     type="radio"
//                                                     id={`rate-${star}`}
//                                                     name="rating"
//                                                     value={star}
//                                                     checked={newReview.rating === star}
//                                                     onChange={handleReviewChange}
//                                                     required
//                                                 />
//                                                 <label htmlFor={`rate-${star}`} title={`${star} star`}>
//                                                     {star} star{star > 1 && 's'}
//                                                 </label>
//                                             </React.Fragment>
//                                         ))}
//                                     </fieldset>
//                                 </div>
//                                 <div className="mb-3 mt-3">
//                                     <label htmlFor="comment" className="form-label">Comments</label>
//                                     <textarea
//                                         name="comment"
//                                         id="comment"
//                                         cols="30"
//                                         rows="5"
//                                         className="form-control"
//                                         value={newReview.comment}
//                                         onChange={handleReviewChange}
//                                         required
//                                     ></textarea>
//                                     <div className="invalid-feedback">
//                                         Please add some comments for review.
//                                     </div>
//                                 </div>
//                                 <button className="btn btn-outline-dark">Submit</button>
//                             </form>
//                             <hr />
//                         </>
//                     )}

//                     <h4>All Reviews</h4>

//                     {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                             <div key={review._id} className="card mb-3">
//                                 <div className="card-body">
//                                     <h5 className="card-title">@{review.author?.username || 'Anonymous'}</h5>
//                                     <p className="starability-result" data-rating={review.rating}></p>
//                                     <p className="card-text">{review.comment}</p>
//                                     {currentUserToken && review.author?._id === userId && (
//                                         <button
//                                             className="btn btn-sm btn-danger"
//                                             onClick={() => handleDeleteReview(review._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No reviews yet. Be the first to review!</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShowListing;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ShowListing = () => {
    const [listing, setListing] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [updatedListing, setUpdatedListing] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: '',
        image: null, // For the updated image
    });
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch listing data
        axios.get(`http://localhost:8080/api/listings/${id}`)
            .then(response => {
                if (response.data.listing) {
                    setListing(response.data.listing);
                    setReviews(response.data.listing.reviews);
                    setUpdatedListing({
                        title: response.data.listing.title,
                        description: response.data.listing.description,
                        price: response.data.listing.price,
                        location: response.data.listing.location,
                        country: response.data.listing.country,
                        image: null, // Reset image; will handle separately
                    });
                } else {
                    setError('Listing data is unavailable.');
                }
            })
            .catch(error => {
                console.error('Error fetching listing:', error);
                setError('Failed to fetch listing. Please try again later.');
            });
    }, [id]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // No authentication: directly post review
        axios.post(`http://localhost:8080/api/reviews/${id}`, {
            rating: newReview.rating,
            comment: newReview.comment,
        })
            .then(response => {
                // Assuming API returns {review: {...}}
                setReviews([...reviews, response.data.review]);
                setNewReview({ rating: 1, comment: '' });
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                alert('Failed to submit review. Please try again.');
            });
    };

    const handleDeleteReview = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            // No authentication: directly delete review
            axios.delete(`http://localhost:8080/api/reviews/${reviewId}`)
                .then(() => {
                    setReviews(reviews.filter(review => review._id !== reviewId));
                })
                .catch(error => {
                    console.error('Error deleting review:', error);
                    alert('Failed to delete review. Please try again.');
                });
        }
    };

    const handleDeleteListing = () => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            // No authentication: directly delete listing
            axios.delete(`http://localhost:8080/api/listings/${id}`)
                .then(() => {
                    alert('Listing deleted successfully.');
                    navigate('/listings');
                })
                .catch(error => {
                    console.error('Error deleting listing:', error);
                    alert('Failed to delete listing. Please try again.');
                });
        }
    };

    const handleUpdateListing = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', updatedListing.title);
        formData.append('description', updatedListing.description);
        formData.append('price', updatedListing.price);
        formData.append('location', updatedListing.location);
        formData.append('country', updatedListing.country);
        if (updatedListing.image) {
            formData.append('image', updatedListing.image);
        }

        // No authentication: directly update listing
        axios.put(`http://localhost:8080/api/listings/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                setListing(response.data.listing);
                setIsEditing(false);
                alert('Listing updated successfully.');
                navigate(`/listings/${id}`);
            })
            .catch(error => {
                console.error('Error updating listing:', error);
                alert('Failed to update listing. Please try again.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedListing((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedListing((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    if (error) {
        return <div className="container"><p className="error">{error}</p></div>;
    }

    if (!listing) {
        return <div className="container"><p>Loading listing...</p></div>;
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-8 offset-3">
                    <h3>{listing.title}</h3>
                </div>

                <div className="card col-6 offset-3 show-card listing-card">
                    <img
                        src={listing.image?.url || "https://via.placeholder.com/400"}
                        className="card-img-top show-img"
                        alt={listing.title}
                        style={{ height: "20rem", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        {isEditing ? (
                            <form onSubmit={handleUpdateListing} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        value={updatedListing.title}
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
                                        value={updatedListing.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price (per night)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        value={updatedListing.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className="form-control"
                                        value={updatedListing.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        className="form-control"
                                        value={updatedListing.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Upload Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="form-control"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button className="btn btn-dark">Update Listing</button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <p className="card-text">Owned by <i>{listing.owner?.username || 'Unknown'}</i></p>
                                <p className="card-text">{listing.description}</p>
                                <p className="card-text">&#8377; {listing.price ? listing.price.toLocaleString("en-IN") : "N/A"} / night</p>
                                <p className="card-text">{listing.location}</p>
                                <p className="card-text">{listing.country}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit and Delete Buttons */}
            {!isEditing && (
                <div className="row mt-3">
                    <div className="col-6 offset-3 d-flex justify-content-start">
                        <button onClick={() => setIsEditing(true)} className="btn btn-dark me-2">
                            Edit
                        </button>
                        <button onClick={handleDeleteListing} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="row mt-4">
                <div className="col-8 offset-3">
                    <hr />
                    <h4>Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="needs-validation" noValidate>
                        <div className="mb-3 mt-3">
                            <label htmlFor="rating" className="form-label">Rating</label>
                            <fieldset className="starability-heart">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <React.Fragment key={star}>
                                        <input
                                            type="radio"
                                            id={`rate-${star}`}
                                            name="rating"
                                            value={star}
                                            checked={newReview.rating === star}
                                            onChange={handleReviewChange}
                                            required
                                        />
                                        <label htmlFor={`rate-${star}`} title={`${star} star`}>
                                            {star} star{star > 1 && 's'}
                                        </label>
                                    </React.Fragment>
                                ))}
                            </fieldset>
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="comment" className="form-label">Comments</label>
                            <textarea
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="5"
                                className="form-control"
                                value={newReview.comment}
                                onChange={handleReviewChange}
                                required
                            ></textarea>
                            <div className="invalid-feedback">
                                Please add some comments for review.
                            </div>
                        </div>
                        <button className="btn btn-outline-dark">Submit</button>
                    </form>
                    <hr />

                    <h4>All Reviews</h4>

                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">@{review.author?.username || 'Anonymous'}</h5>
                                    <p className="starability-result" data-rating={review.rating}></p>
                                    <p className="card-text">{review.comment}</p>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteReview(review._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowListing;
