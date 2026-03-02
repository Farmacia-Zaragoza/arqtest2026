const 	{ B } 			= 	require('/brqx/base/rcode/es6/spc/theme/common/yamls/sections/sa/b.es6'	);

class A {

	constructor(n = 0) 
	{
		this.n 	=	'My Class_name Is A'
		
		console.log(this.n + ' and Level ' + n)
		
		if (n > 0 )
			this.b1 = 	new B(n)

	}
}

// var a1 = new A(1)


exports.A = A

var aa = []

aa[1] = 1
aa['second'] = 'pep'
aa['third'] = 'rob'
aa[4] = 2


for (var pos in aa) 	console.log (aa[pos])
