

const {deleteUser, userExistsById} = require("../../database/queries");
const isNumeric = require("../../helper/isNumeric");



const DeleteUserController = async function(req, res){
    if (req.user == undefined){
      return res.render("errors", {errors : [{msg : "You are not logged in, please Log In first."}]})
    }
    const {userinfo} = req.params;
    const userid = userinfo.split(",")[0];
    const fromUser = userinfo.split(",")[1];
    if (isNumeric(userid)){
        if (fromUser == "true"){
            if (req.user.isadmin){
                const result = await deleteUser(userid);
                if (result)
                   res.redirect("/homepage");
                else
                    res.status(404).render("errors", {errors: [{msg : "User doesn't exist"}]});
            }
            else{
                return res.status(500).render("errors", {errors: [{msg : "Deletion unsuccessful, You are not an Admin!"}]});
            }
    }
        else{
            const exists = await userExistsById(userid);
            if (exists){
                req.logout(err => {
                    if (err) return res.status(500).render("errors", {errors : [err]});

                    req.session.destroy(async err => {
                        if (err) return res.status(500).render("errors", {errors : [err]});

                        await deleteUser(userid);
                        res.clearCookie('connect.sid');
                        res.redirect('/login');
                    });
                    });
            }
            else{
                res.status(500).render("errors", {errors: [{msg : "Deletion unsuccessful, You are not an Admin!"}]});
            }
        }
    }
    else{
        res.status(404).render("errors", {errors : [{msg : "Id is not a number."}]})
    }
}


module.exports = DeleteUserController;