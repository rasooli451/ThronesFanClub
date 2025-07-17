
const {updateMembership} = require("../../database/queries");
require("dotenv").config();





const ProfileUpgradePostController = async function(req, res){
    const loggedInUserId = req.user.user_id;
    const {answer} = req.body;
    if (answer.trim().toUpperCase() == process.env.ANSWER){
        await updateMembership(loggedInUserId);
        res.redirect("/homepage");
    }
    else{
        res.render("errors", {errors : [{msg : "Incorrect, Please Try again!"}]});
    }
}


module.exports = ProfileUpgradePostController;