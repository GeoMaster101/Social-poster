const router = require("express").Router();
const { Poster, Comment } = require("../../models");

router.delete("/dashboard/post/:id", async (req, res) => {
    try {
        await Comment.destroy({where: {poster_id: req.params.id}});
        await Poster.destroy({ where: { id: req.params.id } });

        res.status(200).json("Post has been removed");

    } catch (error) {
        console.error("ERROR occurs while deleting data from dashboard/post/:id\n", error);
        res.send(500).json({ message: "Internal error occurs, please try again later" });
    }
});

router.put("/dashboard/post/:id", async (req, res) => {
    try {
        await Poster.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            { where: { id: req.params.id } });
        res.status(200).json({ message: "update success" });
    } catch (error) {
        res.status(500).json({ message: "Intenal error occurs" });
        console.error("ERROR occurs while updating post\n", error);
    }

});

router.post("/dashboard", async (req, res) => {
    try {
        console.log("req.bodt.title :>>", req.body.title);
        console.log("req.body.content :>>", req.body.content);
        await Poster.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        console.log("BACKEND new poster :>>", res);
        res.status(200).json({ message: "Add new poster success!" });
    } catch (error) {
        console.error("ERROR occurs while creating new post\n", error);
        res.status(500).json("Internal error, please try again!");
    }
});

module.exports = router;