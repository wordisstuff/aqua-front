const disabledBtn = date => {
    const [year, month] = date.split('-');
    const formatDate = `${year}-${month.padStart(2, '0')}-${new Date().getUTCDate()}`;
    if (formatDate >= new Date().toISOString().split('T')[0]) {
        return true;
    }
    return false;
};
export default disabledBtn;
