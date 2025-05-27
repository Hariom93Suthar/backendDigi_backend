// utils/loadRoutes.js
const fs = require("fs");
const path = require("path");

module.exports = function loadRoutes(app, baseDir, routePrefix) {
    fs.readdirSync(baseDir).forEach(folder => {
        const folderPath = path.join(baseDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            fs.readdirSync(folderPath).forEach(file => {
                const routePath = path.join(folderPath, file);
                if (file.endsWith(".js")) {
                    const route = require(routePath);
                    const routeName = file.replace(".js", "");
                    app.use(`${routePrefix}/${folder.toLowerCase()}/${routeName}`, route);
                    console.log(`✅ Loaded route: ${routePrefix}/${folder.toLowerCase()}/${routeName}`);
                }
            });
        }
    });
};
