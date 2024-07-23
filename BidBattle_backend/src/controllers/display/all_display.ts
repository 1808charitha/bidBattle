import { Request, Response } from 'express';
import { obj_models } from '../../models/objects_models';
import { timeline_models } from '../../models/timeline_models';
import { User } from '../../models/users_models';

// all display route
async function all_display(req: Request, res: Response) {

  console.log("all_display")
  try {
    const id = req.params.all;

    const all_objects = await obj_models.find().sort({ _id: -1 });
    console.log(all_objects);

    const obj_list = await all_objects.map(async (obj: any) => {
      const timeline: any = await timeline_models.find({ obj_id: obj._id });
      const [bid_amount, bidder] = [timeline[0]["bid_amount"], timeline[0]["bidder"]];

      const userObj: any = await User.find({ _id: obj.owner });
      const bidderObj: any = await User.find({ _id: bidder });
      return { ...obj._doc, bidder: bidder, bid_amount: bid_amount, owner_name: userObj[0]["username"], bidder_name: (bidderObj[0] && bidderObj[0]["username"]) || "" };
    });

    const all_result = await Promise.all(obj_list);

    // Check if any objects were found
    if (all_objects.length === 0) {
      return res.status(404).json({ message: 'No all_objects found for this all.' });
    }

    // Return the found all_objects in the response
    res.status(200).json(all_result);
  } catch (error) {
    console.error('Error retrieving all objects', error);
    res.status(500).json({ message: "Object not found" });
  }
}

export { all_display };