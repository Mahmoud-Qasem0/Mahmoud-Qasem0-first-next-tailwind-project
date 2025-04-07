import Loading from "@/app/components/Loading/Loading";
import Image from "next/image";
import React, { Suspense } from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const { categories } = await res.json();

  const cat = categories.find((cat) => cat.idCategory === id);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
              <div>
                <div className="max-w-lg md:max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    {cat.strCategory}
                  </h2>

                  <p className="mt-4 text-gray-700">
                    {cat.strCategoryDescription}
                  </p>
                </div>
              </div>

              <div>
                <Image
                  src={cat.strCategoryThumb}
                  width={500}
                  height={300}
                  className="rounded"
                  alt={cat.strCategory}
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
