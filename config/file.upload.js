const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: 'eu-west-1'
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket:'sqrt4',
        acl:'public-read',
        metadata: function (req, file, callback) {
            callback(null, {fieldname: file.fieldname});
        },
        key: function (req, file, callback) {
            callback(null, Date.now().toString())
        }
    })
})

module.exports = upload;