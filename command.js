const {prefix} = require('./config.json');

module.exports = (client, aliases, callback, args) => {

    if(typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', message => {
        const { content } = message

                aliases.forEach(alias => {
                    const command = `${prefix}${alias}`

                    if (content.startsWith(`${command} `) || content === command){
                        console.log(`Running the command ${command}`);
                        args = message.content.slice(prefix.length).trim().split(/ +/); 
                        callback(message, args);
                    }
                });
    });
}