"use client";

import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { InputField } from "@/components/input-field";
import { Table } from "@/components/table";
import { TextareaField } from "@/components/textarea-field";
import { formattedCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { productSchema } from "../schemas/imports";
import { pushProducts, saveProduct } from "../server/actions/imports";

export function ProductEditorForm({ product }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      variants: product.variants || [],
      description: product.description,
      tags: product.tags,
      type: product.type,
      collection: product.collection,
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (values) => {
    const data = await saveProduct(values);

    if (data?.message) {
      toast(data.message, {
        type: data.error ? "error" : "success",
      });
    }

    if (data?.error) {
      if (Array.isArray(data.error)) {
        // Iterate over the array of errors and set each one using setError
        data.error.forEach((err) => {
          if (err.name && err.message) {
            setError(err.name, { message: err.message });
          }
        });
      } else if (typeof data.error === "string") {
        // If the error is a string, display it as a toast notification
        toast(data.message, {
          type: "error",
        });
      }
    } else if (data?.message) {
      toast(data.message, {
        type: "success",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
              <InputField
                type="text"
                label="Title"
                placeholder="e.g. Awesome Product Name"
                error={errors.title?.message}
                stacked
                {...register("title")}
              />
              <TextareaField
                label="Description"
                placeholder="Type here..."
                error={errors.description?.message}
                stacked
                {...register("description")}
              />
            </div>
          </CardContent>
        </Card>
        {/* Product Organization */}
        <Card>
          <CardHeader>
            <CardTitle>Product organization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
              <InputField
                type="text"
                label="Collection"
                placeholder=""
                error={errors.collection?.message}
                stacked
                {...register("collection")}
              />
              <InputField
                type="text"
                label="Type"
                placeholder=""
                error={errors.type?.message}
                stacked
                {...register("type")}
              />
              <InputField
                type="text"
                label="Tags"
                placeholder=""
                error={errors.tags?.message}
                stacked
                {...register("tags")}
              />
            </div>
          </CardContent>
        </Card>
        {/* Variants Table */}
        <Card className="lg:col-span-full">
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table
              resourceName={{
                singular: "variant",
                plural: "variants",
              }}
              headings={[
                "Name",
                "Stock",
                "Cost",
                "Shipping cost",
                "Selling price",
                "Compare at",
              ]}
              itemCount={fields.length}
            >
              {fields.map((field, index) => (
                <Table.Row key={field.id}>
                  <Table.Cell>
                    <InputField
                      type="text"
                      labelHidden
                      placeholder="e.g. Blue shirt"
                      error=""
                      className="min-w-32"
                      stacked
                      {...register(`variants.${index}.name`)}
                      defaultValue={field.name}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {field.stock}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {formattedCurrency.format(field.cost)}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {formattedCurrency.format(field.shipping_cost)}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <InputField
                      type="number"
                      labelHidden
                      placeholder="e.g. 35"
                      // error=""
                      className="min-w-32"
                      stacked
                      style="currency"
                      step="0.01"
                      {...register(`variants.${index}.custom_price`, {
                        valueAsNumber: true,
                      })}
                      defaultValue={field.custom_price}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <InputField
                      type="number"
                      labelHidden
                      placeholder="e.g. 35"
                      // error=""
                      className="min-w-32"
                      stacked
                      style="currency"
                      step="0.01"
                      {...register(`variants.${index}.compare_at_price`, {
                        valueAsNumber: true,
                      })}
                      defaultValue={field.compare_at_price}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button loading={isSubmitting} variant="outline">
          Save changes
        </Button>
        <Button
          type="button"
          loading={isPending}
          onClick={async () => {
            startTransition(async () => {
              pushProducts([product.id]);
            });
          }}
        >
          Push to store
        </Button>
      </div>
    </form>
  );
}
