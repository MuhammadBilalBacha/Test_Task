"use client";
import React, { Fragment, useState } from "react";
import style from "./Characters.module.css";
import { IoReturnUpBack } from "react-icons/io5";
import { Cookie } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Redux/Store";
import { useRouter } from "next/navigation";
import { filterAlive, filterDead } from "@/Redux/Slices/RickyAndMortySlice";
import { motion } from "framer-motion"

const cookieFont = Cookie({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Characters: React.FC = () => {
  const { characters } = useSelector((state: RootState) => state.ricky);
  const [dead_color, setDead_Color] = useState("");
  const [alive_color, setAlive_Color] = useState("");
  const [unknown_color, setUnknown_Color] = useState("");
  const [character_message, setCharacter_Message] = useState("there's no data for this locations")
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const charClicked = (id: number) => {
    router.push(`/character_details/${id}`);
  };

  const cards_varients = {
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
  const icon_varients = {
    hidden: {
      opacity: 0,
      x: -1000,
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
          animate="visible" style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          {" "}
          <IoReturnUpBack style={{ fontSize: "28px" }} />{" "}
        </motion.span>
        <motion.span variants={title_varients} initial="hidden"
          animate="visible" className={`${cookieFont.className} ${style.title}`}>
          Rick And Morty
        </motion.span>
        <span></span>
      </div>
      <div className={`container ${style.location_data}`}>
        <div className="location_filter">
          <span className="fw-bold h4">Filter by status :</span>
          <div className={style.location_filter_buttons}>
            <motion.button whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} className={style.filter_dead} style={{ backgroundColor: dead_color }} onClick={() => {
                dispatch(filterDead("Dead"))
                setDead_Color("#f1cccc");
                setAlive_Color("");
                setUnknown_Color("")
                setCharacter_Message("There's no dead data..!!")
              }}>
              <div
                className={style.filter_dead_dot}
                style={{ backgroundColor: "#bd1010" }}
              ></div>
              Dead
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} className={style.filter_alive} style={{ backgroundColor: alive_color }} onClick={() => {
                dispatch(filterAlive("Alive"))
                setDead_Color("");
                setAlive_Color("#eaf5db");
                setUnknown_Color("")
                setCharacter_Message("There's no Alive data..!!")
              }}>
              {" "}
              <div
                className={style.filter_dead_dot}
                style={{ backgroundColor: "#98cd4d" }}
              ></div>
              Alive
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} className={style.filter_unknown} style={{ backgroundColor: unknown_color }} onClick={() => {
                dispatch(filterDead("unknown"));
                setDead_Color("");
                setAlive_Color("");
                setUnknown_Color("#f1f1f1")
                setCharacter_Message("There's no unknown data..!!")
              }}>
              {" "}
              <div
                className={style.filter_dead_dot}
                style={{ backgroundColor: "gray" }}
              ></div>
              Unkno
            </motion.button>
          </div>
        </div>
        <div className={`row ${style.data_row}`}>
          {characters?.length == 0 && <motion.h1 variants={cards_varients} className="text-danger py-3 my-3">{character_message}</motion.h1>}
          {characters &&
            characters.map((data: any) => {

              return (
                <motion.div
                  variants={cards_varients}
                  initial="hidden"
                  animate="visible"
                  className="col-md-3"
                  style={{ marginBottom: "20px", cursor: "pointer" }}
                  key={data?.id}
                  onClick={() => charClicked(data?.id)}
                >
                  <img
                    src={data?.image}
                    alt={data?.name}
                    style={{
                      width: "285px",
                      height: "285px",
                      borderRadius: "15px",
                    }}
                  />
                  <div className={style.card_content}>
                    <div className={style.content_heading}>{data?.name}</div>
                    <div className={style.content_body}>
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
                      {data?.status}-{data?.species}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default Characters;
