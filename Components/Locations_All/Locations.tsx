"use client";

import React, { Fragment, useEffect, useState } from "react";
import style from "./Locations.module.css";
import { Cookie } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/Store";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  fetchAllLocations,
  fetchCharacters,
} from "@/Redux/Slices/RickyAndMortySlice";
import { useRouter } from "next/navigation";

const cookieFont = Cookie({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Locations: React.FC = () => {
  const router = useRouter();
  const { locations } = useSelector((state: RootState) => state.ricky);
  const dispatch = useDispatch<AppDispatch>();
  const [current_page, setCurrentPage] = useState(1);

  const handleLocations = (residents: any, id: number) => {
    dispatch(fetchCharacters(residents));
    router.push(`/location_data/${id}`);

  };

  useEffect(() => {
    dispatch(fetchAllLocations(current_page));
  }, []);
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
  const card_varients = {
    hidden: {
      opacity: 0,
      x: -400,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 2,
      },
    },
  }
  const title_varients = {
    hidden: {
      opacity: 0,
      y: -400,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        duration: 2,
      },
    },
  }
  const showNextButton = current_page !== locations?.info?.pages - 1;
  const showPrevButton = current_page !== 0;
  const handlePageClick = ({ selected }: { selected: any }) => {

    setCurrentPage(selected);
    dispatch(fetchAllLocations(current_page));
  }
  return (
    <Fragment>
      <div
        className={`${style.ricky_morty} d-flex justify-content-center align-items-center py-3`}
      >
        <motion.span variants={title_varients}
          initial="hidden"
          animate="visible" className={`${cookieFont.className} ${style.title}`}>
          Rick And Morty
        </motion.span>
      </div>
      <div className={`container ${style.ricky_cards} `}>
        <div className={`row`}>
          {locations && locations?.results?.length == 0 && <h1>Loading...</h1>}
          {locations &&
            locations?.results?.map((data: any) => {
              return (
                <motion.div variants={card_varients}
                  initial="hidden"
                  animate="visible"
                  className="col-md-6"
                  style={{ marginBottom: "20px" }}
                  key={data.id}
                >
                  <div
                    className={`${style.card}`}
                    onClick={() => handleLocations(data.residents, data.id)}
                  >
                    <span className={style.card_heading}>{data?.name}</span>
                    <div className={style.card_content}>
                      <div className={style.card_content_top}>
                        <span>Type</span>
                        <span>Dimension</span>
                        <span>Resident Count</span>
                      </div>
                      <div className={style.card_content_bottom}>
                        <span>: {data?.type}</span>
                        <span>: {data?.dimension}</span>
                        <span>: {data?.residents?.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          {locations?.lenght == 0 && (
            <h1>Failed to load data Please check your connection !!</h1>
          )}
        </div>
      </div>


      {/* // pagination button  */}

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
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
                pageCount={locations?.info?.pages - 1}
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
          </div>
        </div>
      </div>


    </Fragment>
  );
};

export default Locations;
