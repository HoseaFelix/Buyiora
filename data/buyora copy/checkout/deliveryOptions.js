export const deliveryOptions = [
    {
        id:'1',
        shippingPriceCents : 0, 
        deliveryDate:7

    },
    {
        id:'2',
        shippingPriceCents : 499, 
        deliveryDate:4

    },
    {
        id:'3',
        shippingPriceCents : 999, 
        deliveryDate:0

    },
]

export function getDeliveryOption(deliveryoptionId){
    let matchingId;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryoptionId){
            matchingId = option
        }
    })

    return matchingId || matchingId[0]
}