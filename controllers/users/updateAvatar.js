const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../schemas/user");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const uploadPath = path.join(avatarsDir, filename);
  await fs.rename(tempPath, uploadPath);

  Jimp.read(uploadPath)
    .then((image) => {
      return image.resize(250, 250).write(uploadPath);
    })
    .catch((err) => console.log(err));

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
