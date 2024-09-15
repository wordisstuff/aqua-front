import css from './WaterDailyNorma.module.css'

export default function WaterDailyNorma() {
    return (
        <div className={css.normabox}>
            <p className={css.normaAmount}>1.5 L</p>
            <p className={css.normaText}>My daily norma</p>
        </div>
    );
}