import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import style from "./PaginateButton.module.css";
interface propsTypes {
    currentPage: number,
    totalPages: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,

}
const PaginationButtons: React.FC<propsTypes> = ({ setCurrentPage, currentPage, totalPages }) => {
    const handlePageClick = ({ selected }: { selected: any }) => {
        setCurrentPage(selected);
    };
    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 2,
            },
        },
    };
    const showNextButton = currentPage !== totalPages - 1;
    const showPrevButton = currentPage !== 0;
    return (
        <motion.div
            variants={paginationVariants}
            initial="hidden"
            animate="visible"
        >
            <ReactPaginate
                breakLabel={<span className="me-4">...</span>}
                nextLabel={
                    showNextButton ? (
                        <span className={style.next_button}>
                            <BsChevronRight />
                        </span>
                    ) : null
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel={
                    showPrevButton ? (
                        <span className={style.prev_button}>
                            <BsChevronLeft />
                        </span>
                    ) : null
                }
                containerClassName={style.container_class_name}
                pageClassName={style.page_class_name}
                activeClassName={style.active_class_name}
            />
        </motion.div>
    );
};

export default PaginationButtons;
