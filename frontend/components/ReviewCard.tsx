import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

interface ReviewProps {
  review: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  };
}

const ReviewCard = ({ review }: ReviewProps) => {
  const { name, rating, comment, date } = review;
  
  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="bg-[#212540] border-[#303650] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 bg-blue-900 text-white">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white">{name}</h4>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    // Full star
                    if (star <= Math.floor(rating)) {
                      return <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />;
                    }
                    // Half star
                    else if (star - 0.5 <= rating) {
                      return <StarHalf key={star} size={16} className="fill-yellow-400 text-yellow-400" />;
                    }
                    // Empty star
                    return <Star key={star} size={16} className="text-gray-500" />;
                  })}
                  <span className="ml-2 text-sm text-gray-400">{rating}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            
            <p className="text-gray-300 mt-3">{comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;