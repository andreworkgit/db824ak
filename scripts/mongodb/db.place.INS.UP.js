

db.place.findAndModify( {
    query: {ref: '1'},
    update: { 
    	$set: {	
		    	ref: '1',
				name: 'Padaria',
				picture:'padaria',
				distance: '200',
				vlboxmin: '33',
				vlboxmax: '160',
				isbank:false
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
				distance: '240',
				vlboxmin: '37',
				vlboxmax: '170',
				isbank: false
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
				distance: '320',
				vlboxmin: '22',
				vlboxmax: '150',
				isbank: false
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
				distance: '900',
				isbank: true,
				money_total: '148992',
				dono_id: "5296177a998584f6ed1d0316" //colocar o ID do usuario válido
			}
    },
    upsert: true,
    new: true
} );