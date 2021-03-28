const Authentification = require ('../models/authCandidat')

exports.signupCand = async(req,res) => {
    res.send ('signup')

}
exports.signinCand =  async (req,res)=> {
    res.send ('signin')
}