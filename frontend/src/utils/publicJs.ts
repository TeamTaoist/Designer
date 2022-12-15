
const AddresstoShow = (address:string) => {
    if (!address) return "..."

    let frontStr = address.substring(0, 6);

    let afterStr = address.substring(address.length - 4, address.length);

    return `${frontStr}...${afterStr}`

}



export default {
  AddresstoShow,
};
