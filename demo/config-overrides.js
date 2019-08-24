var path = require('path');

module.exports = function override(config, env) {
    
    config.resolve['alias'] = {
        react: path.resolve(__dirname, "node_modules/react")
    };

    return config;
}