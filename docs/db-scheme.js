users: {
	username: {
		type:String,
		min:5,
		max:15
	},
	friends: [{
		type:String,
		min:5,
		max:15
	}],
	debts: [{
		receiver:{
			type:String,
			min:5,
			max:15
		},
		amount:{
			type:Number,
			min:0
		}
	}]
}

events: {
	title: {
		type:String,
		min:1,
		max:15
	},
	bills: {
		title: {
			type:String,
			min:1,
			max:15
		},
		amount: {
			type:Number,
			min:0
		},
		payer: {
			type:String,
			min:5,
			max:15
		},
		receiver: [{
			type:String,
			min:5,
			max:15
		}]
	}
}