var args = process.argv.slice(2);
var sum = args.reduce(function(previousValue, currentValue, index, array){
	return previousValue + parseInt(currentValue, 10);
}, 0);
console.log(sum);