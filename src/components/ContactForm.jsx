"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Q4n2ql2nqnZVlRlqwv",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setIsLoading(false);
        // console.log("Response received", res);
        if (res.status === 200) {
          // console.log("Response succeeded!");
          toast.success(
            "Thanks for submitting form. We will contact to you soon.",
            {
              position: "top-right",
              autoClose: 0,
              hideProgressBar: true,
            }
          );
        } else {
          setIsLoading(false);
          // console.log("Email/Password is invalid.");
          toast.error("Server Issue! please try again later", {
            position: "top-right",
            autoClose: 0,
            hideProgressBar: true,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false); // Hide loading indicator on API call error
        console.error(error);
      });
    reset();
  };
  return (
    <>
      <div className="relative bg-white">
        <div className="lg:absolute lg:inset-0 lg:left-1/2">
          <img
            className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
            alt=""
          />
        </div>
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Let's work together
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Proin volutpat consequat porttitor cras nullam gravida at orci
                molestie a eu arcu sed ut tincidunt magna.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        {...register("firstName", { required: true })}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        {...register("lastName", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Company
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        {...register("company", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm leading-6">
                      <label
                        htmlFor="phone"
                        className="block font-semibold text-gray-900"
                      >
                        Phone
                      </label>
                      <p id="phone-description" className="text-gray-400">
                        Optional
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        {...register("phone", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between text-sm leading-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        How can we help you?
                      </label>
                      <p id="message-description" className="text-gray-400">
                        Max 500 characters
                      </p>
                    </div>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        aria-describedby="message-description"
                        {...register("message", { required: true })}
                      />
                    </div>
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className="block text-sm font-semibold leading-6 text-gray-900">
                      Expected budget
                    </legend>
                    <div className="mt-4 space-y-4 text-sm leading-6 text-gray-600">
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-under-25k"
                          name="budget"
                          defaultValue="under_25k"
                          type="radio"
                          {...register("budget", { required: true })}
                          className="mt-1"
                        />
                        <label htmlFor="budget-under-25k">Less than $25K</label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-25k-50k"
                          name="budget"
                          defaultValue="25k-50k"
                          type="radio"
                          {...register("budget", { required: true })}
                          className="mt-1"
                        />
                        <label htmlFor="budget-25k-50k">$25K – $50K</label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-50k-100k"
                          name="budget"
                          defaultValue="50k-100k"
                          type="radio"
                          {...register("budget", { required: true })}
                          className="mt-1"
                        />
                        <label htmlFor="budget-50k-100k">$50K – $100K</label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="budget-over-100k"
                          name="budget"
                          defaultValue="over_100k"
                          type="radio"
                          {...register("budget", { required: true })}
                          className="mt-1"
                        />
                        <label htmlFor="budget-over-100k">$100K+</label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
                  <button
                    type="submit"
                    className={clsx(
                      "inline-flex justify-center items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                      isLoading && "cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
