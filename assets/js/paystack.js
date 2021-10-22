
function PayWithPaystack(depositObj) {
    //e.preventDefault();
  
    const paystackHandler = PaystackPop.setup({
      key: 'pk_test_faf5a916361f224ff98c12d25590aee4b76d9d40', // Replace with your public key
      email: depositObj.email,
      amount: depositObj.amount * 100,
      ref: depositObj.transactionId.toString(), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: () => {
        //alert('Window closed.');
        return;
      },
      callback: (response) => {
        $.ajax({
          //url: `https://wagerapi.herokuapp.com/api/deposit/verify/${response.reference}/${depositObj.userId}`,
          url: `http://localhost:4201/api/deposit/subscription/${response.reference}/${depositObj.userId}`,
          method: 'get',
          beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", 'Bearer sk_test_0576514e7d7cc5cafe3c625e17c60fd54f7e57ef');
            },
          success: (response) => {
            // the transaction status is in response.data.status
            //console.log(response)

            //reload page
            //location.reload();
          }
        });
      }
    });
    paystackHandler.openIframe();
}