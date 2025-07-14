

const {deleteUser} = require("../../database/queries");



const DeleteUserController = async function(req, res){
    const {userinfo} = req.params;
    const userid = userinfo.split(",")[0];
    const fromUser = userinfo.split(",")[1];
    if (fromUser == "true"){
        await deleteUser(userid);
        res.redirect("/homepage");
    }
    else{
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
}


module.exports = DeleteUserController;