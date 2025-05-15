'use client';

import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Home = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:3000/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleNewReview = async (review: { name: string; rating: number; comment: string }) => {
    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:3000/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
      const savedReview = await response.json();
      setReviews(prev => [savedReview, ...prev]); // update UI immediately
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2035]">
      {/* ... about section ... */}

      {/* Write Review */}
      <section id="write-review" className="py-16 bg-[#141829]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Write a Review</h2>
            <p className="text-gray-400">Share your thoughts about this demo project</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ReviewForm onSubmitReview={handleNewReview} />
          </div>
        </div>
      </section>

      {/* Display Reviews */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Reviews</h2>
            <p className="text-gray-400">What others are saying about this project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
