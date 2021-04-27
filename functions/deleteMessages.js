function deleteMessages(amount) {
	return new Promise(resolve => {
		if (amount > 100) throw new Error('You can\'t delete more than 100 Messages at a time.');
		setTimeout(() => resolve('Deleted '+ amount + 'messages.'), 2000);
	});
}

deleteMessages(amount).then(value => {
  //...
}).catch(error => {
  //...
});
