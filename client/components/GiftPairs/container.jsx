import React from 'react';

export default class GiftPairs extends React.Component {
	constructor() {
		super();
		this.state = {
			lastYear: { 
		    paul: 'sam',
		    andee: 'caleb',
		    sally: 'betty',
		    joe: 'paul',
		    betty: 'andee',
		    hannah: 'sally',
		    caleb: 'angel',
		    angel: 'joe' 
		  }, 
			restrictions: {
		    'joe': ['sally', 'andee'],
		    'sally': ['joe', 'andee'], 
		    'andee': ['joe', 'sally'], 
		    'hannah': ['caleb'],
		    'caleb': ['hannah']
	  	},
  		fam: [ 'joe', 'sally', 'paul', 'sam', 'hannah', 'betty', 'andee', 'caleb' ]
		}
	}

  getGiftPairs() {
  	const lastYear = this.state.lastYear; 
  	const fam = this.state.fam; 
  	const restrictions = this.state.restrictions;
    const thisYear = {};
    const receivers = fam.concat();
    fam.forEach((currentPerson, index) => {
      // remove the currentPerson
      const notThePerson = receivers.filter((receiver) => receiver !== currentPerson);
      // remove the person the giver gave to last year.
      const notLastYears = notThePerson.filter((receiver) => receiver !== lastYear[currentPerson]);
      // remove the people restricted from the giver.
      const eligibleReceivers = notLastYears.filter((receiver) => restrictions.hasOwnProperty(currentPerson) ? restrictions[currentPerson].indexOf(receiver) === -1 : true);
      // pick a random eligible person.
      thisYear[currentPerson] = eligibleReceivers[Math.floor(Math.random() * eligibleReceivers.length)];
      // remove the receiver from the master list so they won't end up on the list twice.
      receivers.splice(receivers.indexOf(thisYear[currentPerson]), 1);
    });
    return thisYear;
  }


  runGiftPairs() {
    let giftPairs = null;
    let index = 0;
    while (index < 30) {
      giftPairs = this.getGiftPairs();
      if (Object.keys(giftPairs).some((i) => giftPairs[i] !== undefined)) {
        index = 31;
      } 
      else {
        index++;
      }
    }
    return giftPairs;
  } 

  renderGiftPairs() {
  	const gifters = this.runGiftPairs();
  	if (gifters) {
  		return (<div>
  						{Object.keys(gifters).map((giver) => <div>{giver} is giving to {gifters[giver]}</div>)}
  					</div>
  		);
  	}
  }

  render() {
  	return (
  		<div>
  			{this.renderGiftPairs()}
  		</div>
  	)
  }
}
