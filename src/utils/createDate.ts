export const createDate = (date: Date) => {
    const dateObj = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return dateObj;
};
