'use strict';
const _ = require('underscore');

//this function takes an object (req.params) seperates out the keys and values and re arranges them into the mongodb syntax { $and: [ <expression1>, <expression2>, { $or : [<expression1>, <expression3> ] } ] }
const underscoreInquery = obj => {
	console.log('UNDERSCORE PARTY');
	let newObj = { $and: [] };
	let orObj = { $or: [] };
	_.mapObject(obj, (val, key) => {
		//here we map over the object and seperate out the keys and values
		console.log('this is the key : ', key, ' and this is the value : ', val);
		//if there is more than one value from the url it will be split at +
		if (val.includes('+')) {
			val.split('+').forEach(v => {
				//this will create new identical keys and pair the value with then push it to the $or array
				orObj.$or.push({ [key]: v });
			});
			//this will then push a new $or obj where in each expression the keys are identical
			newObj.$and.push(orObj);
			//this will reset the or obj to an empty array so we can do it again
			orObj = { $or: [] };
		} else {
			//if the url only contains one value it will push it directly to the $and array
			newObj.$and.push({ [key]: val });
		}
	});
	//the function returns an object so that we can use it in the .find() function
	return newObj;
};

module.exports = underscoreInquery;
