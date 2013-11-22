/*db.vehicle.insert({
	ref: '1',
	name: 'A pé',
	mkmperhour: '5'
});

db.vehicle.insert({
	ref: '2',
	name: 'Bicicleta BMX',
	mkmperhour: '8'
});

db.vehicle.insert({
	ref: '3',
	name: 'Mountain Bike',
	mkmperhour: '11'
});


db.vehicle.insert({
	ref: '4',
	name: 'Ferdin GT10',
	mkmperhour: '14'
});

db.vehicle.insert({
	ref: '5',
	name: 'Bugan GS3',
	mkmperhour: '14'
});

db.vehicle.insert({
	ref: '6',
	name: 'Risco LP5',
	mkmperhour: '14'
});*/

db.vehicle.findAndModify( {
    query: {ref: '1'},
    update: { 
    	$set: {	
    			ref: '1',
				name: 'A pé',
				mkmperhour: '5'
			}
    },
    upsert: true,
    new: true
} );

db.vehicle.findAndModify( {
    query: {ref: '2'},
    update: { 
    	$set: {	
				ref: '2',
				name: 'Bicicleta BMX',
				mkmperhour: '8'
			}
    },
    upsert: true,
    new: true
} );

db.vehicle.findAndModify( {
    query: {ref: '3',},
    update: { 
    	$set: {	
	ref: '3',
	name: 'Mountain Bike',
	mkmperhour: '11'
			}
    },
    upsert: true,
    new: true
} );

db.vehicle.findAndModify( {
    query: {ref: '4'},
    update: { 
    	$set: {	
	ref: '4',
	name: 'Ferdin GT10',
	mkmperhour: '14'
			}
    },
    upsert: true,
    new: true
} );

db.vehicle.findAndModify( {
    query: {ref: '5'},
    update: { 
    	$set: {	
	ref: '5',
	name: 'Bugan GS3',
	mkmperhour: '14'
			}
    },
    upsert: true,
    new: true
} );

db.vehicle.findAndModify( {
    query: {ref: '6'},
    update: { 
    	$set: {	
	ref: '6',
	name: 'Risco LP5',
	mkmperhour: '14'
			}
    },
    upsert: true,
    new: true
} );


