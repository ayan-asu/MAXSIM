"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createClient } from "next-sanity";

const config = {
  projectId: "b8xc3xdp",
  dataset: "production",
  useCdn: true,
  token:
    "sklaqB5vT7rlEInz0zNOkZg2PjFcHjcXHUMatmYLkltBRYOrh8jCYK63AVj4nn7rWK06cvgbUTf26WKtHhen6KK3pMXTPEoLAl3D5B4e3XgnbXRoufbx1bh4qoakLIX2I0bbfKfNyo47MYHLV9dDhxRiJQD18yq7giI6SVvQsROiKQWjStjQ",
  apiVersion: "2021-03-25",
};

const client = createClient(config);

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
  message: z.string().max(400, "Message must be at most 400 characters long"),
});

export function ContactUsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const handleButtonClick = async (values) => {
    console.log("Form values:", values.message);
    if (values.message !== "") {
      try {
        await client.create({
          _type: "contact", // Change 'your_document_type' to the actual type in your Sanity schema.
          ...values,
        });
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "An error occurred while submitting the form. Please try again later."
        );
      }
    } else {
      alert("Don't leave the fields empty");
    }
  };
  const onSubmit = (values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ minHeight: "65vh" }}
    >
      <Form
        {...form}
        className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <div>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>
                  We&apos;ll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <div>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength="10"
                    {...field}
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <div>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input as="textarea" {...field} rows={6} maxLength={400} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <Button
            type="submit"
            onClick={() => handleButtonClick(form.getValues())}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ContactUsForm;
