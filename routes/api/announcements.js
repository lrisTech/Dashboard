const express = require("express");
const router = express.Router();
const passport = require("passport");

const Announcement = require("../../models/Announcement");

//TODO converted projects to announcements, but it still filters by team members
// @route GET api/announcements
// @desc Get all announcements for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let projectsArr = [];

    // Member announcements
    await Announcement.find({})
      .then(announcements => {
        console.log(announcements)
        announcements.map(announcement => {
          announcement.teamMembers &&
            announcement.teamMembers.map(member => {
              if (member.email == req.user.email) {
                announcementsArr.push(announcement);
              }
            });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner announcements
    await Announcement.find({ owner: OWNER })
      .then(announcements => {
        let finalArr = [...announcements, ...projectsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/announcements/:id
// @desc Get specific announcement by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Project.findById(id).then(announcement => res.json(announcement));
  }
);

// @route POST api/announcements/create
// @desc Create a new announcement
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_ANNOUNCEMENT= await new Project({
      owner: OWNER,
      team: req.body.team,
      link: req.body.link,
      title: req.body.title,
      description: req.body.description
    });

    NEW_ANNOUNCEMENT.save().then(announcement => res.json(announcement));
  }
);

//TODO
// @route PATCH api/projects/update
// @desc Update an existing project
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let projectFields = {};

    projectFields.name = req.body.projectName;
    projectFields.teamMembers = req.body.members;

    Project.findOneAndUpdate(
      { _id: req.body.id },
      { $set: projectFields },
      { new: true }
    )
      .then(project => {
        res.json(project);
      })
      .catch(err => console.log(err));
  }
);

//TODO
// @route DELETE api/projects/delete/:id
// @desc Delete an existing project
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.params.id).then(project => {
      project.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
