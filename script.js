if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
   web3.eth.defaultAccount = web3.eth.accounts[accountNumber];
   var CoursetroContract = web3.eth.contract(abi);

var Coursetro = CoursetroContract.at(contractAddress);
console.log(Coursetro);

//var instructorEvent = Coursetro.instructorInfo( {}, 'latest');
var instructorEvent = Coursetro.instructorInfo( {}, 'latest');
instructorEvent.watch(function (err, result) {
    if (!err) {
        if (result.blockHash != $("#instrans").html()) 
            $("#loader").hide();
            
        $("#insTrans").html('Block hash: ' +result.blockHash);
        $("#instructor").html(web3.toAscii(result.args.fName) + ' ' + web3.toAscii(result.args.lName) + ' (' + result.args.age + ' years old)');
    } else {
        $("#loader").hide();
    }
});
Coursetro.countInstructors((err, res) => {
    if(res)
    $("#countIns").html(res.c + " Instructors");
})

$("#button").click(function() {
Coursetro.setInstructor(web3.eth.defaultAccount,  $("#age").val(), $("#fName").val(),$("#lName").val(), (err, res) => {
    if(err){
        $("#loader").hide();
    }
});
$("#loader").show();
});

