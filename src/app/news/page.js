/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const newsPage = async () => {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=953a7c9ced054cacb45ca328daf43a14", 
    {
      next: {novalidate: 86400}
    }
  );
  const { articles } = await res.json();
  const artics = articles
    ?.filter((article) => article.source?.name && article.urlToImage)
    .slice(0, 7);
  console.log(artics);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {artics?.map((article, i) => (
          <div className="rounded" key={i}>
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs">
              <img
                alt={article.title}
                src={article.urlToImage}
                width={500}
                height={300}
                className="h-56 w-full object-cover"
              />

              <div className="p-4 sm:p-6">
                <Link href={`/news/${article.source?.name}`}>
                  <h3 className="text-lg font-medium text-gray-900">
                    {article.title}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {article.description}
                </p>

                <Link
                  href={`/news/${article.source.name}`}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Go To Article
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
};

export default newsPage;
