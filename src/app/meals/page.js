import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading/Loading";

const mealsPage = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const { categories } = await res.json();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 my-3">
          {categories.map((cat) => (
            <div className="rounded" key={cat.idCategory}>
              <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs">
                <Image
                  alt=""
                  src={cat.strCategoryThumb}
                  width={500}
                  height={300}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                  <Link href={`meals/${cat.idCategory}`}>
                    <h3 className="text-lg font-medium text-gray-900">
                      {cat.strCategory}
                    </h3>
                  </Link>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {cat.strCategoryDescription}
                  </p>

                  <Link
                    href={`meals/${cat.idCategory}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Find out more
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
      </Suspense>
    </>
  );
};

export default mealsPage;
