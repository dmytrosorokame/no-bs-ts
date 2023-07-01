"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borgName = exports.introduceMySelf = void 0;
const introduceMySelf = (first, last) => {
    return `Hello ${first} ${last}`;
};
exports.introduceMySelf = introduceMySelf;
const borgName = () => {
    const members = Math.round(5 + Math.random() * 5) + 1;
    const member = Math.floor(Math.random() * members) + 1;
    return `Your Borg name is ${member} of ${members}`;
};
exports.borgName = borgName;
