

db.place.findAndModify( {
    query: {ref: '1'},
    update: { 
    	$set: {	
		    	ref: '1',
				name: 'Padaria',
				picture:'padaria',
				distance: '200'
			}
    },
    upsert: true,
    new: true
} );

db.place.findAndModify( {
    query: {ref: '2'},
    update: { 
    	$set: {	
				ref: '2',
				name: 'Banca de Jornal',	
				picture:'banca-de-jornal',
				distance: '240'
			}
    },
    upsert: true,
    new: true
} );


db.place.findAndModify( {
    query: {ref: '3'},
    update: { 
    	$set: {	
				ref: '3',
				name: 'Doceria',
				picture:'doceria',
				distance: '320'
			}
    },
    upsert: true,
    new: true
} );


db.place.findAndModify( {
    query: {ref: '4'},
    update: { 
    	$set: {	
				ref: '4',
				name: 'Maios Bank',
				picture:'maios-bank',
				distance: '900'
			}
    },
    upsert: true,
    new: true
} );