import AddWaterButton from "./AddWaterBtn/AddWaterBtn";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import css from './WaterMainInfo.module.css'
import myIcon from '../../utils/icons/homeScreenPage/sprite.svg'
//import Modal from "../Modal/Modal"; Треба імпорт модалки
//import { useState } from "react"; 

export default function WaterMainInfo() {

const [modalIsOpen, setIsOpen] = useState(false);
    
const openModal = () => {
  setIsOpen(true);
    };
    
    const handleModalClose = () => {
  setIsOpen(false);
};

    return (
        <div className={css.mainbox}>
            <svg className={css.logoicon} width={114} height={20}>
                <use className={css.logoiconUse} href={`${myIcon}#icon-AquaTrack`}></use>
            </svg>
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterButton openModal={openModal} />
             {
  modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose} />
}
        </div>
    );
}