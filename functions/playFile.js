async function play(voiceChannel) {
	const connection = await voiceChannel.join();
	connection.play('audio.mp3');
}
