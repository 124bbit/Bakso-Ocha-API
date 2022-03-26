const { minuman, mieayam, bakso, bihunayam } = require("../models/index");
const { Op } = require("sequelize");

exports.searchingQuery = async (req, res) => {
  const q = req.query.q;
  const resArray = [];
  await bakso
    .findAll({
      attributes: ["nama", "slug"],
      where: { nama: { [Op.substring]: q } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await mieayam
    .findAll({
      attributes: ["nama", "slug"],
      where: { nama: { [Op.substring]: q } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await bihunayam
    .findAll({
      attributes: ["nama", "slug"],
      where: { nama: { [Op.substring]: q } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await minuman
    .findAll({
      attributes: ["nama", "slug"],
      where: { nama: { [Op.substring]: q } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });

  console.log("resArray = ", resArray);
  return res.status(200).json({
    success: true,
    result: resArray,
  });
};
exports.searchingSlug = async (req, res) => {
  const slug = req.query.slugs;
  const resArray = [];
  await bakso
    .findAll({
      where: { slug: { [Op.substring]: slug } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await mieayam
    .findAll({
      where: { slug: { [Op.substring]: slug } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await bihunayam
    .findAll({
      where: { slug: { [Op.substring]: slug } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });
  await minuman
    .findAll({
      where: { slug: { [Op.substring]: slug } },
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        resArray.push(result[i]);
      }
    });

  if (resArray.length === 0) {
    return res.status(405).json({
      success: false,
      message: "No Data",
    });
  }
  return res.status(200).json({
    success: true,
    result: resArray,
  });
};
