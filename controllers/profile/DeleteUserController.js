

const {deleteUser} = require("../../database/queries");



const DeleteUserController = async function(req, res){
    const {userid} = req.params;
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


module.exports = DeleteUserController;