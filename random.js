function manufactureGifts(giftsToProduce) {
  return giftsToProduce.flatMap((obj) => (obj.quantity > 0 ? Array(obj.quantity).fill(obj.toy) : []))
}

const consulta = manufactureGifts([
  { toy: 'robot', quantity: 2 },
  { toy: 'drone', quantity: 3 },
  { toy: 'ball', quantity: 1 }
])

console.log(consulta)
