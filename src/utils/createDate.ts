export const createDate = (date: Date) => {
    const dateObj = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return dateObj;
};