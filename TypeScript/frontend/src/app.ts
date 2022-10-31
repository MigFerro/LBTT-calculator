const getTaxFromBackend = async () => {

    let price = (<HTMLInputElement>document.getElementById('price')).value

    var radios = document.getElementsByName('is_first_buyer');
    let radio_value;
    for (let i = 0, length = radios.length; i < length; i++) {
        let radio = <HTMLInputElement>document.getElementsByName("is_first_buyer")[i];
        if (radio.checked) {
            radio_value = radio.value;
            console.log('radio value: ', radio_value)
            break;
        }  
    }

    const response = await fetch('http://localhost:8080/api/calculate?price='+price+'&fb='+radio_value)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
        console.log("response ok")
        let tax = -1
        tax = data?.tax_value
        if (tax != -1) {
            console.log('tax ok', tax)
            alert(tax)
        } else {
            console.log(tax)
            console.log('data: ', data)
            console.log('tax not ok')
        }
    } else {
        console.log(response)
        console.log('response not ok')
    }
    return true
}