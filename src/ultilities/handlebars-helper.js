module.exports = {
    setIndex: (index, current_page = 1) => {
        return index + current_page * 6 - 5;
    },
}