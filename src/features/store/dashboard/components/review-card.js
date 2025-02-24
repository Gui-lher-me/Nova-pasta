"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ExternalIcon } from "@/icons";
import { useState } from "react";
import { FeedbackForm } from "./feedback-form";
import { StarsCard, STEPS } from "./stars-card";

export function ReviewCard() {
  const [step, setStep] = useState(STEPS.PICK_STARS);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  if (step === STEPS.PICK_STARS) {
    return (
      <StarsCard
        rating={rating}
        onRatingChange={handleRatingChange}
        onStepChange={(step) => setStep(step)}
      />
    );
  }

  if (step === STEPS.REVIEW_ON_SHOPIFY) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Last step: Review us on Shopify</CardTitle>
          <CardDescription>
            We&apos;re happy you&apos;re happy! Please help us by leaving a
            review on Shopify. We would really appreciate it
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button asChild>
            <a
              href="https://apps.shopify.com/dropcommerce#modal-show=ReviewListingModal"
              target="_blank"
            >
              <ExternalIcon />
              Review
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === STEPS.LEAVE_REVIEW) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Please provide your feedback</CardTitle>
          <CardDescription>
            Our team will review each piece of feedback personally and use it to
            improve our system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeedbackForm
            rating={rating}
            onFinishReview={() => setStep(STEPS.THANK_YOU)}
          />
        </CardContent>
      </Card>
    );
  }

  if (step === STEPS.THANK_YOU) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank you so much for your feedback!</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => setStep(null)}>Close</Button>
        </CardFooter>
      </Card>
    );
  }

  return;
}
