import { Button } from "@/components/button";
import { TextareaField } from "@/components/textarea-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { reviewSchema } from "../schemas/dashboard";
import { createStoreReview } from "../server/actions/dashboard";

export function FeedbackForm({ rating, onFinishReview }) {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { review: "" },
  });

  const onSubmit = async ({ review }) => {
    const data = await createStoreReview({ rating, review });

    if (data.message) {
      toast(data.message, {
        type: data?.error ? "error" : "success",
      });
    }

    if (!data.error) {
      onFinishReview();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <TextareaField
          label="Feedback"
          id="review"
          placeholder="Enter your feedback here"
          error={form.formState.errors.review?.message}
          optional
          {...form.register("review")}
        />
      </div>
      <div className="mt-5 flex justify-end gap-x-2">
        <Button
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Leave feedback
        </Button>
      </div>
    </form>
  );
}
