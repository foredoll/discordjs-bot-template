function findEmoji(nameOrID) {
	const emoji = this.emojis.cache.get(nameOrID) || this.emojis.cache.find(e => e.name.toLowerCase() === nameOrID.toLowerCase());
	if (!emoji) return null;
}
