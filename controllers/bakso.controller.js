const { bakso } = require("../models/index");
const { Op } = require("sequelize");
exports.createBakso = async (req, res) => {
  const { nama, qty, harga } = req.body;
  const Body = {
    nama,
    qty,
    harga,
  };
  Body.slug = nama
    .toString()
    .toLowerCase()
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/[^\w\-]+/g, "");
  try {
    const query = await bakso.create({ ...Body });
    return res.status(200).json({
      success: true,
      message: `Berhasil membuat menu Bakso`,
      result: {
        query,
      },
    });
  } catch (error) {
    console.log("ini error = ", error);
    return res.status(403).json({
      success: false,
      message: error,
    });
  }
};
exports.getAllBakso = async (req, res) => {
  const query = await bakso.findAll();
  if (query.length === 0) {
    return res.status(203).json({
      success: true,
      message: `Tidak ada Menu Bakso`,
    });
  }
  return res.status(200).json({
    success: true,
    results: query,
  });
};
exports.findBakso = async (req, res) => {
  const { slug } = req.params;
  try {
    const query = await bakso.findAll({
      where: {
        slug: {
          [Op.eq]: slug,
        },
      },
    });
    if (query.length === 0) {
      return res.status(203).json({
        success: false,
        message: `Tidak ada menu bakso`,
      });
    }
    return res.status(200).json({
      success: true,
      results: query,
    });
  } catch (err) {
    console.log("err = ", err);
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.updateBakso = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, qty } = req.body;
  const findBaksoById = await bakso.findByPk(id);
  if (findBaksoById === null) {
    return res.status(405).json({
      success: false,
      message: `Tidak Ada Bakso dengan id ${id}`,
    });
  }
  try {
    const newSlug = nama
      .toString()
      .toLowerCase()
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      .replace(/\s+/g, "-")
      .replace(/\-\-+/g, "-")
      .replace(/[^\w\-]+/g, "");
    const updateBakso = await bakso.update(
      { nama, harga, qty, slug: newSlug },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      }
    );
    if (updateBakso === null) {
      return res.status(405).json({
        success: false,
        message: `Terjadi Kesalahan`,
        results: updateBakso,
      });
    }
    const query = await bakso.findByPk(id);
    return res.status(200).json({
      success: true,
      message: `Berhasil mengubah Menu Bakso`,
      results: query,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.deleteBakso = async (req, res) => {
  const { id } = req.params;
  const findBaksoById = await bakso.findByPk(id);
  if (findBaksoById === null) {
    return res.status(405).json({
      success: false,
      message: `Tidak Ada Bakso dengan id ${id}`,
    });
  }
  try {
    const queryDelete = await bakso.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    if (queryDelete === null) {
      return res.status(405).json({
        success: false,
        message: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Berhasil menghapus Menu Bakso ${findBaksoById.nama}`,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
