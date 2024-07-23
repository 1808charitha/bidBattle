import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';
import { User } from '../../models/users_models';

// owner route
async function bidder_display(req: Request, res: Response) {
  // console.log("bidder_display")
  try {
    const bidder = req.params.bidder;

    // Use the bidderId to find objects owned by that user
    const times: any = await timeline_models.find({ bidder: bidder }).sort({ _id: -1 });
    // console.log("times", times); //okay

    const times_list = await times.map(async (obj: any) => {

      const [bid_amount, bidder] = [obj.bid_amount, obj.bidder];

      const objects: any = await obj_models.find({ _id: obj.obj_id });
      // console.log("objects", objects); //okay

      const userObj: any = await User.find({ _id: objects[0].owner });
      // console.log("user", userObj); //okay

      const bidderObj: any = await User.find({ _id: bidder });
      // console.log("bidder", bidderObj); //okay
      
      return { ...obj._doc, ...objects[0]._doc, bidder: bidder, bid_amount: bid_amount, owner_name: userObj[0].username, bidder_name: (bidderObj[0] && bidderObj[0]["username"]) || "" };

      // const objects: any = await obj_models.find({ _id: obj.obj_id });
      // console.log(objects);

      // if (objects[0]){
      // return {...obj._doc, ...objects[0]._doc} 
      // } else{
      //   return 
      // }

      // return {...obj._doc, obj_name: obj_name, obj_pic: obj_pic, end_time: end_time, owner: owner, description:description, status: status,initial_bid: initial_bid}; 
    });

    const times_result = await Promise.all(times_list);
    // console.log(times_result);

    // Check if any objects were found
    if (times_result.length === 0 || times_result[0] === undefined) {
      return res.status(404).json({ message: 'No objects found for this bidder.' });
    }

    // Return the found objects in the response
    res.status(200).json(times_result);
  } catch (error) {
    console.error('Error retrieving bidders list', error);
    res.status(500).json({ message: "Bidder not found" });
  }
}

export { bidder_display };