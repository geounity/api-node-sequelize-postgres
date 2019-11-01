"use strict";

module.exports = (
  PointOfViewModel,
  DebateModel,
  GeopoliticModel,
  IdeologicModel,
  OrganizationModel
) => {
  async function createPointOfView(name, idDebate) {
    const debate = await DebateModel.findOne({
      where: { id: idDebate }
    });
    if (debate) {
      const pointOfView = {
        name,
        cant_people: 0
      };
      const created = await PointOfViewModel.create(pointOfView);
      await debate.addPointsOfView(created);
      return created;
    }
    return Promise.reject(new Error("Debate not exists"));
  }

  return {
    createPointOfView
  };
};
