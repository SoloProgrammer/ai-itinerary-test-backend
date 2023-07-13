const errorRespose = (res, status, error) => {
    return res.status(500).json({ status, badMsg: "Some error occured please try again later!", error: error.message || "Internal server error" })
}
const badResponse = (res, status, msg) => {
    return res.status(400).json({ status, badMsg: msg })
}

module.exports = { errorRespose, badResponse }