export function extractTime(dateString) {
    const date = new Date(dateString)
    let hours = padZero(date.getHours())
    let minutes = padZero(date.getMinutes())

    // Changing to 12hr format
    let newformat = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes

    return `${hours}:${minutes} ${newformat}`
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(num) {
    return num.toString().padStart(1, '0')
}