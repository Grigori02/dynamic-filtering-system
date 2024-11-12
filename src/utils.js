export const getSortedData = (dataList, sortValue, sortType) => {
    return dataList.sort((a, b) => {
        if (sortValue === 'price') {
            return sortType === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortValue === 'rating') {
            return sortType === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
    });
}