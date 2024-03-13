import React from "react";
import Stars from "../Rating/Ratings";

const UserReviews = ({ reviews }) => {
  return (
    <div className="mt-8">
      {reviews?.length > 0 ? (
        <>
          <p className="text-2xl font-semibold">Ratings </p>
          <div>
            <ul className="flex flex-col gap-1 bg-slate-50 rounded-md">
              {reviews?.map((review) => {
                return (
                  <li
                    key={review._id}
                    className="border-b p-2 border-slate-100 rounded-md "
                  >
                    <div>
                      <p className="font-semibold">{review?.postedBy?.name}</p>
                      <div className="flex">
                        <Stars rating={review?.rating} />
                      </div>

                      <p>{review?.comment}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default UserReviews;
