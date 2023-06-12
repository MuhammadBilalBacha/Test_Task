"use client";
import React, { Fragment } from "react";
import style from "./CharacterDetails.module.css";
import { IoReturnUpBack } from "react-icons/io5";
import { Cookie } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const cookieFont = Cookie({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
interface propsType {
  id: number | string;
}

const CharactersDetails: React.FC<propsType> = ({ id }) => {
  const { characters, loading } = useSelector(
    (state: RootState) => state.ricky
  );

  const router = useRouter();
  const charClicked = (id: number) => {
    router.push(`/character_details/${id}`);
  };
  const details_card_varients = {
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
        damping: 15,
        duration: 2,
      },
    },
  }
  const other_varients = {
    hidden: {
      opacity: 0,
      x: 400,
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
  const icon_varients = {
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
        damping: 15,
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
  return (
    <Fragment>
      <div className={`${style.ricky_morty}`}>
        <motion.span variants={icon_varients} initial="hidden"
          animate="visible"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/location_data/00")}
        >
          {" "}
          <IoReturnUpBack style={{ fontSize: "28px" }} />{" "}
        </motion.span>
        <motion.span variants={title_varients} initial="hidden"
          animate="visible" className={`${cookieFont.className} ${style.title}`}>
          Rick And Morty
        </motion.span>
        <span></span>
      </div>
      <div className="container">
        <div className={`row ${style.row}`}>
          <div className="col-md-6 mb-5">
            <div className={`${style.location_details}`}>
              {characters &&
                characters.map((data: any) => {
                  return (
                    <Fragment>
                      {data?.id == id && (
                        <motion.div variants={details_card_varients} initial="hidden"
                          animate="visible" className={`${style.location_details_card}`}>
                          <img
                            src={data?.image}
                            alt={""}
                            width={480}
                            height={480}
                            style={{ borderRadius: "15px" }}
                          />
                          <div className={style.content}>
                            <div className={style.name}>{data?.name}</div>
                            <div className={style.content_top}>
                              <div className="d-flex gap-2 fw-bold">
                                {data?.status == "Dead" && (
                                  <div
                                    className={style.filter_dead_dot}
                                    style={{ backgroundColor: "#bd1010" }}
                                  ></div>
                                )}
                                {data?.status == "Alive" && (
                                  <div
                                    className={style.filter_dead_dot}
                                    style={{ backgroundColor: "#98cd4d" }}
                                  ></div>
                                )}
                                {data?.status == "unknown" && (
                                  <div
                                    className={style.filter_dead_dot}
                                    style={{ backgroundColor: "gray" }}
                                  ></div>
                                )}
                                {data?.status} - {data?.species}
                              </div>
                              <span className={style.content_top_end}>
                                {data?.type} - {data?.gender}
                              </span>
                            </div>
                            <div className={"mt-3 fw-semibold"}>
                              {data?.type}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Fragment>
                  );
                })}
              {loading && (
                <h1>Failed to load data Please check your connection !!</h1>
              )}
            </div>
          </div>
          <div className={`col-md-6`}>
            <h2 className="fw-bold">Others Characters</h2>
            <div className={`row mt-3 `}>
              {characters &&
                characters.map((data: any) => {
                  return (
                    <Fragment>
                      {data?.id != id && (
                        <motion.div
                          variants={other_varients}
                          initial="hidden"
                          animate="visible"
                          className="col-md-6 mb-3"
                          style={{ cursor: "pointer" }}
                          key={data?.id}
                          onClick={() => charClicked(data?.id)}
                        >
                          <div className="d-flex justify-content-space-between">
                            <img
                              src={data?.image}
                              alt={""}
                              width={80}
                              height={80}
                              style={{ borderRadius: "5px" }}
                            />
                            <div className={style.other_contents}>
                              <div
                                className="fw-bold"
                                style={{ fontSize: "14px" }}
                              >
                                {data?.name}
                              </div>
                              <div className="mt-3 fw-semibold h6">
                                Narnia Dimension
                              </div>
                              <div className="mt-2 text-secondary">
                                {data?.type} - {data?.gender}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CharactersDetails;
