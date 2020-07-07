import Event from "../db/models/Event.model";
import { validate } from "../validations/index.validation";
import { eventInput } from "../validations/event.validation";
import userController from "./user.Controller";
import User from "../db/models/User.model";

class EventController {
  public async createEvent(eventInfo: any, id: string) {
    try {
      let eventValidation = await validate(eventInput, eventInfo);
      if (Array.isArray(eventValidation))
        return { success: false, errors: eventValidation };

      const newEvent = new Event(eventInfo);
      const user = (await userController.getUser({ _id: id })) as any;

      user.events.push(newEvent);

      await user.save();
      await newEvent.save();
      return { success: true, event: newEvent };
    } catch (e) {
      throw e;
    }
  }
  public async updateEvent(id: string, updateObj: any) {
    try {
      const updated = await Event.findByIdAndUpdate(id, updateObj);

      return { success: true, event: updated };
    } catch (e) {
      throw e;
    }
  }
  public async deleteEvent(eventId: string, userId: string) {
    try {
      const event = await Event.findByIdAndDelete(eventId);
      const user = await User.updateOne(
        { _id: userId },
        { $pull: { events: { _id: eventId } } }
      );

      console.log(user);
      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async getEventById() {}
  public async getEventTitle() {}
  public async getAllEvents() {}
  public async addComment() {}
  public async getEventsBasedOnAUser() {}
  public async getEventsInAnArea() {}
}

export default new EventController();
