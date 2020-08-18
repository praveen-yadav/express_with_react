var a = 3;
function foo() {
	//var a = 2;

	function bar() {
		console.log( a ); // 2
	}

	bar();
}

foo();