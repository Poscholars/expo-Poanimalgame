export default (data) => {
    return data.replace(/-/g," ")[0].toUpperCase()+data.replace(/-/g," ").substring(1)
}