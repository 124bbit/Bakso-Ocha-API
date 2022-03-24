const { minuman } = require("../models/index");
const { Op } = require("sequelize");

exports.createMinuman = async (req, res) => {
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
    const query = await minuman.create({ ...Body });
    return res.status(200).json({
      success: true,
      message: `Berhasil membuat menu Minuman`,
      result: query,
    });
  } catch (error) {
    console.log("ini error = ", error);
    return res.status(403).json({
      success: false,
      message: error,
    });
  }
};
exports.getAllMinuman = async (req, res) => {
  try {
    const query = await minuman.findAll();
    if (query.length === 0) {
      return res.status(203).json({
        success: true,
        message: `Tidak ada menu Minuman`,
      });
    }
    return res.status(200).json({
      success: true,
      data: query,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.findMinumanBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const findMinuman = await minuman.findAll({
      where: { slug: { [Op.eq]: slug } },
    });
    if (findMinuman.length === 0) {
      return res.status(205).json({
        success: true,
        message: `Tidak ada menu Minuman`,
      });
    }
    return res.status(200).json({
      success: true,
      results: findMinuman,
    });
  } catch (err) {
    console.log("err = ", err);
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.updateMinuman = async (req, res) => {
  const { nama, harga, qty } = req.body;
  const { id } = req.params;
  const findMinuman = await minuman.findByPk(id);

  if (findMinuman === null) {
    return res.status(205).json({
      success: true,
      message: `Tidak ada Menu Minuman`,
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
    const updateMinuman = await minuman.update(
      {
        nama,
        harga,
        qty,
        slug: newSlug,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      }
    );
    if (updateMinuman === null) {
      return res.status(405).json({
        success: false,
        message: `Gagal Mengubah Menu Minuman`,
      });
    }
    const query = await minuman.findByPk(id);
    return res.status(200).json({
      success: true,
      message: `Berhasil Mengubah Menu Minuman`,
      data: query,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.deleteMinuman = async (req, res) => {
  const { id } = req.params;
  const findMinuman = await minuman.findByPk(id);
  if (findMinuman.length === 0) {
    return res.status(402).json({
      success: false,
      message: `Tidak ditemukan menu Minuman yang diminta`,
    });
  }
  try {
    const deleteMinuman = await minuman.destroy({
      where: { id: { [Op.eq]: id } },
    });
    if (deleteMinuman === null) {
      return res.status(402).json({
        success: false,
        message: `Gagal menghapus Menu Minuman`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Berhasil menghapus Menu Minuman`,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
