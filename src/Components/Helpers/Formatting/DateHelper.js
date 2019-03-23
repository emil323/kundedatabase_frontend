export const formatDate = (date) => {
    const format = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(date).toLocaleString('no-NO', format)
} 