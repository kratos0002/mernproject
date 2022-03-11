module.exports = thunk => (req, res, next) =>{
    Promise.resolve(thunk(req, res, next)).catch(next)
}