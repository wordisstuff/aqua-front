import { useTranslation } from 'react-i18next';
import Container from '../../components/ShareComponents/Container/Container.jsx';
import { Helmet } from 'react-helmet-async';
import { FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className={css.containerPage404}>
                <Container>
                    <div className={css.table}>
                        <Helmet>
                            <title className={css.titlePage}>
                                {t('page.notFound')}
                            </title>
                        </Helmet>
                    </div>
                    <motion.h1
                        className={css.message}
                        animate={{ color: ['#000000', '#FF0000', '#000000'] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'easeInOut',
                        }}
                    >
                        Please press the bottom Home
                    </motion.h1>
                    <motion.div
                        className={css.arrow}
                        animate={{ y: [0, 20, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'easeInOut',
                        }}
                    >
                        <FaArrowDown size={80} color="red" />
                    </motion.div>
                    <Link to="/" className={css.btn}>
                        Home
                    </Link>
                </Container>
            </div>
        </>
    );
};

export default NotFoundPage;
