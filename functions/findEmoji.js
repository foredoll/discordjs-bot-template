function findEmoji(nameOrID) {
	return this.emojis.cache.get(nameOrID) || this.emojis.cache.find(e => e.name.toLowerCase() === nameOrID.toLowerCase());
}
