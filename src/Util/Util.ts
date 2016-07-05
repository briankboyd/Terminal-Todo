export function isEmpty(value):boolean {
    let isEmpty:boolean;
    if(value === null || value === '') {
        isEmpty =  true;
    } else {
        isEmpty = false;
    }
    return isEmpty;
}