const Sequelize = require("sequelize");
const sequelize = new Sequelize("loginapp", "root", "20092004", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}