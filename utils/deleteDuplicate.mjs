import tvModel from '../models/tv.mjs';
import logSymbols from 'log-symbols';
import mongoose from 'mongoose';

const TV = mongoose.model('TV', tvModel);

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
      console.log(`${logSymbols.warning} Duplicate data found for ID ${item._id.id}`)
      await TV.deleteMany({_id: {$in: item.id}})
        .then(() => console.log(`${logSymbols.success} Duplicate data for ID ${item._id.id} deleted`))
        .catch((err) => console.log(`${logSymbols.error} Error deleting duplicate ID ${item._id.id}: ${err}`))
    })
  })
}