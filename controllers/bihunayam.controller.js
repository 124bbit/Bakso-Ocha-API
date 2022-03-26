const { bihunayam } = require("../models/index");
const { Op } = require("sequelize");

exports.createBihunAyam = async (req, res) => {
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
    const query = await bihunayam.create({ ...Body });
    return res.status(200).json({
      success: true,
      message: `Berhasil membuat menu Bihun Ayam`,
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
exports.getAllBihunAyam = async (req, res) => {
  try {
    const query = await bihunayam.findAll();
    if (query.length === 0) {
      return res.status(203).json({
        success: true,
        message: `Tidak ada Menu Bihun Ayam`,
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
exports.findBihunAyamBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const findBihunAyam = await bihunayam.findAll({
      where: { slug: { [Op.eq]: slug } },
    });
    if (findBihunAyam.length === 0) {
      return res.status(205).json({
        success: true,
        message: `Tidak ada menu Bihun Ayam`,
      });
    }
    return res.status(200).json({
      success: true,
      results: findBihunAyam,
    });
  } catch (err) {
    console.log("err = ", err);
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.updateBihunAyam = async (req, res) => {
  const { nama, harga, qty } = req.body;
  const { id } = req.params;
  const findBihunAyam = await bihunayam.findByPk(id);

  if (findBihunAyam === null) {
    return res.status(204).json({
      success: true,
      message: `Tidak ada Menu Bihun Ayam`,
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
    const updateBihunAyam = await bihunayam.update(
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
    if (updateBihunAyam === null) {
      return res.status(405).json({
        success: false,
        message: `Gagal Mengubah Menu Bihun Ayam`,
      });
    }
    const query = await bihunayam.findByPk(id);
    return res.status(200).json({
      success: true,
      message: `Berhasil Mengubah Menu Bihun Ayam`,
      data: query,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.deleteBihunAyam = async (req, res) => {
  const { id } = req.params;
  const findBihunAyam = await bihunayam.findByPk(id);
  if (findBihunAyam === null) {
    return res.status(402).json({
      success: false,
      message: `Tidak ditemukan menu Bihun Ayam yang diminta`,
    });
  }
  try {
    const deleteBihunAyam = await bihunayam.destroy({
      where: { id: { [Op.eq]: id } },
    });
    if (deleteBihunAyam === null) {
      return res.status(402).json({
        success: false,
        message: `Gagal menghapus Menu Bihun Ayam`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Berhasil menghapus Menu Bihun Ayam`,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
