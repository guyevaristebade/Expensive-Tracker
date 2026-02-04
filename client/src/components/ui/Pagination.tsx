import { useState, type ReactNode } from 'react'

type PaginationProps<T> = {
    data: T[]
    itemsPerPage?: number
    children: (paginatedData: T[]) => ReactNode
}

export function Pagination<T>({
    data,
    itemsPerPage = 4,
    children,
}: PaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(data.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = data.slice(startIndex, endIndex)

    if (totalPages <= 1) {
        return <>{children(data)}</>
    }

    return (
        <div>
            {/* Content */}
            {children(paginatedData)}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 py-4">
                {/* Previous */}
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="
            px-4 py-2 rounded-md border-2
            border-emerald-500 text-emerald-500
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-emerald-500 hover:text-white
            transition cursor-pointer
          "
                >
                    ←
                </button>

                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1
                    const isActive = page === currentPage

                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`
                w-10 h-10 rounded-md font-semibold
                border-2 transition cursor-pointer
                ${
                    isActive
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                }`}
                        >
                            {page}
                        </button>
                    )
                })}

                {/* Next */}
                <button
                    onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="
            px-4 py-2 rounded-md border-2
            border-emerald-500 text-emerald-500
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-emerald-500 hover:text-white
            transition"
                >
                    →
                </button>
            </div>
        </div>
    )
}
