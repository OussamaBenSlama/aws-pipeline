'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface ReviewFormProps {
  onSubmitReview: (review: {
    name: string;
    rating: number;
    comment: string;
  }) => void;
}

const ReviewForm = ({ onSubmitReview }: ReviewFormProps) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim() || rating === 0) {
      alert("Please complete all fields.");
      return;
    }

    const review = { name, rating, comment };
    onSubmitReview(review); // call parent handler

    setName("");
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#212540] p-6 rounded-lg shadow-xl">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#1a2035] border-[#303650] text-white"
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Rating</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`
                  ${(hoveredRating >= star || rating >= star)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"}
                  transition-colors
                `}
              />
            </button>
          ))}
          <span className="ml-2 text-gray-300">
            {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : ""}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Comment</label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-[#1a2035] border-[#303650] text-white"
          placeholder="Write your thoughts here..."
        />
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
    </form>
  );
};

export default ReviewForm;
