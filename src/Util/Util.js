"use strict";
function isEmpty(value) {
    var isEmpty;
    if (value === null || value === '') {
        isEmpty = true;
    }
    else {
        isEmpty = false;
    }
    return isEmpty;
}
exports.isEmpty = isEmpty;
