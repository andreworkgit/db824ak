db.weapons.findAndModify( {
    query: {ref: '1'},
    update: { 
    	$set: {	
				ref: '1',
				name: 'Faca',
				picture:'faca',
				price: '5'			
		}
    },
    upsert: true,
    new: true
} );

db.weapons.findAndModify( {
    query: {ref: '2'},
    update: { 
    	$set: {	
				ref: '2',
				name: 'Bastão',
				picture:'bastao',
				price: '50'			
		}
    },
    upsert: true,
    new: true
} );

db.weapons.findAndModify( {
    query: {ref: '3'},
    update: { 
    	$set: {	
				ref: '3',
				name: '38',
				picture:'38',
				price: '600'			
		}
    },
    upsert: true,
    new: true
} );

db.weapons.findAndModify( {
    query: {ref: '4'},
    update: { 
    	$set: {	
				ref: '4',
				name: 'glock',
				picture:'glock',
				price: '800'			
		}
    },
    upsert: true,
    new: true
} );


db.weapons.findAndModify( {
    query: {ref: '5'},
    update: { 
    	$set: {	
				ref: '5',
				name: 'Doze c12',
				picture:'c12',
				price: '2200'			
		}
    },
    upsert: true,
    new: true
} );

db.weapons.findAndModify( {
    query: {ref: '6'},
    update: { 
    	$set: {	
				ref: '6',
				name: 'AK47',
				picture:'ak47',
				price: '3100'			
		}
    },
    upsert: true,
    new: true
} );

db.weapons.findAndModify( {
    query: {ref: '7'},
    update: { 
    	$set: {	
				ref: '7',
				name: 'Dinamite',
				picture:'dinamite',
				price: '500'			
		}
    },
    upsert: true,
    new: true
} );
