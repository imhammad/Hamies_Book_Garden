import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AuthModal from "./AuthModal";

export default function ReviewSystem({ bookTitle }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
    checkUser();
  }, [bookTitle]);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("book_title", bookTitle)
      .order("created_at", { ascending: false });

    if (!error) setReviews(data || []);
  };

  const handlePostReview = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!rating || !comment.trim()) {
      alert("Please add a rating and comment");
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        book_title: bookTitle,
        user_id: user.id,
        rating,
        comment,
      },
    ]);

    if (error) {
      alert("Error posting review: " + error.message);
    } else {
      setRating(0);
      setComment("");
      fetchReviews();
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
          1
        )
      : 0;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Reviews</h2>

      {/* Overall rating */}
      <div className="flex items-center mb-4">
        <span className="text-yellow-400 text-lg font-bold">
          {averageRating} / 5
        </span>
        <div className="flex ml-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < averageRating ? "gold" : "gray"}
              viewBox="0 0 24 24"
              stroke="none"
              className="w-6 h-6"
            >
              <path d="M12 .587l3.668 7.429L24 9.748l-6 5.853 1.416 8.264L12 19.771l-7.416 4.094L6 15.601 0 9.748l8.332-1.732z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Post Review */}
      <div className="mb-6">
        <div className="flex space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "gold" : "gray"}
              viewBox="0 0 24 24"
              stroke="none"
              className="w-8 h-8 cursor-pointer"
              onClick={() => setRating(star)}
            >
              <path d="M12 .587l3.668 7.429L24 9.748l-6 5.853 1.416 8.264L12 19.771l-7.416 4.094L6 15.601 0 9.748l8.332-1.732z" />
            </svg>
          ))}
        </div>
        <textarea
          className="w-full p-3 rounded bg-gray-800 text-white mb-2"
          rows="3"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          onClick={handlePostReview}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
        >
          Post Review
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md text-white"
            >
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < r.rating ? "gold" : "gray"}
                    viewBox="0 0 24 24"
                    stroke="none"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.429L24 9.748l-6 5.853 1.416 8.264L12 19.771l-7.416 4.094L6 15.601 0 9.748l8.332-1.732z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm">{r.comment}</p>
              <span className="text-xs text-gray-400">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
