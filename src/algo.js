// ELO RATING SYSTEM
// #copyright Code Rating Algorithm
let ratingC1 = 100
let ratingC2 = 100
const K = 24

let expectedRatingC1 = 1 / (1 + Math.pow(10, (ratingC2 - ratingC1) / 400))
let expectedRatingC2 = 1 / (1 + Math.pow(10, (ratingC1 - ratingC2) / 400))

console.log(expectedRatingC1)
console.log(expectedRatingC2)

let winner = 'C1'
if (winner === 'C1') {
    ratingC1 = ratingC1 + K * (1 - expectedRatingC1)
    ratingC2 = ratingC2 + K * (0 - expectedRatingC2)
} else if (winner === 'C2') {
    ratingC1 = ratingC1 + K * (0 - expectedRatingC1)
    ratingC2 = ratingC2 + K * (1 - expectedRatingC2)
}
console.log(parseInt(ratingC1))
console.log(parseInt(ratingC2))
