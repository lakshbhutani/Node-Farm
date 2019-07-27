module.exports = (item, template)  => {
    let output = template.replace(/{%QUANTITY%}/g, item.quantity)
    output = output.replace(/{%PRODUCTNAME%}/g, item.productName)
    output = output.replace(/{%IMAGE%}/g, item.image)
    output = output.replace(/{%PRICE%}/g, item.productName)
    output = output.replace(/{%ID%}/g, item.id)
    output = output.replace(/{%DESCRIPTION%}/g, item.description)
    output = output.replace(/{%NUTRIENTS%}/g, item.nutrients)

    if(!item.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return output
}