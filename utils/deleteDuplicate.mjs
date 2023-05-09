import tvSchema from '../schemas/tvSchema.mjs';
import logSymbols from 'log-symbols';
import mongoose from 'mongoose';

const TV = mongoose.model('TV', tvSchema);

export default function deleteDuplicate() {
  TV.aggregate([
    {
      "$group": {
          _id: {id: "$id"},
          id: { $addToSet: "$_id" } ,
          count: { $sum : 1 }
      }
  },
  {
      "$match": {
          count: { "$gt": 1 }
      }
  }
  ], {allowDiskUse: true}).then((item) => {
    item.forEach(async (item) => {
      item.id.shift();
      console.log(`\n${logSymbols.warning} Duplicate data found for ID ${item._id.id}`)
      await TV.deleteMany({_id: {$in: item.id}})
        .then(() => console.log(`${logSymbols.success} Duplicate ID ${item._id.id} deleted`))
    })
  })
}