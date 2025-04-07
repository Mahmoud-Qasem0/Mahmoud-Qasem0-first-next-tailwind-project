/* eslint-disable @next/next/no-img-element */
import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const source = decodeURIComponent(id);
  console.log(source);
  console.log(id);
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=953a7c9ced054cacb45ca328daf43a14",
    {
      next: {novalidate: 86400}
    }
  );
  const { articles } = await res.json();
  const article = articles.find((article) => article.source.name === source);
  console.log(article);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
              <div>
                <div className="max-w-lg md:max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    {article?.title}
                  </h2>

                  <p className="mt-4 text-gray-700">{article?.content}</p>
                  <div className="my-4 text-gray-700 text-sm/relaxed">
                    <p className="mb-1">
                      author: {article?.author || "John Doe"}
                    </p>
                    <p>publishedAt: {article?.publishedAt}</p>
                  </div>
                  <Link
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                    href={article?.url}>
                    Go to Full Article
                  </Link>
                </div>
              </div>

              <div>
                <img
                  src={article?.urlToImage}
                  width={500}
                  height={300}
                  className="rounded"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default page;
