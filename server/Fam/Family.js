import Firebase from 'firebase';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { config } from '../../config/config-firebase.js';
import moment from 'moment';

Firebase.initializeApp(config);
const database = Firebase.database();
console.log('database: ', database);

const getCurrentFam = (oldState) => {
	  database.on("child_added", (dataSnapshot) => {
	  	const family = [];
	    family.push(dataSnapshot.val());
	    const newState = Object.assign({}, oldState, { family }); 
	  });
	}

const setNewFamMembers = (newMemberNameArray) => {
	const promises = [];
	newMemberNameArray.forEach((member, index) => {
		const memberIndex = 'memberName' + index;
		 promises.push(setNewFamMember(member, memberIndex));
	});
	return Promise.all(promises)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => console.log('all error: ', err));	
}

const setNewFamMember = (newMemberName, memberIndex) => {
	const member = {};
	member[memberIndex] = newMemberName;
	return database.ref('family/' + moment().unix()).push(member)
	.once('value')
	.then((result) => {
		const member = result.val()[memberIndex];
		return member;
	});
}
	
setNewFamMembers(['joe', 'sally', 'paul', 'sam' ]);

