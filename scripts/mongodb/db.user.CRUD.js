

db.user.findAndModify( {
    query: {uid: '101937643516613120764'},
    update: { 
    	$set: {	
		    	email: 'urelby@gmail.com',
				imagem: '',
				money: 0,
				name: 'Daniel',
				online: false,
				provider: 'google',
				transportation: 1,
				uid: '101937643516613120764',
				url: 'eyXcWOAtS',
				banco: '529371313df8561e9a8d2dce'
			}
    },
    upsert: true,
    new: true
} );

