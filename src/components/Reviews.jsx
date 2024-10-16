import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { reviewsAtom, reviewsSelector, hasBoughtSelector } from '../store/reviews';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Reviews = ({ productId }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
// console.log(productId);
  const reviewsLoadable = useRecoilValueLoadable(reviewsSelector(productId));
  const hasBought = useRecoilValueLoadable(hasBoughtSelector(productId));
  const [reviews, setReviews] = useRecoilState(reviewsAtom);

  const productReviews = reviews[productId] || [];
  const averageRating =
  productReviews.length > 0
    ? (
        productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length
      ).toFixed(1)
    : 'No ratings yet';



    useEffect(() => {
      if (reviewsLoadable.state === 'hasValue') {
        console.log(reviewsLoadable.contents);

        const fetchedReviews = Array.isArray(reviewsLoadable.contents) 
          ? reviewsLoadable.contents 
          : [];
    
        setReviews((prev) => ({
          ...prev,
          [productId]: fetchedReviews,
        }));
      }
    }, [reviewsLoadable.state, productId, setReviews]);
    

const handleReviewSubmit = async () => {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/reviews/${productId}`,
      { comment: newComment, rating: newRating },
      { headers: { Authorization: `${localStorage.getItem('token')}` } }
    );
    setReviews((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), data],
    }));
    setNewComment('');
    setNewRating(0);
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};

  if (reviewsLoadable.state === 'loading' || hasBought.state === 'loading') {
    return (
      <div className='flex w-full justify-center items-center p-4'><AiOutlineLoading3Quarters className='mr-2 text-4xl text-primary animate-spin'/> loading Reviews</div>
    )
  }

  return (
    <div className="bg-background rounded p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {hasBought.contents && (
        <div className="mb-4">
          <div className='flex'>
          <input
            type="number"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            className="mb-2 p-2 text-center border-backgrounds bg-backgrounds rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rating (1-5)"
          /> <div className='text-xl mb-2 flex justify-center items-center'>/5</div>
          <div className='mx-auto text-sm flex items-center mb-2 text-text/20'>(1-Unsatisfied,5-Fully-Satisfied)</div>
          </div>
          <textarea
            className="w-full p-2 border-backgrounds rounded bg-backgrounds focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your review here..."
          />
          
          <button
            className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
            onClick={handleReviewSubmit}
            disabled={!newComment.trim() || newRating < 1 || newRating > 5}
          >
            Submit Review
          </button>
        </div>
      )}

      {productReviews.length > 0 ? (
        <ul className="space-y-4">
          {productReviews.map((review, index) => (
            <li key={index} className="border-b pb-2">
              <div className='flex items-center '>
                <div className='mr-3 bg-backgrounds rounded-full size-10 flex justify-center items-center'>{review.user_id.userName[0].toUpperCase()}</div>
              <div>
              <div className='flex'>
                <p className="font-semibold text-xl capitalize">{review.user_id.userName}</p>
                <p className="text-text pl-2">({review.rating} / 5)</p>
              </div>
              <p className="text-text ">{review.comment}</p>
              <p className="text-xs text-text/20">
                {new Date(review.created_at).toLocaleString()}
              </p>
              </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default Reviews;
