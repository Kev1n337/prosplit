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
	events: [{
		type:String
	}]
},

events: {
	title: {
		type:String,
		min:1,
		max:15
	},
	owner: {
		type: String,
		min:5,
		max:15
	},
	createdOn: {
		type:Date
	},
	bills: [{
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
	}],
	eqBills: [{
		from: {
			type:String,
			min:5,
			max:15
		},
		to: {
			type:String,
			min:5,
			max:15
		},
		amount: {
			type:Number,
			min:0
		}
	}]
}