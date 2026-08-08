


const 	{ A } 			= 	require('/brqx/base/rcode/es6/spc/theme/common/yamls/sections/sa/a.es6'	);


class B	{
 	constructor(n = 0)
 	{
		this.n 	=	'My Class_name Is B'
		this.a1 = ''

		console.log(this.n + ' and Level ' + n)

 		if (n > 0) 
 		 	this.a1 = new A(n - 1)
 		
 	}
}

exports.B = B
