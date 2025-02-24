import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { createStoreReview } from "../server/actions/dashboard";
import { Review } from "./review";

// JS ENUM
export const STEPS = {
  PICK_STARS: 1,
  REVIEW_ON_SHOPIFY: 2,
  LEAVE_REVIEW: 3,
  THANK_YOU: 4,
};

export function StarsCard({ rating, onRatingChange, onStepChange }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (rating > 4) {
      startTransition(async () => {
        const data = await createStoreReview({ rating, review: "" });
        if (data.message) {
          toast(data.message, {
            type: data.error ? "error" : "success",
          });
        }
        if (!data.error) {
          onStepChange(STEPS.REVIEW_ON_SHOPIFY);
        }
      });
    } else {
      onStepChange(STEPS.LEAVE_REVIEW);
    }
  };

  const handleStarClick = (index) => {
    const newRating = index + 1;
    onRatingChange(newRating);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave us a review</CardTitle>
        <CardDescription>
          Tell us how would you rate DropCommerce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Review rating={rating} onStarClick={handleStarClick} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleClick}
          loading={isPending}
          disabled={rating === 0 || isPending}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
