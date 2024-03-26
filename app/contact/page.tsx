// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Form,
//   FormField,
//   FormLabel,
//   FormControl,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { createClient } from "next-sanity";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const config = {
//   projectId: "b8xc3xdp", // Find your project ID and dataset in `sanity.json` in your studio project
//   dataset: "production", // or the name of your dataset
//   useCdn: true, // `false` if you want to ensure fresh data
//   token:
//     "skhKZglGy4CcAi5I2513r30sXBzUAuxbnPlmoHQDdhzA1dCGWjAsIyMuJKUpbfOltN7lg8HlRRROX1BTcn80qKOzYwpBe1dtHpw842oCpU7cAcMAfwAjrzgqGU2klKerShEKNpGvferzVmH0RaN5JyAcv27f8Qm73O6Cc6pimOiX4rc2chs9", // Uncomment this line if your dataset requires an API token
//   apiVersion: "2021-03-25", // Use a UTC date string
// };

// const client = createClient(config);

// const formSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   phoneNumber: z
//     .string()
//     .min(10, "Phone number must be 10 digits")
//     .max(10, "Phone number must be 10 digits"),
//   message: z.string().max(400, "Message must be at most 400 characters long"),
// });

// export function ContactUsForm() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       message: "",
//     },
//   });

//   const handleButtonClick = async (values: any) => {
//     console.log("Form values:", values);
//     if (values.message !== "") {
//       try {
//         await client.create({
//           _type: "contact",
//           ...values,
//         });
//         toast.success("Form submitted successfully!");
//         form.reset();
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         toast.error(
//           "An error occurred while submitting the form. Please try again later."
//         ); // Replace alert with toast.error
//       }
//     } else {
//       toast.warn("Don't leave the fields empty");
//     }
//   };

//   const onSubmit = (values: any) => {
//     console.log("Form values:", values);
//     alert(JSON.stringify(values));
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{ minHeight: "65vh" }}
//     >
//       <ToastContainer />
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold">Contact Us</h2>
//         <div className="border-b-4 border-blue-500 w-24 mb-4"></div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <div>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </div>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <div>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     We will never share your email with anyone else.
//                   </FormDescription>
//                   <FormMessage />
//                 </div>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phoneNumber"
//               render={({ field }) => (
//                 <div>
//                   <FormLabel>Mobile</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       maxLength={10}
//                       {...field}
//                       pattern="[0-9]{10}"
//                       title="Please enter a 10-digit phone number"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </div>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <div>
//                   <FormLabel>Message</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       {...field}
//                       maxLength={400}
//                       style={{ height: "80px" }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </div>
//               )}
//             />

//             <Button
//               type="submit"
//               onClick={() => handleButtonClick(form.getValues())}
//               style={{
//                 width: "100%",
//                 //  background: "#668DC8"
//               }}
//             >
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default ContactUsForm;

import React from "react";

function page() {
  return (
    <div>
      <h1>Under Deployement </h1>
    </div>
  );
}

export default page;
