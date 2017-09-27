var suits = ['CLUBS','HEARTS','DIAMONDS','SPADES'];
var nums = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var deck = [];
var b = -1;
for (i=0;i<52;i++){
	if(i%13===0){
		b++;
	}
	deck[i] = {
		suit: suits[b],
		num: (i%13),
		name: nums[i%13],
		value: nums[i%13]
	};
}
console.log(deck);