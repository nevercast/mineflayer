module.exports = inject;

function inject(bot) {
  bot.client.on(0x40, function(packet) {
    bot.emit('kicked', packet.reason);
  });
  bot.quit = function(reason) {
    reason = reason || 'disconnect.quitting';
    console.log("TODO: disconnect with reason", reason);
    // it used to be:
    //bot.client.write(0xff, { reason: reason });
    // gotta figure out how to quit now
  };
}
