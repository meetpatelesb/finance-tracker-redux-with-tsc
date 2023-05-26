export let result = "";
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;
let counter = 0;
while (counter < 17) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  counter += 1;
}


export const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});
