// components/product/Pagination
import Link from "next/link";
export default function Pagination({ currentPage, totalPages, pathname }) {
  return (
    <div className="row mt-12 mb-4">
      <div className="col">
        <nav className="d-flex justify-content-center">
          <ul className="pagination flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page
                      ? " w-6 h-full rounded-full bg-slate-800 flex justify-center items-center text-slate-100"
                      : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    href={`${pathname}?page=${page}}`}
                    as={`${pathname}?page=${page}`}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
