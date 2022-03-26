const { mieayam } = require("../models/index");
const { Op } = require("sequelize");

exports.createMieAyam = async (req, res) => {
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
    const query = await mieayam.create({ ...Body });
    return res.status(200).json({
      success: true,
      message: `Berhasil membuat menu MieAyam`,
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
exports.getAllMieAyam = async (req, res) => {
  try {
    const query = await mieayam.findAll();
    if (query.length === 0) {
      return res.status(203).json({
        success: true,
        message: `Tidak ada Menu Mie Ayam`,
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
exports.findMieAyamBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const findMieAyam = await mieayam.findAll({
      where: { slug: { [Op.eq]: slug } },
    });
    if (findMieAyam.length === 0) {
      return res.status(205).json({
        success: true,
        message: `Tidak ada menu Mie Ayam`,
      });
    }
    return res.status(200).json({
      success: true,
      results: findMieAyam,
    });
  } catch (err) {
    console.log("err = ", err);
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.updateMieAyam = async (req, res) => {
  const { nama, harga, qty } = req.body;
  const { id } = req.params;
  const findMieAyam = await mieayam.findByPk(id);

  if (findMieAyam === null) {
    return res.status(401).json({
      success: true,
      message: `Tidak ada Menu Mie Ayam`,
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
    const updatemieAyam = await mieayam.update(
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
    if (updatemieAyam === null) {
      return res.status(405).json({
        success: false,
        message: `Gagal Mengubah Menu Mie Ayam`,
      });
    }
    const query = await mieayam.findByPk(id);
    return res.status(200).json({
      success: true,
      message: `Berhasil Mengubah Menu Mie Ayam`,
      data: query,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
exports.deleteMieAyam = async (req, res) => {
  const { id } = req.params;
  const findMieAyam = await mieayam.findByPk(id);
  if (findMieAyam === null) {
    return res.status(402).json({
      success: false,
      message: `Tidak ditemukan menu Mie Ayam yang diminta`,
    });
  }
  try {
    const deleteMieAyam = await mieayam.destroy({
      where: { id: { [Op.eq]: id } },
    });
    if (deleteMieAyam === null) {
      return res.status(402).json({
        success: false,
        message: `Gagal menghapus Menu Mie Ayam`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Berhasil menghapus Menu Mie Ayam`,
    });
  } catch (err) {
    return res.status(405).json({
      success: false,
      message: err,
    });
  }
};
