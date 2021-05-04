const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getDateLabel = (d) => {
    d = new Date(d)
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}