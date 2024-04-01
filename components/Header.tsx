"use client";

import React, { useEffect } from "react";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { groq } from "next-sanity";

import Image from "next/image";

// const tabs = [
//   {
//     name: "Watch a Demo",
//     description: "Get a better understanding of our product",
//     href: "#",
//     icon: HomeIcon,
//   },
//   {
//     name: "Some button",
//     description: "Some Description",
//     href: "#",
//     icon: PaperAirplaneIcon,
//   },
//   {
//     name: "Contact our Support Team",
//     description: "Customers’ data will be safe and secure",
//     href: "#",
//     icon: ChatBubbleLeftIcon,
//   },
// ];

const tabs = [
  {
    productName: "Watch a Demo",
  },
  {
    productName: "Some button",
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [products, setProducts] = useState(tabs);
  const [headerLogo, setHeaderLogo] = useState("/images/maxsim_logo.svg");

  useEffect(() => {
    const projectId = "b8xc3xdp";
    const datasetName = "production";

    const productsQuery = groq`{
     

     "products" : *[_type == "product"] {
      productName,
      productDescription,
      "productImageUrl": productImage.asset->url,
      demoLink,
      "softwareUrl": software.asset->url
    },
    "header": *[_type == "header"][0].logo.asset->url
    }`;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            // queryHomeInfo
            productsQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch homepage data");
        }

        const data = await response.json();
        setProducts(data.result.products);
        setHeaderLogo(data.result.header);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Function to reload the page with the updated query parameter
    const reloadPageWithQueryParam = () => {
      const params = new URLSearchParams(window.location.search);
      const productName = params.get("productName") || "";
      const newPath = window.location.pathname + "?productName=" + productName;
      window.history.replaceState({}, "", newPath);
    };

    // Listen for changes in the query parameter and reload the page
    window.addEventListener("popstate", reloadPageWithQueryParam);

    // Remove the listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", reloadPageWithQueryParam);
    };
  }, []);

  // FAFAFB
  // 013894
  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-20 backdrop-blur-md backdrop-filter border-b-2 border-black-500">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            {/* <span className="sr-only">MAXSIM</span>
            <img className="h-6 w-36" src="./maxsim_logo.jpg" alt="MAXSIM" /> */}
            <Image src={headerLogo} alt="MAXSIM" width={150} height={45} />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-red"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-red">
              Products{" "}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item, index) => (
                    <div
                      key={item.productName}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 text-[#013B94] hover:bg-blue-800 hover:text-white"
                    >
                      <div className="flex-auto">
                        <div
                          className="block font-semibold "
                          onClick={() => {
                            const newPath =
                              "/products?productName=" +
                              encodeURIComponent(item.productName);
                            window.location.href = newPath;
                          }}
                        >
                          {item.productName}
                          <span className="absolute inset-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/#about"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            About
          </Link>
          <Link
            href="/technology"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Technology
          </Link>
          <Link
            href="/#corecompetencies"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Core Competencies
          </Link>
          <Link
            href="/#team"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Team
          </Link>
          <Link
            href={"/#news"}
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            News
          </Link>
          <Link
            href="/career"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Career
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Services
          </Link>

          <Link
            href="/contact"
            className="text-sm font-semibold leading-6 text-black hover:text-blue-800"
          >
            Contact
          </Link>
        </Popover.Group>

        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-sm font-semibold leading-6 text-black">
            <span aria-hidden="true">&rarr;</span> Corner Button
          </Link>
        </div> */}
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MAXSIM</span>
              <img
                className="h-8 w-auto"
                src="https://i.ibb.co/j554fvL/MAXSIM-Logo.png"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white">
                        Products
                        <ChevronDownIcon
                          className={cn(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {products.map((item, index) => (
                          <Link
                            key={item.productName}
                            href={`/products?productName=${encodeURIComponent(
                              item.productName
                            )}`}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)} // Add this line
                          >
                            {item.productName}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/#about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/#corecompetencies"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Core Competencies
                </Link>
                <Link
                  href="/technology"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Technology
                </Link>
                <Link
                  href="/#team"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </Link>
                <Link
                  href="/#news"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
                <Link
                  href="/services"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/career"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Career
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-blue-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
