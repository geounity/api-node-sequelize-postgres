"use strict";

module.exports = function setupDebateService(
  DebateModel,
  UserModel,
  GeopoliticModel,
  IdeologicModel,
  OrganizationModel
) {
  async function saveDebate(username, community, debate) {
    const user = await UserModel.findOne({
      where: { username }
    });
    if (user) {
      // let existingTitle = await this.findByTitle(debate.title)
      const existingTitle = await DebateModel.findOne({
        where: { title: debate.title }
      });
      if (!existingTitle) {
        const geocommunity = await GeopoliticModel.findOne({
          where: { uuid: community }
        });
        if (geocommunity) {
          const newDebate = await DebateModel.create(debate);
          await user.addDebate(newDebate);
          await geocommunity.addDebate(newDebate);
          return newDebate;
        }
        return Promise.reject(new Error("Community not exists"));
      }
      return Promise.reject(new Error("Title debate exists yet"));
    }
    return Promise.reject(new Error("User not exists"));
  }

  async function getDebates(includeUser) {
    if (!includeUser) return DebateModel.findAll();
    else {
      return DebateModel.findAll({
        include: [
          {
            model: UserModel,
            as: "author",
            attributes: ["username", "photo"]
          },
          {
            model: GeopoliticModel,
            as: "inGeopolitic",
            attributes: ["name", "in_uuid"]
          },
          {
            model: IdeologicModel,
            as: "inIdeologic",
            attributes: ["name"]
          },
          {
            model: OrganizationModel,
            as: "inOrganization",
            attributes: ["name"]
          }
        ]
      });
    }
  }

  function findById(id) {
    return DebateModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["username", "photo"]
        },
        {
          model: GeopoliticModel,
          as: "inGeopolitic",
          attributes: ["name", "in_uuid"]
        },
        {
          model: IdeologicModel,
          as: "inIdeologic",
          attributes: ["name"]
        },
        {
          model: OrganizationModel,
          as: "inOrganization",
          attributes: ["name"]
        }
      ]
    });
  }

  function findByTitle(title) {
    return DebateModel.findOne({
      where: {
        title
      }
    });
  }

  function findByUserId(id) {
    return DebateModel.findAll({
      attributes: [
        "type",
        "public",
        "title",
        "votes_up",
        "votes_down",
        "create_at"
      ],
      include: [
        {
          attributes: [],
          model: UserModel,
          where: {
            id
          }
        }
      ],
      raw: true
    });
  }

  return {
    saveDebate,
    getDebates,
    findById,
    findByTitle,
    findByUserId
  };
};
